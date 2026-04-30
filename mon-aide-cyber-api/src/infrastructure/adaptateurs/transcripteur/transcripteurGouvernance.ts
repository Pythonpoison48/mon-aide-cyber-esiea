import { Thematique } from '../../../api/representateurs/types';

export const transcripteurGouvernance: Thematique = {
  description:
    "La gouvernance des systèmes d’information implique initialement l'établissement d'objectifs pour ces systèmes, alignés sur la stratégie de l'entreprise. Cette approche vise à déterminer comment le système d'information participe à la création de valeur pour l'entreprise et précise le rôle des différents acteurs.",
  libelle: 'Gouvernance',
  styles: {
    navigation: 'navigation-gouvernance',
  },
  localisationIllustration: '/images/diagnostic/gouvernance/illustration.svg',
  groupes: [
    {
      questions: [{ identifiant: 'gouvernance-infos-et-processus-a-proteger' }],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger',
          'info-bulles': ['gouvernance/infos-et-activites-a-proteger.pug'],
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-schema-si-a-jour',
          'info-bulles': [
            'gouvernance/schema-si-interconnexions-exterieur.pug',
            'gouvernance/schema-si-composants-entite-publique.pug',
          ],
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour',
          'info-bulles': ['gouvernance/schema-si-composants.pug'],
          perimetre: 'SYSTEME-INDUSTRIEL',
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-connaissance-rgpd',
          'info-bulles': [
            'gouvernance/cnil.pug',
            'gouvernance/donnees-personnelles.pug',
          ],
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-connaissance-rgpd-1',
          'info-bulles': [
            'gouvernance/cnil.pug',
            'gouvernance/donnees-personnelles.pug',
          ],
        },
      ],
    },
    {
      questions: [
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles',
          'info-bulles': [
            'gouvernance/dpo.pug',
            'gouvernance/donnee-personnelle.pug',
            'gouvernance/formalisation-mission-rgpd.pug',
          ],
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-rgpd-suivi-comite-direction',
          'info-bulles': ['gouvernance/rgpd.pug'],
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-collaborateurs-contact-question-rgpd',
          'info-bulles': [
            'gouvernance/rgpd.pug',
            'gouvernance/point-contact-rgpd.pug',
          ],
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-connaissance-rgpd-2',
          'info-bulles': [
            'gouvernance/utilisation-donnees-personnelles.pug',
            'gouvernance/demande-exercice-droits.pug',
            'gouvernance/outil-ticketing.pug',
            'gouvernance/delai-reponse-rgpd.pug',
            'gouvernance/registre-demandes-vs-traitements.pug',
          ],
        },
      ],
    },
    {
      questions: [
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta',
          'info-bulles': [
            'gouvernance/contrat-prestataires.pug',
            'gouvernance/contrat-prestataires-si-industriels.pug',
          ],
        },
        {
          identifiant:
            'gouvernance-exigence-cyber-securite-presta-si-industriel',
        },
      ],
    },
  ],
};
