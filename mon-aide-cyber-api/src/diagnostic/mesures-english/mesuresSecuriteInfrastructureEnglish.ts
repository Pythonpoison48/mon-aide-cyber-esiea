import { ReferentielDeMesures } from './../ReferentielDeMesures';
export const mesuresSecuriteInfrastructure: ReferentielDeMesures = {
  'securite-infrastructure-pare-feu-deploye': {
    niveau1: {
      titre:
        'Deploy a physical firewall to protect the information system’s Internet connection',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-niveau1-comment.pug',
    },
    priorisation: 21,
    categorie: 'technique',
  },
  'securite-infrastructure-pare-feu-deploye-interconnexions-protegees': {
    niveau1: {
      titre: 'Close all non-essential flows and ports',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-interconnexions-protegees-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-interconnexions-protegees-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Use a VPN tunnel for all incoming traffic whenever possible',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-interconnexions-protegees-niveau2-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-interconnexions-protegees-niveau2-comment.pug',
    },
    priorisation: 21,
    categorie: 'technique',
  },
  'securite-infrastructure-pare-feu-deploye-logs-stockes': {
    niveau1: {
      titre:
        'Enable and retain logs of all blocked, incoming, and outgoing traffic identified by the firewall',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-logs-stockes-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-pare-feu-deploye-logs-stockes-niveau1-comment.pug',
    },
    priorisation: 33,
    categorie: 'technique',
  },
  'securite-infrastructure-si-industriel-pare-feu-deploye': {
    niveau1: {
      titre:
        'Close all non-essential flows and ports for industrial systems',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-si-industriel-pare-feu-deploye-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-si-industriel-pare-feu-deploye-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'If possible and not required, separate the industrial network from the internal office network',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-si-industriel-pare-feu-deploye-niveau2-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-si-industriel-pare-feu-deploye-niveau2-comment.pug',
    },
    priorisation: 23,
    categorie: 'technique',
  },
  'securite-infrastructure-mises-a-jour-fonctionnelles-securite-equipements-securite-deployees': {
    niveau1: {
      titre:
        'Deploy all updates to security equipment as soon as they become available',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-mises-a-jour-fonctionnelles-securite-equipements-securite-deployees-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-mises-a-jour-fonctionnelles-securite-equipements-securite-deployees-niveau1-comment.pug',
    },
    priorisation: 2,
    categorie: 'technique',
  },
  'securite-infrastructure-mises-a-jour-fonctionnelles-securite-systemes-exploitation-securite-deployees': {
    niveau1: {
      titre:
        'Deploy all updates to servers, services, and administrative software as soon as they become available',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-mises-a-jour-fonctionnelles-securite-systemes-exploitation-securite-deployees-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-mises-a-jour-fonctionnelles-securite-systemes-exploitation-securite-deployees-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Implement additional security measures on servers, services, and administrative software that cannot receive updates',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-mises-a-jour-fonctionnelles-securite-systemes-exploitation-securite-deployees-niveau2-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-mises-a-jour-fonctionnelles-securite-systemes-exploitation-securite-deployees-niveau2-comment.pug',
    },
    priorisation: 8,
    categorie: 'technique',
  },
  'securite-infrastructure-outils-securisation-systeme-messagerie': {
    niveau1: {
      titre: 'Deploy an anti-spam and anti-phishing solution',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-outils-securisation-systeme-messagerie-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-outils-securisation-systeme-messagerie-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Implement additional protection mechanisms against illegitimate emails',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-outils-securisation-systeme-messagerie-niveau2-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-outils-securisation-systeme-messagerie-niveau2-comment.pug',
    },
    priorisation: 28,
    categorie: 'technique',
  },
  'securite-infrastructure-acces-wifi-securises': {
    niveau1: {
      titre: 'Implement Wi-Fi security measures',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-acces-wifi-securises-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-acces-wifi-securises-niveau1-comment.pug',
    },
    niveau2: {
      titre: 'Create a guest Wi-Fi subnet',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-acces-wifi-securises-niveau2-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-acces-wifi-securises-niveau2-comment.pug',
    },
    priorisation: 36,
    categorie: 'technique',
  },
  'securite-infrastructure-espace-stockage-serveurs': {
    niveau1: {
      titre:
        'Protect information and systems against physical threats',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-espace-stockage-serveurs-niveau1-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-espace-stockage-serveurs-niveau1-comment.pug',
    },
    niveau2: {
      titre: 'Implement a video surveillance system',
      pourquoi:
        '../../mesures/infras/securite-infrastructure-espace-stockage-serveurs-niveau2-pourquoi.pug',
      comment:
        '../../mesures/infras/securite-infrastructure-espace-stockage-serveurs-niveau2-comment.pug',
    },
    priorisation: 35,
    categorie: 'technique',
  },
};
