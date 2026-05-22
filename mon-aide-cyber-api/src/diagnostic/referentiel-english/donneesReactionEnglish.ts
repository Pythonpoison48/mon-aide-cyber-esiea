import { QuestionsThematique } from '../Referentiel';

export const donneesReactionEnglish: QuestionsThematique = {
  questions: [
    {
      identifiant: 'reaction-surveillance-veille-vulnerabilites-potentielles',
      libelle:
        'Do you monitor cybersecurity alerts and published vulnerabilities that could affect you?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'reaction-surveillance-veille-vulnerabilites-potentielles-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant:
            'reaction-surveillance-veille-vulnerabilites-potentielles-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'reaction-surveillance-veille-vulnerabilites-potentielles',
                niveau: 1,
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'reaction-surveillance-veille-vulnerabilites-potentielles-veille-ponctuelle',
          libelle: 'Ad-hoc monitoring is performed',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant:
                  'reaction-surveillance-veille-vulnerabilites-potentielles',
                niveau: 2,
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'reaction-surveillance-veille-vulnerabilites-potentielles-veille-reguliere',
          libelle: 'Proactive and comprehensive monitoring is performed',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'reaction-sauvegardes-donnees-realisees',
      libelle: 'Are regular data backups performed?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant: 'reaction-sauvegardes-donnees-realisees-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'reaction-sauvegardes-donnees-realisees-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'reaction-sauvegardes-donnees-realisees',
                niveau: 1,
                categorie: "technique",
              },
              {
                identifiant:
                  'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole',
                niveau: 1,
                categorie: "technique",
              },
              {
                identifiant:
                  'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement',
                niveau: 1,
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'reaction-sauvegardes-donnees-realisees-oui-ponctuellement',
          libelle: 'Data backups are performed occasionally',
          questions: [
            {
              identifiant:
                'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole',
              libelle:
                'Is there at least one backup set of critical data stored in an environment isolated from the internal office network or "offline"?',
              poids: 3,
              reponsesPossibles: [
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole-na',
                  libelle: 'Not applicable',
                  ordre: 0,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole-nsp',
                  libelle: 'I do not know',
                  ordre: 1,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole',
                        niveau: 1,
                        categorie: "technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole-oui',
                  libelle: 'Yes',
                  resultat: {
                    indice: { valeur: 3 },
                    mesures: [
                      {
                        identifiant:
                          'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-environnement-isole',
                        niveau: 1,
                        categorie: "technique",
                      },
                    ],
                  },
                  ordre: 3,
                },
              ],
              type: 'choixUnique',
            },
            {
              identifiant:
                'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement',
              libelle:
                'If "Yes": Is the restoration of backups for all your critical data regularly tested?',
              poids: 3,
              reponsesPossibles: [
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement-na',
                  libelle: 'Not applicable',
                  ordre: 0,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement-nsp',
                  libelle: 'I do not know',
                  ordre: 1,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement',
                        niveau: 1,
                        categorie: "technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-ponctuellement-tiroir-sauvegarde-testee-regulierement-oui',
                  libelle: 'Yes',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 3,
                },
              ],
              type: 'choixUnique',
            },
          ],
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'reaction-sauvegardes-donnees-realisees',
                niveau: 1,
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere',
          libelle:
            'Data backups are performed automatically and regularly',
          questions: [
            {
              identifiant:
                'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-environnement-isole',
              libelle:
                'Is there at least one backup set of critical data stored in an environment isolated from the internal office network or "offline"?',
              poids: 3,
              reponsesPossibles: [
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-environnement-isole-na',
                  libelle: 'Not applicable',
                  ordre: 0,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-environnement-isole-nsp',
                  libelle: 'I do not know',
                  ordre: 1,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-environnement-isole-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-environnement-isole',
                        niveau: 1,
                        categorie: "technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-environnement-isole-oui',
                  libelle: 'Yes',
                  resultat: {
                    indice: { valeur: 3 },
                  },
                  ordre: 3,
                },
              ],
              type: 'choixUnique',
            },
            {
              identifiant:
                'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-sauvegarde-testee-regulierement',
              libelle:
                'Is the restoration of backups for all your critical data regularly tested?',
              poids: 3,
              reponsesPossibles: [
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-sauvegarde-testee-regulierement-na',
                  libelle: 'Not applicable',
                  ordre: 0,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-sauvegarde-testee-regulierement-nsp',
                  libelle: 'I do not know',
                  ordre: 1,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-sauvegarde-testee-regulierement-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-sauvegarde-testee-regulierement',
                        niveau: 1,
                        categorie: "technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'reaction-sauvegardes-donnees-realisees-oui-automatique-et-reguliere-tiroir-sauvegarde-testee-regulierement-oui',
                  libelle: 'Yes',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 3,
                },
              ],
              type: 'choixUnique',
            },
          ],
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'reaction-dispositif-gestion-crise-adapte-defini',
      libelle: 'Do you know how to react in the event of a cyberattack?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant: 'reaction-dispositif-gestion-crise-adapte-defini-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'reaction-dispositif-gestion-crise-adapte-defini-non',
          libelle: 'No',
          ordre: 1,
          resultat: {
            mesures: [
              {
                identifiant: 'reaction-dispositif-gestion-crise-adapte-defini',
                niveau: 1,
                categorie: "technique",
              },
            ],
            indice: { valeur: 0 },
          },
        },
        {
          identifiant:
            'reaction-dispositif-gestion-crise-adapte-defini-oui-fiche-reflexe',
          libelle: 'Yes, we have formalized a dedicated quick-reference response sheet',
          resultat: {
            mesures: [
              {
                identifiant: 'reaction-dispositif-gestion-crise-adapte-defini',
                niveau: 2,
                categorie: "technique",
              },
            ],
            indice: { valeur: 1.5 },
          },
          ordre: 2,
        },
        {
          identifiant:
            'reaction-dispositif-gestion-crise-adapte-defini-oui-organisation-gestion-crise-definie',
          libelle:
            'Yes, a crisis management framework tailored for cyber incidents has been defined',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
  ],
};