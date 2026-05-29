import { ReferentielDeMesures } from './../ReferentielDeMesures';
export const mesuresSecuritePoste: ReferentielDeMesures = {
  'securite-poste-maj-fonctionnelles-et-securite-deployees': {
    niveau1: {
      titre:
        'Deploy all workstation updates as soon as they become available',
      pourquoi:
        '../../mesures/postes/securite-poste-maj-fonctionnelles-et-securite-deployees-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-maj-fonctionnelles-et-securite-deployees-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Implement additional security measures on systems that cannot receive updates',
      pourquoi:
        '../../mesures/postes/securite-poste-maj-fonctionnelles-et-securite-deployees-niveau2-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-maj-fonctionnelles-et-securite-deployees-niveau2-comment.pug',
    },
    priorisation: 5,
    categorie: 'technique',
  },
  'securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees': {
    niveau1: {
      titre:
        'Deploy all updates to industrial system workstations as soon as they become available',
      pourquoi:
        '../../mesures/postes/securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Implement additional security measures on industrial systems that cannot receive updates',
      pourquoi:
        '../../mesures/postes/securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-niveau2-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-si-industriel-maj-fonctionnelles-et-securite-deployees-niveau2-comment.pug',
    },
    priorisation: 5,
    categorie: 'technique',
  },
  'securite-poste-antivirus-deploye': {
    niveau1: {
      titre:
        'Install antivirus software on workstations systematically',
      pourquoi:
        '../../mesures/postes/securite-poste-antivirus-deploye-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-antivirus-deploye-niveau1-comment.pug',
    },
    niveau2: {
      titre: 'Process antivirus alerts systematically',
      pourquoi:
        '../../mesures/postes/securite-poste-antivirus-deploye-niveau2-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-antivirus-deploye-niveau2-comment.pug',
    },
    priorisation: 4,
    categorie: 'technique',
  },
  'securite-poste-si-industriel-antivirus-deploye': {
    niveau1: {
      titre:
        'Install antivirus on industrial system workstations systematically and regularly verify their operation and updates',
      pourquoi:
        '../../mesures/postes/securite-poste-si-industriel-antivirus-deploye-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-si-industriel-antivirus-deploye-niveau1-comment.pug',
    },
    niveau2: {
      titre:
        'Process antivirus alerts from industrial system workstations systematically',
      pourquoi:
        '../../mesures/postes/securite-poste-si-industriel-antivirus-deploye-niveau2-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-si-industriel-antivirus-deploye-niveau2-comment.pug',
    },
    priorisation: 4,
    categorie: 'technique',
  },
  'securite-poste-pare-feu-local-active': {
    niveau1: {
      titre:
        'Enable the local firewall on workstations systematically',
      pourquoi:
        '../../mesures/postes/securite-poste-pare-feu-local-active-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-pare-feu-local-active-niveau1-comment.pug',
    },
    priorisation: 27,
    categorie: 'technique',
  },
  'securite-poste-outils-complementaires-securisation': {
    niveau1: {
      titre: 'Deploy an EDR (Endpoint Detection & Response) solution',
      pourquoi:
        '../../mesures/postes/securite-poste-outils-complementaires-securisation-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-outils-complementaires-securisation-niveau1-comment.pug',
    },
    niveau2: {
      titre: 'Process EDR alerts systematically',
      pourquoi:
        '../../mesures/postes/securite-poste-outils-complementaires-securisation-niveau2-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-outils-complementaires-securisation-niveau2-comment.pug',
    },
    priorisation: 25,
    categorie: 'technique',
  },
  'securite-poste-r-et-d-disques-chiffres': {
    niveau1: {
      titre: 'Encrypt mobile device hard drives',
      pourquoi:
        '../../mesures/postes/securite-poste-r-et-d-disques-chiffres-niveau1-pourquoi.pug',
      comment:
        '../../mesures/postes/securite-poste-r-et-d-disques-chiffres-niveau1-comment.pug',
    },
    priorisation: 26,
    categorie: 'technique',
  },
};
