/**
 * Configuration des ressources pour les templates LaTeX
 * À personnaliser selon vos besoins
 */

export const configurationTemplate = {
  /**
   * Logos et images
   * Note: Les chemins doivent être relatifs au répertoire de compilation
   */
  logos: {
    republicFrancaise: 'images/logo-republique.png',
    anssi: 'images/logo-anssi.png',
    monaidecyber: 'images/logo-monaidecyber.png',
  },

  /**
   * Couleurs (format RGB)
   */
  couleurs: {
    esieablue: { r: 54, g: 169, b: 225 },
    esieadarkblue: { r: 21, g: 29, b: 52 },
    esieaorange: { r: 245, g: 158, b: 0 },
    headerblue: { r: 0, g: 68, b: 158 },
    pourquoibg: { r: 255, g: 255, b: 255 },
    commentbg: { r: 255, g: 255, b: 255 },
    pourquoiborder: { r: 54, g: 169, b: 225 },
    commentborder: { r: 245, g: 158, b: 0 },
  },

  /**
   * Polices et typographie
   */
  typographie: {
    policeCorps: 'lmodern',
    encodageEntree: 'utf8',
    encodageSortie: 'T1',
    langue: 'french',
  },

  /**
   * Mise en page
   */
  misePage: {
    marge: '2.5cm',
    margeHaut: '3cm',
    margeBas: '3.5cm',
    spacementParagraphes: '0.6em',
  },

  /**
   * Contacts et ressources
   */
  ressources: {
    monexpertcyber: 'https://cybermalveillance.gouv.fr/accompagnement',
    cyber17: 'https://cybermalveillance.gouv.fr/17cyber',
    csirt: 'https://cert.ssi.gouv.fr/csirt/csirt-regionaux',
    masecurite: 'https://masecurite.interieur.gouv.fr/fr',
    anssi: 'https://cyber.gouv.fr',
    cgu: 'https://monaide.cyber.gouv.fr/cgu',
    email: 'MonaideCyber@et.esiea.fr',
  },
};

export default configurationTemplate;
