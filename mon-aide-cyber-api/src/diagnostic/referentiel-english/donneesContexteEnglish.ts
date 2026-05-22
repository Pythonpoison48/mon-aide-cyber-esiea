import { QuestionsThematique } from '../Referentiel';

export const donneesContexteEnglish: QuestionsThematique = {
  questions: [
    {
      identifiant: 'context-entity-nature',
      libelle: 'What is the nature of your entity?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-entity-nature-public-entity',
          libelle:
            'Public entity (e.g., local authority, administration, joint syndicate, GIP, etc.)',
          ordre: 0,
        },
        {
          identifiant: 'context-entity-nature-private-company',
          libelle: 'Private company (e.g., VSB, SME, mid-cap)',
          ordre: 1,
        },
        {
          identifiant: 'context-entity-nature-association',
          libelle: 'Association / Non-profit (e.g., 1901 law association)',
          ordre: 2,
        },
        {
          identifiant: 'context-entity-nature-other',
          libelle: 'Other',
          ordre: 3,
        },
      ],
      type: 'choixUnique', // singleChoice
    },
    {
      identifiant: 'context-activity-sector',
      libelle: 'What is its sector of activity?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-activity-sector-administration',
          libelle: 'Public Administration',
          ordre: 0,
        },
        {
          identifiant: 'context-activity-sector-agriculture',
          libelle: 'Agriculture, forestry',
          ordre: 1,
        },
        {
          identifiant: 'context-activity-sector-agrifood',
          libelle: 'Agrifood / Food industry',
          ordre: 2,
        },
        {
          identifiant: 'context-activity-sector-industry',
          libelle: 'Industry',
          ordre: 3,
        },
        {
          identifiant: 'context-activity-sector-defense-industry',
          libelle: 'Defense industry',
          ordre: 4,
        },
        {
          identifiant: 'context-activity-sector-construction',
          libelle: 'Construction',
          ordre: 5,
        },
        {
          identifiant: 'context-activity-sector-tertiary',
          libelle: 'Tertiary / Service sector',
          ordre: 6,
        },
        {
          identifiant: 'context-activity-sector-commerce',
          libelle: 'Commerce / Retail',
          ordre: 7,
        },
        {
          identifiant: 'context-activity-sector-transport',
          libelle: 'Transportation',
          ordre: 8,
        },
        {
          identifiant: 'context-activity-sector-accommodation-and-catering',
          libelle: 'Accommodation and food services / Hospitality',
          ordre: 9,
        },
        {
          identifiant: 'context-activity-sector-information-and-communication',
          libelle: 'Information and communication',
          ordre: 10,
        },
        {
          identifiant:
            'context-activity-sector-financial-and-insurance-activities',
          libelle: 'Financial and insurance activities',
          ordre: 11,
        },
        {
          identifiant: 'context-activity-sector-real-estate-activities',
          libelle: 'Real estate activities',
          ordre: 12,
        },
        {
          identifiant:
            'context-activity-sector-specialized-scientific-and-technical-activities',
          libelle: 'Specialized, scientific, and technical activities',
          ordre: 13,
        },
        {
          identifiant:
            'context-activity-sector-administrative-and-support-service-activities',
          libelle: 'Administrative and support service activities',
          ordre: 14,
        },
        {
          identifiant: 'context-activity-sector-education',
          libelle: 'Education',
          ordre: 15,
        },
        {
          identifiant: 'context-activity-sector-health',
          libelle: 'Healthcare',
          ordre: 16,
        },
        {
          identifiant: 'context-activity-sector-research',
          libelle: 'Research, laboratory',
          ordre: 17,
        },
        {
          identifiant: 'context-activity-sector-medico-social',
          libelle: 'Social work / Medico-social',
          ordre: 18,
        },
        {
          identifiant:
            'context-activity-sector-arts-entertainment-and-recreational-activities',
          libelle: 'Arts, entertainment, and recreation',
          ordre: 19,
        },
        {
          identifiant: 'context-activity-sector-other-service-activities',
          libelle: 'Other service activities',
          ordre: 20,
        },
        {
          identifiant: 'context-activity-sector-household-services',
          libelle: 'Services to households',
          ordre: 21,
        },
        {
          identifiant:
            'context-activity-sector-extra-territorial-activities',
          libelle: 'Extra-territorial activities',
          ordre: 22,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'context-department-tom-headquarters',
      libelle:
        'In which department or overseas territory (DROM-COM) is your headquarters based?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'contexte-departement-tom-siege-social-ain',
          libelle: 'Ain',
          ordre: 1,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-aisne',
          libelle: 'Aisne',
          ordre: 2,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-allier',
          libelle: 'Allier',
          ordre: 3,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-alpes-de-haute-provence',
          libelle: 'Alpes-de-Haute-Provence',
          ordre: 4,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-hautes-alpes',
          libelle: 'Hautes-Alpes',
          ordre: 5,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-alpes-maritimes',
          libelle: 'Alpes-Maritimes',
          ordre: 6,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-ardeche',
          libelle: 'Ardèche',
          ordre: 7,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-ardennes',
          libelle: 'Ardennes',
          ordre: 8,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-ariege',
          libelle: 'Ariège',
          ordre: 9,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-aube',
          libelle: 'Aube',
          ordre: 10,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-aude',
          libelle: 'Aude',
          ordre: 11,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-aveyron',
          libelle: 'Aveyron',
          ordre: 12,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-bouches-du-rhone',
          libelle: 'Bouches-du-Rhône',
          ordre: 13,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-calvados',
          libelle: 'Calvados',
          ordre: 14,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-cantal',
          libelle: 'Cantal',
          ordre: 15,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-charente',
          libelle: 'Charente',
          ordre: 16,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-charente-maritime',
          libelle: 'Charente-Maritime',
          ordre: 17,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-cher',
          libelle: 'Cher',
          ordre: 18,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-correze',
          libelle: 'Corrèze',
          ordre: 19,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-cote-d-or',
          libelle: "Côte-d'Or",
          ordre: 21,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-côtes-d-armor',
          libelle: "Côtes-d'Armor",
          ordre: 22,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-creuse',
          libelle: 'Creuse',
          ordre: 23,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-dordogne',
          libelle: 'Dordogne',
          ordre: 24,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-doubs',
          libelle: 'Doubs',
          ordre: 25,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-drome',
          libelle: 'Drôme',
          ordre: 26,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-eure',
          libelle: 'Eure',
          ordre: 27,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-eure-et-loir',
          libelle: 'Eure-et-Loir',
          ordre: 28,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-finistere',
          libelle: 'Finistère',
          ordre: 29,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-corse-du-sud',
          libelle: 'Corse-du-Sud',
          ordre: 2,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-corse',
          libelle: 'Haute-Corse',
          ordre: 2,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-gard',
          libelle: 'Gard',
          ordre: 30,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-garonne',
          libelle: 'Haute-Garonne',
          ordre: 31,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-gers',
          libelle: 'Gers',
          ordre: 32,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-gironde',
          libelle: 'Gironde',
          ordre: 33,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-herault',
          libelle: 'Hérault',
          ordre: 34,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-ille-et-vilaine',
          libelle: 'Ille-et-Vilaine',
          ordre: 35,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-indre',
          libelle: 'Indre',
          ordre: 36,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-indre-et-loire',
          libelle: 'Indre-et-Loire',
          ordre: 37,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-isere',
          libelle: 'Isère',
          ordre: 38,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-jura',
          libelle: 'Jura',
          ordre: 39,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-landes',
          libelle: 'Landes',
          ordre: 40,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-loir-et-cher',
          libelle: 'Loir-et-Cher',
          ordre: 41,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-loire',
          libelle: 'Loire',
          ordre: 42,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-loire',
          libelle: 'Haute-Loire',
          ordre: 43,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-loire-atlantique',
          libelle: 'Loire-Atlantique',
          ordre: 44,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-loiret',
          libelle: 'Loiret',
          ordre: 45,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-lot',
          libelle: 'Lot',
          ordre: 46,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-lot-et-garonne',
          libelle: 'Lot-et-Garonne',
          ordre: 47,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-lozere',
          libelle: 'Lozère',
          ordre: 48,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-maine-et-loire',
          libelle: 'Maine-et-Loire',
          ordre: 49,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-manche',
          libelle: 'Manche',
          ordre: 50,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-marne',
          libelle: 'Marne',
          ordre: 51,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-marne',
          libelle: 'Haute-Marne',
          ordre: 52,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-mayenne',
          libelle: 'Mayenne',
          ordre: 53,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-meurthe-et-moselle',
          libelle: 'Meurthe-et-Moselle',
          ordre: 54,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-meuse',
          libelle: 'Meuse',
          ordre: 55,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-morbihan',
          libelle: 'Morbihan',
          ordre: 56,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-moselle',
          libelle: 'Moselle',
          ordre: 57,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-nievre',
          libelle: 'Nièvre',
          ordre: 58,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-nord',
          libelle: 'Nord',
          ordre: 59,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-oise',
          libelle: 'Oise',
          ordre: 60,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-orne',
          libelle: 'Orne',
          ordre: 61,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-pas-de-calais',
          libelle: 'Pas-de-Calais',
          ordre: 62,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-puy-de-dome',
          libelle: 'Puy-de-Dôme',
          ordre: 63,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-pyrenees-atlantiques',
          libelle: 'Pyrénées-Atlantiques',
          ordre: 64,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-hautes-pyrenees',
          libelle: 'Hautes-Pyrénées',
          ordre: 65,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-pyrenees-orientales',
          libelle: 'Pyrénées-Orientales',
          ordre: 66,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-bas-rhin',
          libelle: 'Bas-Rhin',
          ordre: 67,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haut-rhin',
          libelle: 'Haut-Rhin',
          ordre: 68,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-rhone',
          libelle: 'Rhône',
          ordre: 69,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-saone',
          libelle: 'Haute-Saône',
          ordre: 70,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-saone-et-loire',
          libelle: 'Saône-et-Loire',
          ordre: 71,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-sarthe',
          libelle: 'Sarthe',
          ordre: 72,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-savoie',
          libelle: 'Savoie',
          ordre: 73,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-savoie',
          libelle: 'Haute-Savoie',
          ordre: 74,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-paris',
          libelle: 'Paris',
          ordre: 75,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-seine-maritime',
          libelle: 'Seine-Maritime',
          ordre: 76,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-seine-et-marne',
          libelle: 'Seine-et-Marne',
          ordre: 77,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-yvelines',
          libelle: 'Yvelines',
          ordre: 78,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-deux-sevres',
          libelle: 'Deux-Sèvres',
          ordre: 79,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-somme',
          libelle: 'Somme',
          ordre: 80,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-tarn',
          libelle: 'Tarn',
          ordre: 81,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-tarn-et-garonne',
          libelle: 'Tarn-et-Garonne',
          ordre: 82,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-var',
          libelle: 'Var',
          ordre: 83,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-vaucluse',
          libelle: 'Vaucluse',
          ordre: 84,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-vendee',
          libelle: 'Vendée',
          ordre: 85,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-vienne',
          libelle: 'Vienne',
          ordre: 86,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-haute-vienne',
          libelle: 'Haute-Vienne',
          ordre: 87,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-vosges',
          libelle: 'Vosges',
          ordre: 88,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-yonne',
          libelle: 'Yonne',
          ordre: 89,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-territoire-de-belfort',
          libelle: 'Territoire de Belfort',
          ordre: 90,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-essonne',
          libelle: 'Essonne',
          ordre: 91,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-hauts-de-seine',
          libelle: 'Hauts-de-Seine',
          ordre: 92,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-seine-saint-denis',
          libelle: 'Seine-Saint-Denis',
          ordre: 93,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-val-de-marne',
          libelle: 'Val-de-Marne',
          ordre: 94,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-val-d-oise',
          libelle: "Val-d'Oise",
          ordre: 95,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-guadeloupe',
          libelle: 'Guadeloupe',
          ordre: 971,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-martinique',
          libelle: 'Martinique',
          ordre: 972,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-guyane',
          libelle: 'Guyane',
          ordre: 973,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-la-reunion',
          libelle: 'La Réunion',
          ordre: 974,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-mayotte',
          libelle: 'Mayotte',
          ordre: 976,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-saintmartin',
          libelle: 'Collectivité de Saint-Martin',
          ordre: 978,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-saintbarthélémy',
          libelle: 'Collectivité de Saint-Barthélémy',
          ordre: 977,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-saintpierreetmiquelon',
          libelle: 'Collectivité de Saint-Pierre et Miquelon',
          ordre: 975,
        },
        {
          identifiant: 'contexte-departement-tom-siege-social-wallisetfutuna',
          libelle: 'Collectivité de Wallis & Futuna',
          ordre: 986,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-polynésiefrançaise',
          libelle: 'Collectivité de Polynésie Française',
          ordre: 987,
        },
        {
          identifiant:
            'contexte-departement-tom-siege-social-nouvellecalédonie',
          libelle: 'Collectivité de Nouvelle-Calédonie',
          ordre: 988,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'context-people-count-in-entity',
      libelle: 'How many people belong to your entity?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-people-count-in-entity-between-1-and-9',
          libelle: 'Between 1 and 9',
          ordre: 0,
        },
        {
          identifiant: 'context-people-count-in-entity-between-10-and-49',
          libelle: 'Between 10 and 49',
          ordre: 1,
        },
        {
          identifiant: 'context-people-count-in-entity-between-50-and-249',
          libelle: 'Between 50 and 249',
          ordre: 2,
        },
        {
          identifiant: 'context-people-count-in-entity-more-than-250',
          libelle: 'More than 250',
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'context-workstations-count-in-entity',
      libelle: 'How many workstations does your entity have?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-workstations-count-in-entity-between-1-and-9',
          libelle: 'Between 1 and 9',
          ordre: 0,
          regle: {
            reponses: [
              {
                identifiantQuestion: 'account-management-tool-access',
                reponseDonnee: 'account-management-tool-access-na',
              },
              {
                identifiantQuestion:
                  'employee-awareness-secure-usage-obligations',
                reponseDonnee: '',
              },
            ],
          },
        },
        {
          identifiant: 'context-workstations-count-in-entity-between-10-and-49',
          libelle: 'Between 10 and 49',
          ordre: 1,
        },
        {
          identifiant: 'context-workstations-count-in-entity-between-50-and-249',
          libelle: 'Between 50 and 249',
          ordre: 2,
        },
        {
          identifiant: 'context-workstations-count-in-entity-more-than-250',
          libelle: 'More than 250',
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'context-research-and-development-activities',
      libelle:
        'Do you believe that your entity, due to its activities, could be targeted for industrial espionage or targeted data theft?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-research-and-development-activities-dk',
          libelle: "I don't know",
          ordre: 0,
        },
        {
          identifiant: 'context-research-and-development-activities-no',
          libelle: 'No',
          ordre: 1,
          regle: {
            reponses: [
              {
                identifiantQuestion: 'user-account-list-access',
                reponseDonnee: 'user-account-list-access-na',
              },
              {
                identifiantQuestion: 'limited-user-access-rights',
                reponseDonnee: 'limited-user-access-rights-na',
              },
              {
                identifiantQuestion:
                  'sensitive-data-user-access-additional-security-measures',
                reponseDonnee:
                  'sensitive-data-user-access-additional-security-measures-na',
              },
              {
                identifiantQuestion: 'r-and-d-workstation-security-encrypted-disks',
                reponseDonnee: 'r-and-d-workstation-security-encrypted-disks-na',
              },
              {
                identifiantQuestion:
                  'infrastructure-security-secure-wifi-access',
                reponseDonnee:
                  'infrastructure-security-secure-wifi-access-na',
              },
              {
                identifiantQuestion:
                  'infrastructure-security-server-storage-space',
                reponseDonnee:
                  'infrastructure-security-server-storage-space-na',
              },
              {
                identifiantQuestion:
                  'industrial-espionage-risk-awareness-r-and-d',
                reponseDonnee:
                  'industrial-espionage-risk-awareness-r-and-d-na',
              },
            ],
          },
        },
        {
          identifiant: 'context-research-and-development-activities-yes',
          libelle: 'Yes',
          ordre: 2,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'context-operates-industrial-information-systems',
      libelle: 'Does your entity operate industrial control systems?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-operates-industrial-information-systems-dk',
          libelle: "I don't know",
          ordre: 1,
        },
        {
          identifiant: 'context-operates-industrial-information-systems-no',
          libelle: 'No',
          ordre: 2,
          regle: {
            reponses: [
              {
                identifiantQuestion: 'governance-industrial-is-blueprint-up-to-date',
                reponseDonnee: 'governance-industrial-is-blueprint-up-to-date-na',
              },
              {
                identifiantQuestion:
                  'industrial-is-telework-access-remote-access-specific-measures',
                reponseDonnee:
                  'industrial-is-telework-access-remote-access-specific-measures-na',
              },
              {
                identifiantQuestion:
                  'industrial-is-workstation-security-functional-and-security-updates-deployed',
                reponseDonnee:
                  'industrial-is-workstation-security-functional-and-security-updates-deployed-na',
              },
              {
                identifiantQuestion:
                  'industrial-is-workstation-security-antivirus-deployed',
                reponseDonnee:
                  'industrial-is-workstation-security-antivirus-deployed-na',
              },
              {
                identifiantQuestion:
                  'industrial-is-infrastructure-security-firewall-deployed',
                reponseDonnee:
                  'industrial-is-infrastructure-security-firewall-deployed-na',
              },
            ],
          },
        },
        {
          identifiant: 'context-operates-industrial-information-systems-yes',
          libelle: 'Yes',
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'context-cyber-attack-suffered',
      libelle: 'Have you ever suffered a cyberattack?',
      poids: 0,
      reponsesPossibles: [
        {
          identifiant: 'context-cyber-attack-suffered-dk',
          libelle: "I don't know",
          ordre: 1,
        },
        {
          identifiant: 'context-cyber-attack-suffered-no',
          libelle: 'No',
          ordre: 2,
        },
        {
          identifiant: 'context-cyber-attack-suffered-yes',
          libelle: 'Yes',
          ordre: 3,
          questions: [
            {
              identifiant: 'context-cyber-attack-suffered-yes-sub-type',
              libelle: 'If yes, what type?',
              poids: 0,
              reponsesPossibles: [
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-compromise',
                  libelle:
                    'Compromise of a workstation, email inbox, or Cloud account',
                  ordre: 0,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-impersonation',
                  libelle: 'Identity theft / Impersonation',
                  ordre: 1,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-ransomware',
                  libelle:
                    'Ransomware or other malware spreading across multiple workstations',
                  ordre: 2,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-access',
                  libelle: 'Compromise of one or more remote accesses',
                  ordre: 3,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-web',
                  libelle: 'Compromise of one or more web services',
                  ordre: 4,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-server',
                  libelle:
                    'Compromise of an internet-facing server or service',
                  ordre: 5,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-networks',
                  libelle: 'Compromise of one or more network devices',
                  ordre: 6,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-indirect-compromise',
                  libelle:
                    'Indirect compromise via a service provider or partner',
                  ordre: 7,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-yes-sub-type-insider-threat',
                  libelle: 'Internal malicious act / Insider threat',
                  ordre: 8,
                },
              ],
              type: 'choixMultiple', // multipleChoice
            },
            {
              identifiant: 'context-cyber-attack-suffered-sub-complaint',
              libelle:
                'If Yes: Have you filed a official complaint or reported it to judicial authorities?',
              poids: 0,
              reponsesPossibles: [
                {
                  identifiant:
                    'context-cyber-attack-suffered-sub-complaint-dk',
                  libelle: "I don't know",
                  ordre: 0,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-sub-complaint-no',
                  libelle: 'No',
                  ordre: 1,
                },
                {
                  identifiant:
                    'context-cyber-attack-suffered-sub-complaint-yes',
                  libelle: 'Yes',
                  ordre: 3,
                },
              ],
              type: 'choixUnique',
            },
          ],
        },
      ],
      type: 'choixUnique',
    },
  ],
};