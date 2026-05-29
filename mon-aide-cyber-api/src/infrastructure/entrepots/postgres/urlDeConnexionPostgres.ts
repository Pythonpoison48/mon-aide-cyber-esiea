const valeurParDefaut = (valeur: string | undefined, defaut: string) =>
  valeur && valeur.length > 0 ? valeur : defaut;

export const construitUrlDeConnexionPostgres = (): string | undefined => {
  const host = valeurParDefaut(process.env.POSTGRES_HOST, 'db');
  const port = valeurParDefaut(process.env.POSTGRES_PORT, '5432');
  const baseDeDonnees = process.env.POSTGRES_DB;
  const utilisateur = process.env.POSTGRES_USER;
  const motDePasse = process.env.POSTGRES_PASSWORD;

  if (!baseDeDonnees || !utilisateur || !motDePasse) {
    return undefined;
  }

  const utilisateurEncode = encodeURIComponent(utilisateur);
  const motDePasseEncode = encodeURIComponent(motDePasse);

  return `postgres://${utilisateurEncode}:${motDePasseEncode}@${host}:${port}/${baseDeDonnees}`;
};