import { QuestionsThematique } from '../Referentiel';

export const donneesGouvernance: QuestionsThematique = {
  questions: [
    {
      identifiant: 'gouvernance-infos-et-activites-a-proteger',
      libelle:
        'Avez-vous déterminé les activités et les données à protéger en priorité ?',
      poids: 2,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger-nsp',
          libelle: 'Je ne sais pas',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-infos-et-activites-a-proteger',
                niveau: 1,
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'gouvernance-infos-et-activites-a-proteger-oui-idee-generale',
          libelle:
            'Nous avons une idée générale de nos activités et données à protéger en priorité',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-infos-et-activites-a-proteger',
                niveau: 2,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-infos-et-activites-a-proteger-oui-precise',
          libelle:
            'Il existe une liste précise et maintenue à jour de toutes les activités et données métiers à protéger en priorité à l’échelle de l’entité',
          resultat: {
            indice: { valeur: 3 },
          },
          ordre: 3,
        },
      ],
    },
    {
      identifiant: 'gouvernance-schema-si-a-jour',
      libelle: 'Existe-t-il un plan du système d’information de l’entité ?',
      poids: 1,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-schema-si-a-jour-nsp',
          libelle: 'Je ne sais pas',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-schema-si-a-jour-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-a-jour',
                niveau: 1,
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'gouvernance-schema-si-a-jour-non-plan-historique-obsolete',
          libelle: "Nous avons un plan historique qui n'est pas à jour",
          resultat: {
            indice: { valeur: 0.5 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-a-jour',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-schema-si-a-jour-oui-macro',
          libelle:
            'Il existe un plan "macro" non détaillé ou partiellement détaillé à jour',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-a-jour',
                niveau: 2,
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'gouvernance-schema-si-a-jour-oui-detaille',
          libelle:
            "Il existe un schéma détaillé à jour, incluant la liste exhaustive des interconnexions vers l'extérieur",
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
        "Existe-t-il un plan et un inventaire des systèmes d'informations industriels de l'entité ?",
      poids: 1,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-na',
          libelle: 'Non applicable',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-industriel-a-jour',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-oui-partiel',
          libelle:
            'Il existe un plan "macro" non détaillé ou partiellement détaillé à jour',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'gouvernance-schema-si-industriel-a-jour',
                niveau: 2,
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'gouvernance-schema-si-industriel-a-jour-oui-detaille',
          libelle:
            'Il existe un plan détaillé, incluant la liste détaillée des composants du système d’information et la liste exhaustive des interconnexions vers l’extérieur',
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
        'Avez-vous listé les données personnelles traitées au sein de votre entité ?',
      type: 'choixUnique',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-connaissance-rgpd-1',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-oui-liste-données',
          libelle:
            "Oui, nous avons listé l'ensemble des données personnelles traitées au sein de mon entité",
          ordre: 3,
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              { identifiant: 'gouvernance-connaissance-rgpd-1', niveau: 2 },
            ],
          },
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-1-oui-registre',
          libelle: 'Oui, nous tenons à jour un registre des traitements',
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
        'Existe-t-il un responsable de la protection des données personnelles dans l’organisme ?',
      type: 'choixUnique',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles-non',
          libelle: 'Non, il n’y en a pas',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-pilote-conformite-rgpd',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-responsable-protection-donnees-personnelles-oui-employe',
          libelle:
            'Oui, c’est un employé qui a ce titre en plus de ses fonctions',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-role-referent-rgpd-renforce',
                niveau: 1,
              },
            ],
          },
          ordre: 3,
          questions: [
            {
              identifiant:
                'gouvernance-responsabilite-protection-donnees-formalisee-employe',
              libelle:
                'Cette responsabilité est-elle formalisée dans une fiche de poste, une lettre de mission ou une procédure interne ?',
              type: 'choixUnique',
              poids: 0.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-employe-non',
                  libelle: 'Non',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'gouvernance-mission-rgpd-formalisee',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-employe-oui',
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
            'gouvernance-responsable-protection-donnees-personnelles-oui-dpo',
          libelle: 'Oui, l’entreprise a un poste de DPO/DPD attitré',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
          questions: [
            {
              identifiant:
                'gouvernance-responsabilite-protection-donnees-formalisee-dpo',
              libelle:
                'Cette responsabilité est-elle formalisée dans une fiche de poste, une lettre de mission ou une procédure interne ?',
              type: 'choixUnique',
              poids: 0.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-dpo-non',
                  libelle: 'Non',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'gouvernance-mission-rgpd-formalisee',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 1,
                },
                {
                  identifiant:
                    'gouvernance-responsabilite-protection-donnees-formalisee-dpo-oui',
                  libelle: 'Oui',
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
        'Le sujet RGPD est-il suivi régulièrement en comité, réunion de direction ou tableau de bord ?',
      type: 'choixUnique',
      poids: 1.5,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-rgpd-suivi-comite-direction-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-rgpd-suivi-comite-direction-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-rgpd-strategie-pilotage',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-rgpd-suivi-comite-direction-oui-reunions-occasionnelles',
          libelle:
            'Oui, nous avons quelques réunions occasionnelles traitant ce sujet',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-suivi-rgpd-structure',
                niveau: 1,
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'gouvernance-rgpd-suivi-comite-direction-oui-reunions-dirigeants',
          libelle:
            'Oui, de nombreuses réunions avec les dirigeants sont mises en place afin de parler de la protection des données',
          resultat: {
            indice: { valeur: 2.5 },
            mesures: [
              {
                identifiant: 'gouvernance-dpo-dpd-associe-pilotage',
                niveau: 1,
              },
            ],
          },
          ordre: 4,
        },
        {
          identifiant:
            'gouvernance-rgpd-suivi-comite-direction-oui-dpo-invite',
          libelle:
            'Oui, de nombreuses réunions sont en place et le DPO/DPD est systématiquement invité à ces réunions',
          resultat: { indice: { valeur: 3 } },
          ordre: 5,
        },
      ],
    },
    {
      identifiant: 'gouvernance-collaborateurs-contact-question-rgpd',
      libelle:
        'Les collaborateurs savent-ils à qui s’adresser en cas de question RGPD ou de doute sur l’utilisation d’une donnée personnelle ?',
      type: 'choixUnique',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-collaborateurs-contact-question-rgpd-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-collaborateurs-contact-question-rgpd-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-point-contact-rgpd-accessible',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-collaborateurs-contact-question-rgpd-oui-dpo-connu',
          libelle: 'Oui, les collaborateurs connaissent le DPO/DPD',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'gouvernance-canal-contact-rgpd-dedie',
                niveau: 1,
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'gouvernance-collaborateurs-contact-question-rgpd-oui-dpo-mail-dedie',
          libelle:
            'Oui, le DPO/DPD est connu des collaborateurs et un mail dédié au service de gestions RGPD est mis en place pour le contacter',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
    },
    {
      identifiant: 'gouvernance-connaissance-rgpd-2',
      libelle:
        "Informez-vous les personnes concernées sur l'utilisation de leurs données personnelles et leurs droits ? ",
      type: 'choixUnique',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-non',
          libelle: 'Non',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-connaissance-rgpd-2',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-oui-liste-données',
          libelle:
            "Oui, j'informe les personnes concernées sur l’utilisation de leurs données personnelles",
          ordre: 3,
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              { identifiant: 'gouvernance-connaissance-rgpd-2', niveau: 2 },
            ],
          },
        },
        {
          identifiant: 'gouvernance-connaissance-rgpd-2-oui-registre',
          libelle:
            'Oui, j’informe les personnes concernées et j’ai mis en place les moyens nécessaires leur permettant d’exercer leurs droits (ex : accès, rectification, opposition, suppression)',
          ordre: 4,
          resultat: {
            indice: { valeur: 3 },
          },
          questions: [
            {
              identifiant:
                'gouvernance-demandes-droits-suivies-registre-delais',
              libelle:
                'Les demandes sont-elles suivies dans un registre ou un outil de ticketing ? Et les délais de réponse sont-ils contrôlés ?',
              type: 'choixUnique',
              poids: 0.5,
              reponsesPossibles: [
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-nsp',
                  libelle: 'Je ne sais pas',
                  ordre: 1,
                },
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-non',
                  libelle: 'Non',
                  resultat: {
                    indice: { valeur: 0 },
                    mesures: [
                      {
                        identifiant: 'gouvernance-registre-demandes-droits',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 2,
                },
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-oui',
                  libelle: 'Oui',
                  resultat: {
                    indice: { valeur: 2.5 },
                    mesures: [
                      {
                        identifiant:
                          'gouvernance-controle-delais-demandes-rgpd',
                        niveau: 1,
                      },
                    ],
                  },
                  ordre: 3,
                },
                {
                  identifiant:
                    'gouvernance-demandes-droits-suivies-registre-delais-oui-controle-delai',
                  libelle:
                    'Oui, et il y a un système de contrôle du délai de réponse',
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
        "Des exigences de cybersécurité sont-elles intégrées aux contrats des prestataires disposant d'accès informatiques ?",
      poids: 2,
      type: 'choixUnique',
      reponsesPossibles: [
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-na',
          libelle: 'Non applicable',
          ordre: 0,
        },
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-nsp',
          libelle: 'Je ne sais pas',
          ordre: 1,
        },
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-non',
          libelle:
            'Non, aucune exigence ne figure dans nos contrats de prestation',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'gouvernance-exigence-cyber-securite-presta',
                niveau: 1,
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'gouvernance-exigence-cyber-securite-presta-oui-formalisee',
          libelle:
            'Oui, des exigences de cybersécurité sont formalisées et fixées aux prestataires',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant: 'gouvernance-exigence-cyber-securite-presta',
                niveau: 2,
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'gouvernance-exigence-cyber-securite-presta-oui-fixee',
          libelle:
            'Oui, des exigences de cybersécurité avec pénalités sont formalisées et fixées aux prestataires',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
    },
  ],
};
