export type ConfigurationCategorie = {
  id: string;
  libelle: string;
  description?: string;
  actif: boolean;
  ordre: number;
  couleur: string;
  fichierQuestions: string;
  fichierMesures: string;
  illustrations?: string;
};


export const ConfigurationCategories: ConfigurationCategorie[] = [
  {
    id: 'contexte',
    libelle: 'Contexte',
    actif: true,
    ordre: 0,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesContexte.ts',
    fichierMesures: '',
  },

  {
    id: 'gouvernance',
    libelle: 'Gouvernance',
    actif: true,
    ordre: 1,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesGouvernance.ts',
    fichierMesures: '../mesures/mesuresGouvernance.ts',
  },

  {
    id: 'acces',
    libelle: 'Securité des accès',
    actif: true,
    ordre: 2,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesSecuriteAcces.ts',
    fichierMesures: '../mesures/mesuresSecuriteAcces.ts',
  },

  {
    id: 'reaction',
    libelle: 'Réaction',
    actif: true,
    ordre: 3,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesReaction.ts',
    fichierMesures: '../mesures/mesuresReaction.ts',
  },

  {
    id: 'infrastructure',
    libelle: 'Sécurité de l\'infrastructure',
    actif: true,
    ordre: 4,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesSecuriteInfrastructure.ts',
    fichierMesures: '../mesures/mesuresSecuriteInfrastructure.ts',
  },

  {
    id: 'poste',
    libelle: 'Sécurité des Postes',
    actif: true,
    ordre: 5,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesSecuritePoste.ts',
    fichierMesures: '../mesures/mesuresSecuritePoste.ts',
  },

  {
    id: 'sensibilisation',
    libelle: 'Sensibilisation',
    actif: true,
    ordre: 6,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesSensibilisation.ts',
    fichierMesures: '../mesures/mesuresSensibilisation.ts'
  }

];

