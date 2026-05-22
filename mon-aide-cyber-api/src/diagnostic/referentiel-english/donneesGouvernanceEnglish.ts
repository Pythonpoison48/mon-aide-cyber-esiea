import { QuestionsThematique } from '../Referentiel';

export const donneesGouvernanceEnglish: QuestionsThematique = {
  questions: [
    {
      identifiant: 'gouvernance-infos-et-activites-a-proteger',
      libelle:
        'Have you identified the high-priority activities and data that need protection?',
      poids: 2,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-infos-et-activites-a-proteger',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'gouvernance-infos-et-activites-a-proteger-oui-idee-generale',
          libelle:
            'We have a general idea of our high-priority activities and data to protect',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-infos-et-activites-a-proteger',
                niveau: 2,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger-oui-precise',
          libelle:
            'There is a precise and up-to-date list of all core business activities and data to be protected as a priority across the entire organization',
          resultat: {
            indice: { valeur: 3 },
          },
          ordre: 3,
        },
      ],
    },
    {
      identifiant: 'gouvernance-schema-si-a-jour',
      libelle: 'Is there a diagram/map of the organization\'s IT system?',
      poids: 1,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-schema-si-a-jour-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-schema-si-a-jour-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-a-jour',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'gouvernance-schema-si-a-jour-non-plan-historique-obsolete',
          libelle: "We have a legacy diagram that is not up to date",
          resultat: {
            indice: { valeur: 0.5 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-a-jour',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-schema-si-a-jour-oui-macro',
          libelle:
            'An up-to-date, high-level "macro" diagram exists, which is either undetailed or partially detailed',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-a-jour',
                niveau: 2,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'gouvernance-schema-si-a-jour-oui-detaille',
          libelle:
            "A detailed and up-to-date diagram exists, including an exhaustive list of all external interconnections",
          resultat: {
            indice: { valeur: 3 },
          },
          ordre: 4,
        },
      ],
    },
    {
      identifiant: 'gouvernance-schema-si-industriel-a-jour',
      libelle:
        "Is there a diagram and an inventory of the organization's industrial IT systems?",
      poids: 1,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-industriel-a-jour',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-oui-partiel',
          libelle:
            'An up-to-date, high-level "macro" diagram exists, which is either undetailed or partially detailed',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-industriel-a-jour',
                niveau: 2,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-oui-detaille',
          libelle:
            'A detailed diagram exists, including a comprehensive list of IT system components and an exhaustive list of all external interconnections',
          resultat: {
            indice: { valeur: 3 },
          },
          ordre: 4,
        },
      ],
    },
    {
      identifiant: 'gouvernance-connaissance-rgpd-1',
      libelle:
        'Have you listed the personal data processed within your organization?',
      type: 'choixUnique',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-connaissance-rgpd-1',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-oui-liste-données',
          libelle:
            "Yes, we have listed all personal data processed within my organization",
          ordre: 3,
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              { identifiant: 'gouvernance-connaissance-rgpd-1', niveau: 2, categorie: "non-technique", },
            ],
          },
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-oui-registre',
          libelle: 'Yes, we maintain an up-to-date record of processing activities (ROPA)',
          ordre: 4,
          resultat: {
            indice: { valeur: 3 },
          },
        },
      ],
    },
    {
      identifiant: 'gouvernance-responsable-protection-donnees-personnelles',
      libelle:
        'Is there a designated person responsible for personal data protection in the organization?',
      type: 'choixUnique',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles-non',
          libelle: 'No, there is none',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-pilote-conformite-rgpd',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles-oui-employe',
          libelle:
            'Yes, an employee holds this title alongside their other duties',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-role-referent-rgpd-renforce',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 3,
          questions: [
            {
              identifiant:
                'gouvernance-responsabilite-protection-donnees-formalisee-employe',
              libelle:
                'Is this responsibility formalized in a job description, a mission letter, or an internal procedure?',
              type: 'choixUnique',
              poids: 0.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-employe-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'gouvernance-mission-rgpd-formalisee',
                        niveau: 1,
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-employe-oui',
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
            'gouvernance-responsable-protection-donnees-personnelles-oui-dpo',
          libelle: 'Yes, the organization has a dedicated DPO role',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
          questions: [
            {
              identifiant:
                'gouvernance-responsabilite-protection-donnees-formalisee-dpo',
              libelle:
                'Is this responsibility formalized in a job description, a mission letter, or an internal procedure?',
              type: 'choixUnique',
              poids: 0.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-dpo-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'gouvernance-mission-rgpd-formalisee',
                        niveau: 1,
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-dpo-oui',
                  libelle: 'Yes',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      identifiant: 'gouvernance-rgpd-suivi-comite-direction',
      libelle:
        'Is the GDPR topic regularly monitored in committees, management meetings, or dashboards?',
      type: 'choixUnique',
      poids: 1.5,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-rgpd-suivi-comite-direction-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-rgpd-suivi-comite-direction-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-rgpd-strategie-pilotage',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-rgpd-suivi-comite-direction-oui-reunions-occasionnelles',
          libelle:
            'Yes, we have a few occasional meetings addressing this topic',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-suivi-rgpd-structure',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'gouvernance-rgpd-suivi-comite-direction-oui-reunions-dirigeants',
          libelle:
            'Yes, numerous meetings with management are set up to discuss data protection',
          resultat: {
            indice: { valeur: 2.5 },
            mesures: [
              {
                identifiant: 'gouvernance-dpo-dpd-associe-pilotage',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 4,
        },
        {
          identifiant:
            'gouvernance-rgpd-suivi-comite-direction-oui-dpo-invite',
          libelle:
            'Yes, numerous meetings are in place and the DPO is systematically invited to them',
          resultat: { indice: { valeur: 3 } },
          ordre: 5,
        },
      ],
    },
    {
      identifiant: 'gouvernance-collaborateurs-contact-question-rgpd',
      libelle:
        'Do employees know who to contact in case of a GDPR question or doubt regarding the use of personal data?',
      type: 'choixUnique',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-collaborateurs-contact-question-rgpd-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-collaborateurs-contact-question-rgpd-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-point-contact-rgpd-accessible',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-collaborateurs-contact-question-rgpd-oui-dpo-connu',
          libelle: 'Yes, employees know who the DPO is',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-canal-contact-rgpd-dedie',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'gouvernance-collaborateurs-contact-question-rgpd-oui-dpo-mail-dedie',
          libelle:
            'Yes, the DPO is known to employees and a dedicated email address for GDPR management has been set up to contact them',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
    },
    {
      identifiant: 'gouvernance-connaissance-rgpd-2',
      libelle:
        "Do you inform data subjects about the use of their personal data and their rights?",
      type: 'choixUnique',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-connaissance-rgpd-2',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-oui-liste-données',
          libelle:
            "Yes, I inform data subjects about how their personal data is used",
          ordre: 3,
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              { identifiant: 'gouvernance-connaissance-rgpd-2', niveau: 2, categorie: "non-technique", },
            ],
          },
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-oui-registre',
          libelle:
            'Yes, I inform data subjects and I have implemented the necessary means for them to exercise their rights (e.g., access, rectification, objection, erasure)',
          ordre: 4,
          resultat: {
            indice: { valeur: 3 },
          },
          questions: [
            {
              identifiant:
                'gouvernance-demandes-droits-suivies-registre-delais',
              libelle:
                'Are requests tracked in a register or a ticketing tool? And are response times monitored?',
              type: 'choixUnique',
              poids: 0.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-nsp',
                  libelle: 'I do not know',
                  ordre: 1,
                },
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-non',
                  libelle: 'No',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'gouvernance-registre-demandes-droits',
                        niveau: 1,
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-oui',
                  libelle: 'Yes',
                  resultat: {
                    indice: { valeur: 2.5 },
                    mesures: [
                      {
                        identifiant:
                          'gouvernance-controle-delais-demandes-rgpd',
                        niveau: 1,
                        categorie: "non-technique",
                      },
                    ],
                  },
                  ordre: 3,
                },
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-oui-controle-delai',
                  libelle:
                    'Yes, and there is a monitoring system for response deadlines',
                  resultat: { indice: { valeur: 3 } },
                  ordre: 4,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      identifiant: 'gouvernance-exigence-cyber-securite-presta',
      libelle:
        "Are cybersecurity requirements integrated into the contracts of third-party service providers with IT access?",
      poids: 2,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-non',
          libelle:
            'No, no requirements are included in our service contracts',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-exigence-cyber-securite-presta',
                niveau: 1,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 2,
                },
        {
          identifiant:
            'gouvernance-exigence-cyber-securite-presta-oui-formalisee',
          libelle:
            'Yes, cybersecurity requirements are formalized and set for service providers',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant: 'gouvernance-exigence-cyber-securite-presta',
                niveau: 2,
                categorie: "non-technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-oui-fixee',
          libelle:
            'Yes, cybersecurity requirements with penalties are formalized and set for service providers',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
    },
  ],
};