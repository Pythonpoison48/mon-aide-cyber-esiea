export type NiveauMesure = {
  titre: string;
  pourquoi: string;
  comment: string;
};
export type ReferentielDeMesure = {
  niveau1: NiveauMesure;
  niveau2?: NiveauMesure;
  priorisation: number;
  categorie?: 'technique' | 'non-technique' | undefined;
};
export type ReferentielDeMesures = {
  [identifiantQuestion: string]: ReferentielDeMesure;
};
