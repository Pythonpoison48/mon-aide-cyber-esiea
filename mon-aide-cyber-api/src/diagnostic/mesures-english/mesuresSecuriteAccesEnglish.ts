import { ReferentielDeMesures } from './../ReferentielDeMesures';
export const mesuresSecuriteAcces: ReferentielDeMesures = {
  'acces-outil-gestion-des-comptes': {
    niveau1: {
      titre:
        'Use a centralized security policy management tool (e.g. Active Directory, Samba-AD) and assess/improve its security annually',
      pourquoi:
        '../../mesures/acces/acces-outil-gestion-des-comptes-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-outil-gestion-des-comptes-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Regularly check the security level of the centralized policy management tool',
      pourquoi:
        '../../mesures/acces/acces-outil-gestion-des-comptes-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-outil-gestion-des-comptes-niveau2-comment.pug',
    },
    priorisation: 14,
    categorie: 'technique',
  },
  'acces-liste-compte-utilisateurs': {
    niveau1: {
      titre:
        'Perform an annual review of user access against HR records',
      pourquoi:
        '../../mesures/acces/acces-liste-compte-utilisateurs-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-liste-compte-utilisateurs-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Define onboarding and offboarding processes with HR that ensure user account creation and deactivation',
      pourquoi:
        '../../mesures/acces/acces-liste-compte-utilisateurs-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-liste-compte-utilisateurs-niveau2-comment.pug',
    },
    priorisation: 25,
    categorie: 'technique',
  },
  'acces-droits-acces-utilisateurs-limites': {
    niveau1: {
      titre:
        'Restrict access to priority protected data to authorized personnel only',
      pourquoi:
        '../../mesures/acces/acces-droits-acces-utilisateurs-limites-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-droits-acces-utilisateurs-limites-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'For priority systems and applications, define and manage users with two privilege levels: full access and restricted access',
      pourquoi:
        '../../mesures/acces/acces-droits-acces-utilisateurs-limites-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-droits-acces-utilisateurs-limites-niveau2-comment.pug',
    },
    priorisation: 31,
    categorie: 'technique',
  },
  'acces-administrateurs-informatiques-suivie-et-limitee': {
    niveau1: {
      titre:
        'Every six months, review administrator access against HR records',
      pourquoi:
        '../../mesures/acces/acces-administrateurs-informatiques-suivie-et-limitee-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-administrateurs-informatiques-suivie-et-limitee-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Define onboarding and offboarding processes with administrators that ensure admin account creation and deactivation',
      pourquoi:
        '../../mesures/acces/acces-administrateurs-informatiques-suivie-et-limitee-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-administrateurs-informatiques-suivie-et-limitee-niveau2-comment.pug',
    },
    priorisation: 29,
    categorie: 'technique',
  },
  'acces-utilisation-comptes-administrateurs-droits-limitee': {
    niveau1: {
      titre: 'Use dedicated administrator accounts for this purpose',
      pourquoi:
        '../../mesures/acces/acces-utilisation-comptes-administrateurs-droits-limitee-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-utilisation-comptes-administrateurs-droits-limitee-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Use separate administrator accounts according to administration scopes',
      pourquoi:
        '../../mesures/acces/acces-utilisation-comptes-administrateurs-droits-limitee-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-utilisation-comptes-administrateurs-droits-limitee-niveau2-comment.pug',
    },
    priorisation: 11,
    categorie: 'technique',
  },
  'acces-utilisateurs-administrateurs-poste': {
    niveau1: {
      titre:
        'Drastically limit the number of users with local admin privileges on their machine',
      pourquoi:
        '../../mesures/acces/acces-utilisateurs-administrateurs-poste-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-utilisateurs-administrateurs-poste-niveau1-comment.pug',
    },
    priorisation: 7,
    categorie: 'technique',
  },
  'acces-mesures-securite-robustesse-mdp': {
    niveau1: {
      titre:
        'Set password length and complexity criteria and encourage the use of a password manager',
      pourquoi:
        '../../mesures/acces/acces-mesures-securite-robustesse-mdp-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-mesures-securite-robustesse-mdp-niveau2-comment.pug',
    },
    niveau2: {
      titre:
        'Provide users with a password manager and regularly train them to create strong passwords',
      pourquoi:
        '../../mesures/acces/acces-mesures-securite-robustesse-mdp-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-mesures-securite-robustesse-mdp-niveau1-comment.pug',
    },
    priorisation: 19,
    categorie: 'technique',
  },
  'acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles': {
    niveau1: {
      titre: 'Protect sensitive data specifically',
      pourquoi:
        '../../mesures/acces/acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Implement additional security measures for sensitive data',
      pourquoi:
        '../../mesures/acces/acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-utilisateurs-donnees-sensibles-mesures-securite-additionnelles-niveau2-comment.pug',
    },
    priorisation: 34,
    categorie: 'technique',
  },
  'acces-teletravail-acces-distants-mesures-particulieres': {
    niveau1: {
      titre:
        'Require at least two-factor authentication for all remote access',
      pourquoi:
        '../../mesures/acces/acces-teletravail-acces-distants-mesures-particulieres-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-teletravail-acces-distants-mesures-particulieres-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Manage all remote access via a VPN authenticated with two-factor authentication',
      pourquoi:
        '../../mesures/acces/acces-teletravail-acces-distants-mesures-particulieres-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-teletravail-acces-distants-mesures-particulieres-niveau2-comment.pug',
    },
    priorisation: 12,
    categorie: 'technique',
  },
  'acces-si-industriel-teletravail-acces-distants-mesures-particulieres': {
    niveau1: {
      titre:
        'Require two-factor authentication for all remote access to industrial systems',
      pourquoi:
        '../../mesures/acces/acces-si-industriel-teletravail-acces-distants-mesures-particulieres-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-si-industriel-teletravail-acces-distants-mesures-particulieres-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Manage all industrial system remote access via a VPN authenticated with two-factor authentication',
      pourquoi:
        '../../mesures/acces/acces-si-industriel-teletravail-acces-distants-mesures-particulieres-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-si-industriel-teletravail-acces-distants-mesures-particulieres-niveau2-comment.pug',
    },
    priorisation: 12,
    categorie: 'technique',
  },
  'acces-administrateurs-si-mesures-specifiques': {
    niveau1: {
      titre: 'Specifically protect administrator access',
      pourquoi:
        '../../mesures/acces/acces-administrateurs-si-mesures-specifiques-niveau1-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-administrateurs-si-mesures-specifiques-niveau1-comment.pug',
    },
    niveau2: {
      titre: 'Enhance administrator access security measures',
      pourquoi:
        '../../mesures/acces/acces-administrateurs-si-mesures-specifiques-niveau2-pourquoi.pug',
      comment:
        '../../mesures/acces/acces-administrateurs-si-mesures-specifiques-niveau2-comment.pug',
    },
    priorisation: 13,
    categorie: 'technique',
  },
};
