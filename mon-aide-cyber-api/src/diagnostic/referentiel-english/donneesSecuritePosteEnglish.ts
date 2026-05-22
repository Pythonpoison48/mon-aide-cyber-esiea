import { QuestionsThematique } from '../Referentiel';

export const donneesSecuritePosteEnglish: QuestionsThematique = {
  questions: [
    {
      identifiant: 'securite-poste-maj-fonctionnelles-et-securite-deployees',
      libelle:
        'Are functional and security updates for the software used deployed on both user and administrator workstations?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant:
            'securite-poste-maj-fonctionnelles-et-securite-deployees-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'securite-poste-maj-fonctionnelles-et-securite-deployees-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'securite-poste-maj-fonctionnelles-et-securite-deployees',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'securite-poste-maj-fonctionnelles-et-securite-deployees-systematiquement-avec-exceptions',
          libelle:
            'Updates are systematically deployed, though some exceptions currently remain unaddressed',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'securite-poste-maj-fonctionnelles-et-securite-deployees',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'securite-poste-maj-fonctionnelles-et-securite-deployees-systematiquement-des-que-disponibles',
          libelle:
            'All updates are systematically deployed as soon as they become available, and exceptions are subject to additional compensatory measures',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant:
        'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees',
      libelle:
        'Are functional and security updates deployed on user and administrator workstations within the industrial control systems (ICS)?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant:
            'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-systematiquement-avec-exceptions',
          libelle:
            'Updates are systematically deployed, though some exceptions currently remain unaddressed',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-systematiquement-des-que-disponibles',
          libelle:
            'All updates are systematically deployed as soon as they become available, and exceptions are subject to additional compensatory measures',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'securite-poste-antivirus-deploye',
      libelle:
        'Is an up-to-date antivirus deployed on every workstation?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant: 'securite-poste-antivirus-deploye-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'securite-poste-antivirus-deploye-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'securite-poste-antivirus-deploye',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'securite-poste-antivirus-deploye-oui-alertes-pas-toujours-traitees',
          libelle: 'Yes, but its alerts are not always handled',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant: 'securite-poste-antivirus-deploye',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'securite-poste-antivirus-deploye-oui-alertes-toujours-traitees',
          libelle: 'Yes, and its alerts are systematically handled',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'securite-poste-si-industriel-antivirus-deploye',
      libelle:
        'Is an up-to-date antivirus deployed on every workstation within the industrial control systems?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'securite-poste-si-industriel-antivirus-deploye-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'securite-poste-si-industriel-antivirus-deploye-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'securite-poste-si-industriel-antivirus-deploye-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'securite-poste-si-industriel-antivirus-deploye',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'securite-poste-si-industriel-antivirus-deploye-oui-alertes-pas-toujours-traitees',
          libelle: 'Yes, but its alerts are not always handled',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant: 'securite-poste-si-industriel-antivirus-deploye',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'securite-poste-si-industriel-antivirus-deploye-oui-alertes-toujours-traitees',
          libelle: 'Yes, and its alerts are systematically handled',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'securite-poste-pare-feu-local-active',
      libelle: 'Is a local firewall enabled on the workstations?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'securite-poste-pare-feu-local-active-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'securite-poste-pare-feu-local-active-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'securite-poste-pare-feu-local-active',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant: 'securite-poste-pare-feu-local-active-oui',
          libelle: 'Yes, and both inbound and outbound traffic are filtered',
          resultat: { indice: { valeur: 3 } },
          ordre: 2,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'securite-poste-outils-complementaires-securisation',
      libelle:
        'In addition to the antivirus, has an EDR solution been implemented?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'securite-poste-outils-complementaires-securisation-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'securite-poste-outils-complementaires-securisation-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'securite-poste-outils-complementaires-securisation',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'securite-poste-outils-complementaires-securisation-oui-outil-complementaire-type-edr',
          libelle:
            'Yes, an EDR solution has been implemented, but its alerts are not always handled',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant:
                  'securite-poste-outils-complementaires-securisation',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'securite-poste-outils-complementaires-securisation-oui-systematique-outil-complementaire-type-edr',
          libelle:
            'Yes, an EDR solution has been implemented and its alerts are systematically handled',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'securite-poste-r-et-d-disques-chiffres',
      libelle: 'Are the hard drives of roaming devices encrypted?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'securite-poste-r-et-d-disques-chiffres-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'securite-poste-r-et-d-disques-chiffres-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'securite-poste-r-et-d-disques-chiffres-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'securite-poste-r-et-d-disques-chiffres',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'securite-poste-r-et-d-disques-chiffres-oui',
          libelle: 'Yes',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
  ],
};