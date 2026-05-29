import express, { Request, Response } from 'express';
import { ConfigurationServeur } from '../../serveur';
import { NextFunction } from 'express-serve-static-core';
import crypto, { UUID } from 'crypto';
import { SagaLanceDiagnosticLibreAcces } from '../../diagnostic-libre-acces/CapteurSagaLanceDiagnosticLibreAcces';
import { FournisseurHorloge } from '../../infrastructure/horloge/FournisseurHorloge';
import { ServiceDiagnostic } from '../../diagnostic/ServiceDiagnostic';
import { representeLeDiagnosticPourLeClient } from '../representateurs/representateurDiagnostic';
import {
  constructeurActionsHATEOAS,
  ReponseHATEOAS,
  ReponseHATEOASEnErreur,
} from '../hateoas/hateoas';
import { RepresentationDiagnostic } from '../representateurs/types';
import {
  ExpressValidator,
  FieldValidationError,
  Result,
  body,
  validationResult,
} from 'express-validator';
import {
  definitionEntiteInitieDiagnosticLibreAcces,
  DefinitionEntiteInitieDiagnosticLibreAcces,
} from '../../diagnostic-libre-acces/tuples';
import {
  CorpsReponse,
  SagaAjoutReponse,
} from '../../diagnostic/CapteurSagaAjoutReponse';
import {
  Diagnostic,
  EntrepotDiagnostic,
  MesurePriorisee,
} from '../../diagnostic/Diagnostic';
import * as core from 'express-serve-static-core';
import { Restitution } from '../../restitution/Restitution';
import { RestitutionHTML } from '../../infrastructure/adaptateurs/AdaptateurDeRestitutionHTML';
import { RepresentationRestitution } from '../routesAPIDiagnostic';
import { ErreurMAC } from '../../domaine/erreurMAC';
import { differenceInDays } from 'date-fns';
import { adaptateurConfigurationLimiteurTraffic } from '../adaptateurLimiteurTraffic';
import { Evenement } from '../../domaine/BusEvenement';
import { utilitairesCookies } from '../../adaptateurs/utilitairesDeCookies';
import { JwtMACPayload } from '../../authentification/GestionnaireDeJeton';
import { GenerateurLaTeX } from '../../infrastructure/restitution/latex/GenerateurLaTeX';
import {
  ReferentielDeMesure,
  ReferentielDeMesures,
} from '../../diagnostic/ReferentielDeMesures';

type CorpsReponseDiagnosticLibreAcces = ReponseHATEOAS &
  RepresentationDiagnostic;

export type CorpsReponseCreerDiagnosticLibreAccesEnErreur =
  ReponseHATEOASEnErreur;

type CorpsRestitution = RepresentationRestitution | Buffer;

type MesureDisponiblePourAjout = {
  clef: string;
  identifiant: string;
  niveau: 'niveau1' | 'niveau2';
  titre: string;
  pourquoi: string;
  comment: string;
  priorisation: number;
  categorie?: 'technique' | 'non-technique';
};

type CorpsReponseMesures = {
  mesuresPrioritaires: MesurePriorisee[];
  mesuresComplementaires: MesurePriorisee[];
  mesuresDisponibles: MesureDisponiblePourAjout[];
};

const aplatitReferentielMesures = (
  referentiel: ReferentielDeMesures
): MesureDisponiblePourAjout[] => {
  const entreesReferentiel = Object.entries(referentiel) as Array<[
    string,
    ReferentielDeMesure,
  ]>;

  return entreesReferentiel.flatMap(([identifiant, mesure]) => {
    const niveaux: Array<[
      MesureDisponiblePourAjout['niveau'],
      ReferentielDeMesure['niveau1']
    ]> = [['niveau1', mesure.niveau1]];

    if (mesure.niveau2) {
      niveaux.push(['niveau2', mesure.niveau2]);
    }

    return niveaux.map(([niveau, contenu]) => ({
      clef: `${identifiant}:${niveau}`,
      identifiant,
      niveau,
      titre: contenu.titre,
      pourquoi: contenu.pourquoi,
      comment: contenu.comment,
      priorisation: mesure.priorisation,
      ...(mesure.categorie ? { categorie: mesure.categorie } : {}),
    }));
  });
};

const validateurDiagnosticLibreAcces = (
  entrepotDiagnostic: EntrepotDiagnostic
) => {
  const { param } = new ExpressValidator({
    diagnosticMoinsDe7Jours: async (identifiant: string) => {
      return entrepotDiagnostic.lis(identifiant).then((diagnostic) => {
        if (
          differenceInDays(
            FournisseurHorloge.maintenant(),
            diagnostic.dateCreation
          ) >= 7
        ) {
          throw new Error(
            'Le diagnostic en libre accès a été initié il y a 7 jours ou plus.'
          );
        }
        return true;
      });
    },
  });
  return param('id')
    .diagnosticMoinsDe7Jours()
    .withMessage("Le diagnostic demandé n'a pas été trouvé.");
};
export const routesAPIDiagnosticLibreAcces = (
  configuration: ConfigurationServeur
) => {
  const routes = express.Router();

  const {
    busCommande,
    adaptateurDeVerificationDeRelations: relations,
    entrepots,
    busEvenement,
    gestionnaireDeJeton,
  } = configuration;

  const envoieReponseDiagnosticNonTrouve = (
    reponse: Response,
    message = "Le diagnostic demandé n'existe pas."
  ) =>
    reponse.status(404).json({
      liens: {
        'creer-diagnostic': {
          url: '/api/diagnostic-libre-acces',
          methode: 'POST',
        },
      },
      message: message,
    });

  routes.post(
    '/',
    adaptateurConfigurationLimiteurTraffic('TRES-LIMITE'),
    express.json(),
    body('cguSignees')
      .custom((value: boolean) => value)
      .withMessage('Veuillez signer les CGU.'),
    (
      requete: Request,
      reponse: Response<CorpsReponseCreerDiagnosticLibreAccesEnErreur>
    ) => {
      const resultatsValidation: Result<FieldValidationError> =
        validationResult(requete) as Result<FieldValidationError>;
      if (!resultatsValidation.isEmpty()) {
        return reponse.status(422).json({
          message: resultatsValidation
            .array()
            .map((resultatValidation) => resultatValidation.msg)
            .join(', '),
          ...constructeurActionsHATEOAS()
            .pour({ contexte: 'utiliser-outil-diagnostic:creer' })
            .construis(),
        });
      }
      return busCommande
        .publie<
          SagaLanceDiagnosticLibreAcces,
          crypto.UUID
        >({ type: 'SagaLanceDiagnosticLibreAcces', dateSignatureCGU: FournisseurHorloge.maintenant() })
        .then((idDiagnostic) =>
          reponse
            .status(201)
            .appendHeader('Link', `${requete.originalUrl}/${idDiagnostic}`)
            .send()
        );
    }
  );

  routes.get(
    '/:id/mesures',
    adaptateurConfigurationLimiteurTraffic('LIMITE'),
    relations.verifie<DefinitionEntiteInitieDiagnosticLibreAcces>(
      definitionEntiteInitieDiagnosticLibreAcces.definition
    ),
    validateurDiagnosticLibreAcces(entrepots.diagnostic()),
    async (
      requete: Request,
      reponse: Response<CorpsReponseMesures | ReponseHATEOASEnErreur>,
      suite: NextFunction
    ) => {
      const resultatsValidation: Result<FieldValidationError> =
        validationResult(requete) as Result<FieldValidationError>;
      if (!resultatsValidation.isEmpty()) {
        return envoieReponseDiagnosticNonTrouve(reponse);
      }

      try {
        const { id } = requete.params;
        const diagnostic = await entrepots.diagnostic().lis(id);
        const mesuresDisponibles = aplatitReferentielMesures(diagnostic.mesures);

        return reponse.json({
          mesuresPrioritaires:
            diagnostic.restitution?.mesures?.mesuresPrioritaires || [],
          mesuresComplementaires:
            diagnostic.restitution?.mesures?.autresMesures || [],
          mesuresDisponibles,
        });
      } catch (erreur) {
        return suite(
          ErreurMAC.cree(
            'Accès diagnostic',
            erreur instanceof Error ? erreur : new Error(String(erreur))
          )
        );
      }
    }
  );

  routes.get(
    '/:id',
    adaptateurConfigurationLimiteurTraffic('LIMITE'),
    relations.verifie<DefinitionEntiteInitieDiagnosticLibreAcces>(
      definitionEntiteInitieDiagnosticLibreAcces.definition
    ),
    validateurDiagnosticLibreAcces(entrepots.diagnostic()),
    (
      requete: Request,
      reponse: Response<
        CorpsReponseDiagnosticLibreAcces | ReponseHATEOASEnErreur
      >,
      suite: NextFunction
    ) => {
      const resultatsValidation: Result<FieldValidationError> =
        validationResult(requete) as Result<FieldValidationError>;
      if (!resultatsValidation.isEmpty()) {
        return envoieReponseDiagnosticNonTrouve(reponse);
      }
      const { id } = requete.params;
      return new ServiceDiagnostic(configuration.entrepots)
        .diagnostic(id as crypto.UUID)
        .then((diagnostic) =>
          reponse.json({
            ...representeLeDiagnosticPourLeClient(
              diagnostic,
              configuration.adaptateurTranscripteurDonnees.transcripteur()
            ),
            liens: {
              'repondre-diagnostic': {
                url: `/api/diagnostic-libre-acces/${diagnostic.identifiant}`,
                methode: 'PATCH',
              },
              [`afficher-diagnostic-${diagnostic.identifiant}`]: {
                url: `/api/diagnostic-libre-acces/${diagnostic.identifiant}/restitution`,
                methode: 'GET',
              },
            },
          })
        )
        .catch((erreur) => suite(erreur));
    }
  );

  routes.patch(
    '/:id',
    adaptateurConfigurationLimiteurTraffic('STANDARD'),
    relations.verifie<DefinitionEntiteInitieDiagnosticLibreAcces>(
      definitionEntiteInitieDiagnosticLibreAcces.definition
    ),
    validateurDiagnosticLibreAcces(entrepots.diagnostic()),
    express.json(),
    (
      requete: Request<core.ParamsDictionary & CorpsReponse & { id: UUID }>,
      reponse: Response,
      suite: NextFunction
    ) => {
      const resultatsValidation: Result<FieldValidationError> =
        validationResult(requete) as Result<FieldValidationError>;
      if (!resultatsValidation.isEmpty()) {
        return envoieReponseDiagnosticNonTrouve(reponse);
      }
      const { id } = requete.params;
      const corpsReponse = requete.body;
      const commande: SagaAjoutReponse = {
        type: 'SagaAjoutReponse',
        idDiagnostic: id,
        reponse: corpsReponse.reponse,
        chemin: corpsReponse.chemin,
        identifiant: corpsReponse.identifiant,
      };
      return busCommande
        .publie<SagaAjoutReponse, Diagnostic>(commande)
        .then((diagnostic) => {
          reponse.json({
            ...representeLeDiagnosticPourLeClient(
              diagnostic,
              configuration.adaptateurTranscripteurDonnees.transcripteur()
            ),
            liens: {
              'repondre-diagnostic': {
                url: `/api/diagnostic-libre-acces/${diagnostic.identifiant}`,
                methode: 'PATCH',
              },
              [`afficher-diagnostic-${diagnostic.identifiant}`]: {
                url: `/api/diagnostic-libre-acces/${diagnostic.identifiant}/restitution`,
                methode: 'GET',
              },
            },
          });
        })
        .catch((erreur) => suite(erreur));
    }
  );

  routes.get(
    '/:id/restitution',
    adaptateurConfigurationLimiteurTraffic('LIMITE'),
    relations.verifie<DefinitionEntiteInitieDiagnosticLibreAcces>(
      definitionEntiteInitieDiagnosticLibreAcces.definition
    ),
    validateurDiagnosticLibreAcces(entrepots.diagnostic()),
    (
      requete: Request,
      reponse: Response<CorpsRestitution | ReponseHATEOASEnErreur>,
      suite: NextFunction
    ) => {
      const resultatsValidation: Result<FieldValidationError> =
        validationResult(requete) as Result<FieldValidationError>;
      if (!resultatsValidation.isEmpty()) {
        return envoieReponseDiagnosticNonTrouve(
          reponse,
          "La restitution demandée n'existe pas."
        );
      }
      const { id } = requete.params;
      const genereRestitution = async (
        restitution: Restitution
      ): Promise<Buffer | RestitutionHTML> => {
        const publieEvenementDiagnosticTelecharge = async () => {
          let jwtPayload: JwtMACPayload | undefined = undefined;
          try {
            const cookies = utilitairesCookies.fabriqueDeCookies(
              'Demande la restitution',
              requete,
              reponse
            );
            jwtPayload = utilitairesCookies.jwtPayload(
              cookies,
              gestionnaireDeJeton
            );
          } catch (_e) {
            console.log(
              'Aucun problème! On essaie de récupérer la session utilisateur sur une ressource publique seulement si la session existe.'
            );
          } finally {
            await busEvenement.publie<RestitutionDiagnosticLibreAccesTelechargee>(
              {
                identifiant: crypto.randomUUID(),
                type: 'RESTITUTION_DIAGNOSTIC_LIBRE_ACCES_TELECHARGEE',
                date: FournisseurHorloge.maintenant(),
                corps: {
                  identifiantDiagnostic: restitution.identifiant,
                  mesuresGenerees: [
                    ...restitution.mesures.mesuresPrioritaires,
                    ...restitution.mesures.autresMesures,
                  ].length,
                  ...(jwtPayload &&
                    jwtPayload.identifiant && {
                      identifiantUtilisateur: jwtPayload.identifiant,
                    }),
                },
              }
            );
          }
        };

        if (requete.headers.accept === 'application/pdf') {
          await publieEvenementDiagnosticTelecharge();
          return configuration.adaptateursRestitution
            .pdf()
            .genereRestitution(restitution);
        }
        return configuration.adaptateursRestitution
          .html()
          .genereRestitution(restitution);
      };

      const creerReponse = (restitution: Buffer | RestitutionHTML) => {
        if (requete.headers.accept === 'application/pdf') {
          return reponse
            .contentType('application/pdf')
            .send(restitution as Buffer);
        } else {
          const reponseHATEOAS: ReponseHATEOAS = {
            liens: {
              'modifier-diagnostic': {
                url: `/api/diagnostic-libre-acces/${id}`,
                methode: 'GET',
              },
              'restitution-json': {
                contentType: 'application/json',
                methode: 'GET',
                url: `/api/diagnostic-libre-acces/${id}/restitution`,
              },
              'restitution-pdf': {
                contentType: 'application/pdf',
                methode: 'GET',
                url: `/api/diagnostic-libre-acces/${id}/restitution`,
              },
            },
          };
          const resultat: RepresentationRestitution = {
            ...reponseHATEOAS,
            ...(restitution as RestitutionHTML),
          };
          return reponse.json(resultat);
        }
      };

      return configuration.entrepots
        .restitution()
        .lis(id)
        .then((restitution) => genereRestitution(restitution))
        .then((pdf) => creerReponse(pdf))
        .catch((erreur) =>
          suite(ErreurMAC.cree('Demande la restitution', erreur))
        );
    }
  );

    routes.post(
      '/:id/restitution/recompile',
      express.json(),
      async (
        requete: Request,
        reponse: Response,
        suite: NextFunction
      ) => {
        try {
          const { id } = requete.params;
          const { mesuresPrioritaires, mesuresComplementaires } = requete.body;

          if (!mesuresPrioritaires || !mesuresComplementaires) {
            return reponse.status(400).json({
              message: 'mesuresPrioritaires et mesuresComplementaires sont requis',
            });
          }

          const restitution = await configuration.entrepots.restitution().lis(id);
          const restitutionModifiee: Restitution = {
            ...restitution,
            mesures: {
              mesuresPrioritaires,
              autresMesures: mesuresComplementaires,
            },
          };

          const pdfRecompile = await configuration.adaptateursRestitution
            .pdf()
            .genereRestitution(restitutionModifiee);

          reponse.contentType('application/pdf').send(pdfRecompile);
        } catch (erreur) {
          return suite(
            ErreurMAC.cree(
              'Demande la restitution',
              erreur instanceof Error ? erreur : new Error(String(erreur))
            )
          );
        }
      }
    );

    routes.post(
      '/:id/restitution/latex',
      express.json(),
      async (
        requete: Request,
        reponse: Response,
        suite: NextFunction
      ) => {
        try {
          const { id } = requete.params;
          const { mesuresPrioritaires, mesuresComplementaires } = requete.body;

          if (!mesuresPrioritaires || !mesuresComplementaires) {
            return reponse.status(400).json({
              message: 'mesuresPrioritaires et mesuresComplementaires sont requis',
            });
          }

          const restitution = await configuration.entrepots.restitution().lis(id);
          const indicateurs = restitution.indicateurs;

          const generateurLaTeX = new GenerateurLaTeX();
          const resultatLatex = generateurLaTeX.genereAvecGraphique({
            diagnosticId: id,
            mesuresPrioritaires,
            mesuresComplementaires,
            indicateurs,
          });

          if ((requete.headers.accept || '').includes('application/json')) {
            return reponse.json({
              codeLatex: resultatLatex.contenuLatex,
              graphiquePolairePdfBase64: resultatLatex.graphiquePolairePdf
                ? resultatLatex.graphiquePolairePdf.toString('base64')
                : null,
              nomFichierGraphiquePolaire: `graphique-polaire-${id}.pdf`,
            });
          }

          reponse.contentType('text/plain; charset=utf-8').send(resultatLatex.contenuLatex);
        } catch (erreur) {
          return suite(
            ErreurMAC.cree(
              'Demande la restitution',
              erreur instanceof Error ? erreur : new Error(String(erreur))
            )
          );
        }
      }
    );
  return routes;
};

export type RestitutionDiagnosticLibreAccesTelechargee = Evenement<{
  identifiantDiagnostic: crypto.UUID;
  mesuresGenerees: number;
  identifiantUtilisateur?: crypto.UUID;
}>;
