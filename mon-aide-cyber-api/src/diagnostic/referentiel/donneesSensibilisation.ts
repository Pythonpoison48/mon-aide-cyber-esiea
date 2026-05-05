import { QuestionsThematique } from '../Referentiel';

export const donneesSensibilisation: QuestionsThematique = {
  questions: [
    {
      identifiant:
        'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques',
      libelle:
        'Des actions de sensibilisation à la menace et aux bonnes pratiques cyber sont-elles réalisées ?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-nsp',
          libelle: 'Je ne sais pas',
          ordre: 0,
        },
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques',
                niveau: 1,
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques-oui-ponctuellement',
          libelle:
            'Oui, nous avons déjà mené des actions de sensibilisation ces dernières années',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-actions-sensibilisation-menace-et-bonnes-pratiques',
                niveau: 2,
              },
            ],
          },
          ordre: 2,
          questions: [
            {
              identifiant:
                'sensibilisation-nouveaux-arrivants-protection-donnees-ponctuellement',
              libelle:
                'Les nouveaux arrivants sont-ils sensibilisés à la protection des données lors de leur arrivée ?',
              type: 'choixUnique',
              poids: 1.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-ponctuellement-non',
                  libelle: 'Non',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'sensibilisation-onboarding-protection-donnees',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-ponctuellement-oui',
                  libelle: 'Oui',
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
            'Oui, nous menons chaque année des actions de sensibilisation à l’attention du personnel et ciblant des populations spécifiques (ex : services supports, services métiers)',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
          questions: [
            {
              identifiant:
                'sensibilisation-nouveaux-arrivants-protection-donnees-regulierement',
              libelle:
                'Les nouveaux arrivants sont-ils sensibilisés à la protection des données lors de leur arrivée ?',
              type: 'choixUnique',
              poids: 1.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-regulierement-non',
                  libelle: 'Non',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'sensibilisation-onboarding-protection-donnees',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'sensibilisation-nouveaux-arrivants-protection-donnees-regulierement-oui',
                  libelle: 'Oui',
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
        "Menez-vous des actions de sensibilisation ciblant spécifiquement les collaborateurs effectuant des missions à l'étranger ?",
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'sensibilisation-risque-espionnage-industriel-r-et-d-na',
          libelle: 'Non applicable',
          ordre: 0,
        },
        {
          identifiant:
            'sensibilisation-risque-espionnage-industriel-r-et-d-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant:
            'sensibilisation-risque-espionnage-industriel-r-et-d-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-risque-espionnage-industriel-r-et-d',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'sensibilisation-risque-espionnage-industriel-r-et-d-oui',
          libelle: 'Oui',
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
        'Le respect d’une charte d’utilisation des moyens informatiques et des outils numériques est-il exigé au personnel ?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-nsp',
          libelle: 'Je ne sais pas',
          ordre: 0,
        },
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-collaborateurs-soumis-obligations-usages-securises',
                niveau: 1,
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-oui-charte-communiquee',
          libelle: 'Oui, une charte est communiquée aux collaborateurs',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'sensibilisation-collaborateurs-soumis-obligations-usages-securises',
                niveau: 2,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'sensibilisation-collaborateurs-soumis-obligations-usages-securises-oui-charte-signee',
          libelle:
            'Oui, une charte est signée par chaque collaborateur et elle est annexée au règlement intérieur',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'sensibilisation-utilisation-ia-travail',
      libelle:
        'Les employés utilisent-ils des outils d’intelligence artificielle dans le cadre de leur travail ?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'sensibilisation-utilisation-ia-travail-non',
          libelle: 'Non',
          ordre: 1,
        },
        {
          identifiant: 'sensibilisation-utilisation-ia-travail-oui',
          libelle: 'Oui',
          ordre: 2,
          questions: [
            {
              identifiant: 'sensibilisation-formation-usage-ia',
              libelle:
                'Les employés sont-ils formés quant à l’usage de l’intelligence artificielle ?',
              type: 'choixUnique',
              poids: 2,
              reponsesPossibles: [
                {
                  identifiant: 'sensibilisation-formation-usage-ia-nsp',
                  libelle: 'Je ne sais pas',
                  ordre: 1,
                },
                {
                  identifiant: 'sensibilisation-formation-usage-ia-non',
                  libelle: 'Non',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'sensibilisation-formation-usage-ia',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'sensibilisation-formation-usage-ia-formations',
                  libelle:
                    'Les employés ont eu une ou plusieurs formations à ce sujet',
                  resultat: {
                    indice: { valeur: 2 },
                    mesures: [
                      {
                        identifiant: 'sensibilisation-charte-usage-ia',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 3,
                },
                {
                  identifiant:
                    'sensibilisation-formation-usage-ia-formations-charte',
                  libelle:
                    'Les employés ont eu une ou plusieurs formations à ce sujet et la charte prend en compte l’utilisation des IA.',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 4,
                },
              ],
            },
            {
              identifiant:
                'sensibilisation-ia-traitant-donnees-personnelles',
              libelle:
                'L’entreprise utilise-t-elle des outils d’intelligence artificielle traitant des données personnelles ?',
              type: 'choixUnique',
              poids: 2,
              reponsesPossibles: [
                {
                  identifiant:
                    'sensibilisation-ia-traitant-donnees-personnelles-non',
                  libelle: 'Non',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 1,
                },
                {
                  identifiant:
                    'sensibilisation-ia-traitant-donnees-personnelles-oui',
                  libelle: 'Oui',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant:
                          'sensibilisation-ia-donnees-personnelles-encadrement',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'sensibilisation-ia-traitant-donnees-personnelles-oui-encadres',
                  libelle: 'Oui et ses usages sont encadrés',
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
