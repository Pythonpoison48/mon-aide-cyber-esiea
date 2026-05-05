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
    fichierQuestions: './referentiel/donneesContexte',
    fichierMesures: '',
  },
  {
    id: 'gouvernance',
    libelle: 'Gouvernance',
    actif: true,
    ordre: 0,
    couleur: '#cccccc',
    fichierQuestions: './referentiel/donneesGouvernance',
    fichierMesures: '../mesures/mesuresGouvernance',
  },

];

