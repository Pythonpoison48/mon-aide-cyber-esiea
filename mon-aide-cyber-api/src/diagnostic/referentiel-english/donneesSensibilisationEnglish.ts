import { QuestionsThematique } from '../Referentiel';

export const donneesSensibilisationEnglish: QuestionsThematique = {
  questions: [
    {
      identifiant:
        'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques',
      libelle:
        'Are security awareness initiatives regarding cyber threats and best practices implemented?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques',
                niveau: 1, 
                categorie: "non-technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-oui-ponctuellement',
          libelle:
            'Yes, we have occasionally conducted awareness initiatives in recent years',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques',
                niveau: 2, 
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
          questions: [
            {
              identifiant:
                'sensibilisation-nouveaux-arrivants-protection-donnees-ponctuellement',
              libelle:
                'Are new hires trained in data protection during their onboarding?',
              type: 'choixUnique',
              poids: 1.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-ponctuellement-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'sensibilisation-onboarding-protection-donnees',
                        niveau: 1, 
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-ponctuellement-oui',
                  libelle: 'Yes',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 2,
                },
              ],
            },
          ],
        },
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-oui-regulierement',
          libelle:
            'Yes, we conduct annual awareness initiatives for all staff, as well as targeted training for specific departments (e.g., support services, business lines)',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
          questions: [
            {
              identifiant:
                'sensibilisation-nouveaux-arrivants-protection-donnees-regulierement',
              libelle:
                'Are new hires trained in data protection during their onboarding?',
              type: 'choixUnique',
              poids: 1.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-regulierement-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'sensibilisation-onboarding-protection-donnees',
                        niveau: 1, 
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-regulierement-oui',
                  libelle: 'Yes',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 2,
                },
              ],
            },
          ],
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'sensibilisation-risque-espionnage-industriel-r-et-d',
      libelle:
        'Do you conduct specific awareness initiatives targeting employees traveling or on missions abroad?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'sensibilisation-risque-espionnage-industriel-r-et-d-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant:
            'sensibilisation-risque-espionnage-industrial-r-et-d-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'sensibilisation-risque-espionnage-industriel-r-et-d-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-risque-espionnage-industriel-r-et-d',
                niveau: 1, 
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'sensibilisation-risque-espionnage-industriel-r-et-d-oui',
          libelle: 'Yes',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant:
        'sensibilisation-collaborateurs-soumis-obligations-usages-securises',
      libelle:
        'Are staff required to comply with an IT charter or acceptable use policy for computer resources and digital tools?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-collaborateurs-soumis-obligations-usages-securises',
                niveau: 1, 
                categorie: "non-technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-oui-charte-communiquee',
          libelle: 'Yes, an IT charter is shared with employees',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-collaborateurs-soumis-obligations-usages-securises',
                niveau: 2, 
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-oui-charte-signee',
          libelle:
            'Yes, an IT charter is signed by each employee and is attached to the internal rules and regulations',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'sensibilisation-utilisation-ia-travail',
      libelle:
        'Do employees use artificial intelligence tools as part of their work?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'sensibilisation-utilisation-ia-travail-non',
          libelle: 'No',
          ordre: 1,
        },
        {
          identifiant: 'sensibilisation-utilisation-ia-travail-oui',
          libelle: 'Yes',
          ordre: 2,
          questions: [
            {
              identifiant: 'sensibilisation-formation-usage-ia',
              libelle:
                'Are employees trained on the use of artificial intelligence?',
              type: 'choixUnique',
              poids: 2,
              reponsesPossibles: [
                {
                  identifiant: 'sensibilisation-formation-usage-ia-nsp',
                  libelle: 'I do not know',
                  ordre: 1,
                },
                {
                  identifiant: 'sensibilisation-formation-usage-ia-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'sensibilisation-formation-usage-ia',
                        niveau: 1, 
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'sensibilisation-formation-usage-ia-formations',
                  libelle:
                    'Employees have received one or more training sessions on this topic',
                  resultat: {
                    indice: { valeur: 2 },
                    mesures: [
                      {
                        identifiant: 'sensibilisation-charte-usage-ia',
                        niveau: 1, 
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 3,
                },
                {
                  identifiant:
                    'sensibilisation-formation-usage-ia-formations-charte',
                  libelle:
                    'Employees have received one or more training sessions on this topic, and the IT charter covers the use of AI',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 4,
                },
              ],
            },
            {
              identifiant:
                'sensibilisation-ia-traitant-donnees-personnelles',
              libelle:
                'Does the company use artificial intelligence tools that process personal data?',
              type: 'choixUnique',
              poids: 2,
              reponsesPossibles: [
                {
                  identifiant:
                    'sensibilisation-ia-traitant-donnees-personnelles-non',
                  libelle: 'No',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 1,
                },
                {
                  identifiant:
                    'sensibilisation-ia-traitant-donnees-personnelles-oui',
                  libelle: 'Yes',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'sensibilisation-ia-donnees-personnelles-encadrement',
                        niveau: 1, 
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'sensibilisation-ia-traitant-donnees-personnelles-oui-encadres',
                  libelle: 'Yes, and its use is regulated and governed',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 3,
                },
              ],
            },
          ],
        },
      ],
      type: 'choixUnique',
    },
  ],
};