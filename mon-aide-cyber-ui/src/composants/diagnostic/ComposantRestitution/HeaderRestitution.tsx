import { useModale, useNavigationMAC } from '../../../fournisseurs/hooks.ts';
import { useNavigueVersModifierDiagnostic } from '../../../fournisseurs/ContexteNavigationMAC.tsx';
import {
  requeteTelechargementRestitution,
  useRestitution,
} from './useRestitution.ts';
import { useCallback, useState, useEffect } from 'react';
import Button from '../../atomes/Button/Button.tsx';
import { UUID } from '../../../types/Types.ts';
import { ROUTE_MON_ESPACE } from '../../../domaine/MoteurDeLiens.ts';
import { liensMesServicesCyber } from '../../../infrastructure/mes-services-cyber/liens.ts';
import { EditeurRapport } from './EditeurRapport.tsx';

export const HeaderRestitution = ({
  idDiagnostic,
  typeDiagnostic,
  mesuresPrioritaires: mesuresPrioritairesProps,
  mesuresComplementaires: mesuresComplementairesProps,
}: {
  idDiagnostic: UUID;
  typeDiagnostic?: 'libre-acces';
  mesuresPrioritaires?: any[];
  mesuresComplementaires?: any[];
}) => {
  const { affiche, ferme } = useModale();
  const [editeurActif, setEditeurActif] = useState(false);
  const [mesuresPrioritaires, setMesuresPrioritaires] = useState<any[]>([]);
  const [mesuresComplementaires, setMesuresComplementaires] = useState<any[]>([]);

  // Charger les mesures depuis l'API
  useEffect(() => {
    const chargerMesures = async () => {
      try {
        console.log(`[HeaderRestitution] Chargement des mesures pour ${idDiagnostic}`);
        const reponse = await fetch(`/api/diagnostic/${idDiagnostic}/mesures`);
        
        console.log(`[HeaderRestitution] Réponse HTTP: ${reponse.status}`);
        
        if (!reponse.ok) {
          const errorText = await reponse.text();
          console.error(`[HeaderRestitution] Erreur ${reponse.status}:`, errorText);
          
          // Fallback: mesures vides pour que le bouton soit au moins visible
          setMesuresPrioritaires([]);
          setMesuresComplementaires([]);
          return;
        }

        const data = await reponse.json();
        console.log('[HeaderRestitution] Mesures chargées avec succès:', {
          prioritaires: data.mesuresPrioritaires?.length ?? 0,
          complementaires: data.mesuresComplementaires?.length ?? 0,
        });
        
        setMesuresPrioritaires(data.mesuresPrioritaires || []);
        setMesuresComplementaires(data.mesuresComplementaires || []);
      } catch (err) {
        console.error('[HeaderRestitution] Erreur:', err);
        // Fallback pour que le bouton reste visible
        setMesuresPrioritaires([]);
        setMesuresComplementaires([]);
      }
    };

    chargerMesures();
  }, [idDiagnostic]);

  const { navigue } = useNavigueVersModifierDiagnostic(
    typeDiagnostic === 'libre-acces'
      ? '/diagnostic'
      : `${ROUTE_MON_ESPACE}/diagnostic`
  );
  const navigationMAC = useNavigationMAC();

  const { demanderRestitution, enAttenteRestitution } = useRestitution(
    requeteTelechargementRestitution(idDiagnostic, (blob) => {
      const fichier = URL.createObjectURL(blob);
      const lien = document.createElement('a');
      lien.href = fichier;
      lien.download = `restitution-${idDiagnostic}.pdf`;
      lien.click();
    })
  );

  const modifierLeDiagnostic = useCallback(() => {
    navigue(navigationMAC.etat['modifier-diagnostic']);
  }, [navigationMAC.etat]);

  const quitterDiagnostic = () => {
    affiche({
      titre: 'Quitter le diagnostic',
      corps: (
        <section>
          <p>
            Vous vous apprêtez à quitter le diagnostic en cours, votre
            progression sera perdue.
            <br />
            <br />
            Si vous préférez solliciter une aide pour répondre aux questions,
            vous pouvez{' '}
            <a
              href={liensMesServicesCyber().cyberDepartAvecTracking}
              target="_blank"
              rel="noreferrer"
            >
              faire une demande pour un diagnostic accompagné
            </a>
            .
          </p>
          <div className="fr-pt-4w">
            <Button
              type="button"
              variant="secondary"
              key="annule-acceder-a-la-restitution"
              className="fr-mr-2w"
              onClick={ferme}
            >
              Annuler
            </Button>
            <Button
              type="button"
              key="connexion-aidant"
              onClick={() => {
                if (typeDiagnostic === 'libre-acces') {
                  window.location.replace('/');
                } else {
                  window.location.replace(
                    `${ROUTE_MON_ESPACE}/tableau-de-bord`
                  );
                }
              }}
            >
              Quitter le diagnostic
            </Button>
          </div>
        </section>
      ),
    });
  };

  return (
    <header role="banner" className="fr-header diagnostic-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__brand-top"></div>
              <div className="fr-header__service">
                <img
                  className="fr-responsive-img logo-mac-diagnostic"
                  src="/images/logo_mac.svg"
                  alt="ANSSI"
                />
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <div className="header-restitution-actions">
                  <Button
                    type="button"
                    variant="text"
                    onClick={() => demanderRestitution()}
                    disabled={enAttenteRestitution}
                  >
                    <i className="fr-icon-download-line" />
                    <span>Télécharger</span>
                  </Button>
                  {typeDiagnostic === 'libre-acces' && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setEditeurActif(true)}
                    >
                      <i className="fr-icon-pencil-line" />
                      <span>Modifier le rapport</span>
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={modifierLeDiagnostic}
                  >
                    <i className="fr-icon-pencil-line" />
                    <span>Modifier le diagnostic</span>
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={quitterDiagnostic}
                  >
                    <span>Quitter</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {editeurActif && mesuresPrioritaires && mesuresComplementaires && (
        <EditeurRapport
          idDiagnostic={idDiagnostic}
          mesuresPrioritaires={mesuresPrioritaires}
          mesuresComplementaires={mesuresComplementaires}
          onClose={() => setEditeurActif(false)}
          onRecompile={async (mesures) => {
            // Appel API pour recompiler le PDF avec les mesures réorganisées
            const reponse = await fetch(
              `/api/diagnostic/${idDiagnostic}/restitution/recompile`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  mesuresPrioritaires: mesures.mesuresPrioritaires,
                  mesuresComplementaires: mesures.mesuresComplementaires,
                }),
              }
            );

            if (!reponse.ok) {
              throw new Error(`Erreur ${reponse.status}: ${reponse.statusText}`);
            }

            return reponse.blob();
          }}
        />
      )}
    </header>
  );
};
