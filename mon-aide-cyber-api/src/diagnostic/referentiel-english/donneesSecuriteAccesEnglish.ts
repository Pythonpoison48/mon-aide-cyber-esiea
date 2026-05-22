import { QuestionsThematique } from '../Referentiel';

export const donneesSecuriteAccesEnglish: QuestionsThematique = {
  questions: [
    {
      identifiant: 'acces-outil-gestion-des-comptes',
      libelle:
        "Is a centralized account and security policy management tool (e.g., Active Directory, Samba-AD, Entra ID, automated administration scripts, etc.) implemented?",
      poids: 0.5,
      reponsesPossibles: [
        {
          identifiant: 'acces-outil-gestion-des-comptes-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'acces-outil-gestion-des-comptes-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'acces-outil-gestion-des-comptes-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'acces-outil-gestion-des-comptes',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'acces-outil-gestion-des-comptes-oui',
          libelle: 'Yes',
          resultat: {
            indice: { valeur: 3 },
            mesures: [
              { identifiant: 'acces-outil-gestion-des-comptes', niveau: 2 },
            ],
          },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-liste-compte-utilisateurs',
      libelle:
        'Is the user account list (including third-party contractors) kept up to date?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'acces-liste-compte-utilisateurs-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'acces-liste-compte-utilisateurs-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'acces-liste-compte-utilisateurs-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'acces-liste-compte-utilisateurs',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant: 'acces-liste-compte-utilisateurs-revue-reguliere',
          libelle:
            'User accounts and their access rights are regularly reviewed (e.g., HR staff list vs. active accounts list)',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant: 'acces-liste-compte-utilisateurs',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant: 'acces-liste-compte-utilisateurs-revue-en-continu',
          libelle:
            "The user account list is continuously updated as part of a systematic process to deactivate inactive accounts. An annual review is also conducted",
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-droits-acces-utilisateurs-limites',
      libelle:
        'Are user access privileges limited to their specific business needs?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'acces-droits-acces-utilisateurs-limites-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant: 'acces-droits-acces-utilisateurs-limites-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'acces-droits-acces-utilisateurs-limites-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'acces-droits-acces-utilisateurs-limites',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-droits-acces-utilisateurs-limites-restrictions-ponctuelles',
          libelle:
            'Access restrictions to certain data are implemented on an ad-hoc basis',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'acces-droits-acces-utilisateurs-limites',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'acces-droits-acces-utilisateurs-limites-restrictions-limitees',
          libelle:
            'User access to data, systems, and applications is strictly restricted to what is necessary for their core activities',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-utilisateurs-administrateurs-poste',
      libelle: 'Are users administrators of their own workstations?',
      poids: 3,
      reponsesPossibles: [
        {
          identifiant: 'acces-utilisateurs-administrateurs-poste-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'acces-utilisateurs-administrateurs-poste-oui',
          libelle:
            'Yes, user login accounts hold administrative privileges on the workstation',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'acces-utilisateurs-administrateurs-poste',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'acces-utilisateurs-administrateurs-poste-suppression-privilege-en-cours',
          libelle:
            'The removal of this privilege is currently being processed; several users are still administrators of their workstations',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant: 'acces-utilisateurs-administrateurs-poste',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-utilisateurs-administrateurs-poste-non-exceptions-justifiees',
          libelle: 'No, and the rare exceptions are justified',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-mesures-securite-robustesse-mdp',
      libelle:
        'Are complexity requirements enforced for user session passwords?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant: 'acces-mesures-securite-robustesse-mdp-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant: 'acces-mesures-securite-robustesse-mdp-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'acces-mesures-securite-robustesse-mdp',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'acces-mesures-securite-robustesse-mdp-contraintes-par-defaut',
          libelle:
            'Password security constraints are required by default for users to access their accounts',
          resultat: { indice: { valeur: 3 } },
          ordre: 2,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-administrateurs-informatiques-suivie-et-limitee',
      libelle:
        'Is the list of IT administrator accounts (including third-party contractors) monitored and limited to what is strictly necessary?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant:
            'acces-administrateurs-informatiques-suivie-et-limitee-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant:
            'acces-administrateurs-informatiques-suivie-et-limitee-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'acces-administrateurs-informatiques-suivie-et-limitee',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'acces-administrateurs-informatiques-suivie-et-limitee-revue-reguliere',
          libelle:
            'Administrator accounts are regularly reviewed (e.g., HR staff list vs. active accounts list)',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'acces-administrateurs-informatiques-suivie-et-limitee',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-administrateurs-informatiques-suivie-et-limitee-revue-continue',
          libelle:
            "The administrator account list is continuously updated as part of a systematic process to deactivate inactive accounts. An annual review is also conducted",
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-utilisation-comptes-administrateurs-droits-limitee',
      libelle:
        'Is the use of administrator accounts strictly restricted to administrative tasks?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant:
            'acces-utilisation-comptes-administrateurs-droits-limitee-nsp',
          libelle: 'I do not know',
          ordre: 0,
        },
        {
          identifiant:
            'acces-utilisation-comptes-administrateurs-droits-limitee-non',
          libelle:
            'No, some users have administrative privileges without any particular restriction',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'acces-utilisation-comptes-administrateurs-droits-limitee',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 1,
        },
        {
          identifiant:
            'acces-utilisation-comptes-administrateurs-droits-quelques-restrictions',
          libelle:
            'The allocation and use of administrative accounts are subject to a few restrictions',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'acces-utilisation-comptes-administrateurs-droits-limitee',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-utilisation-comptes-administrateurs-droits-justifies',
          libelle:
            'All administrative accounts are justified and strictly dedicated to administrative tasks only',
          resultat: { indice: { valeur: 3 } },
          ordre: 3,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant:
        'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles',
      libelle:
        'Is user access to the most sensitive resources and data protected by additional security measures?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant:
            'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant:
            'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-oui-mesures-authentification-renforcees',
          libelle:
            'Yes, measures reinforcing access to this data have been implemented',
          resultat: {
            indice: { valeur: 2 },
            mesures: [
              {
                identifiant:
                  'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-oui-mesures-authentification-renforcees-et-donnees-chiffrees',
          libelle:
            'Yes, measures reinforcing access to this data have been implemented and the data is encrypted',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-teletravail-acces-distants-mesures-particulieres',
      libelle:
        'Are remote working and remote access (including cloud services) protected by multi-factor authentication?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant:
            'acces-teletravail-acces-distants-mesures-particulieres-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant:
            'acces-teletravail-acces-distants-mesures-particulieres-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'acces-teletravail-acces-distants-mesures-particulieres-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'acces-teletravail-acces-distants-mesures-particulieres',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-teletravail-acces-distants-mesures-particulieres-mfa',
          libelle:
            'Some remote connections are protected by multi-factor authentication',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant:
                  'acces-teletravail-acces-distants-mesures-particulieres',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'acces-teletravail-acces-distants-mesures-particulieres-vpn',
          libelle:
            'All remote connections are protected by multi-factor authentication',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant:
        'acces-si-industriel-teletravail-acces-distants-mesures-particulieres',
      libelle:
        'Are remote accesses to industrial control systems (ICS) protected by multi-factor authentication?',
      poids: 1,
      reponsesPossibles: [
        {
          identifiant:
            'acces-si-industriel-teletravail-acces-distants-mesures-particulieres-na',
          libelle: 'Not applicable',
          ordre: 0,
        },
        {
          identifiant:
            'acces-si-industriel-teletravail-acces-distants-mesures-particulieres-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant:
            'acces-si-industriel-teletravail-acces-distants-mesures-particulieres-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant:
                  'acces-si-industriel-teletravail-acces-distants-mesures-particulieres',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-si-industriel-teletravail-acces-distants-mesures-particulieres-mfa',
          libelle:
            'Some remote connections are protected by multi-factor authentication',
          resultat: {
            indice: { valeur: 1 },
            mesures: [
              {
                identifiant:
                  'acces-si-industriel-teletravail-acces-distants-mesures-particulieres',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'acces-si-industriel-teletravail-acces-distants-mesures-particulieres-vpn',
          libelle:
            'All remote connections are protected by multi-factor authentication',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
    {
      identifiant: 'acces-administrateurs-si-mesures-specifiques',
      libelle:
        'Are administrator accesses subject to enhanced security measures?',
      poids: 2,
      reponsesPossibles: [
        {
          identifiant: 'acces-administrateurs-si-mesures-specifiques-nsp',
          libelle: 'I do not know',
          ordre: 1,
        },
        {
          identifiant: 'acces-administrateurs-si-mesures-specifiques-non',
          libelle: 'No',
          resultat: {
            indice: { valeur: 0 },
            mesures: [
              {
                identifiant: 'acces-administrateurs-si-mesures-specifiques',
                niveau: 1, 
                categorie: "technique",
              },
            ],
          },
          ordre: 2,
        },
        {
          identifiant:
            'acces-administrateurs-si-mesures-specifiques-oui-mesures-authentification-renforcees',
          libelle:
            'Yes, measures reinforcing authentication have been implemented',
          resultat: {
            indice: { valeur: 1.5 },
            mesures: [
              {
                identifiant: 'acces-administrateurs-si-mesures-specifiques',
                niveau: 2, 
                categorie: "technique",
              },
            ],
          },
          ordre: 3,
        },
        {
          identifiant:
            'acces-administrateurs-si-mesures-specifiques-oui-mesures-authentification-renforcees-postes-dedies-administration',
          libelle:
            'Yes, measures reinforcing authentication have been implemented and dedicated administrative workstations are used',
          resultat: { indice: { valeur: 3 } },
          ordre: 4,
        },
      ],
      type: 'choixUnique',
    },
  ],
};