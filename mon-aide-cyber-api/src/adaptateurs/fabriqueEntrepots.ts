import { Entrepots } from '../domaine/Entrepots';
import { EntrepotsMemoire } from '../infrastructure/entrepots/memoire/EntrepotsMemoire';
import { EntrepotsMAC } from '../infrastructure/entrepots/postgres/EntrepotsMAC';
import { construitUrlDeConnexionPostgres } from '../infrastructure/entrepots/postgres/urlDeConnexionPostgres';

export const fabriqueEntrepots = (): Entrepots => {
  if (process.env.URL_SERVEUR_BASE_DONNEES || construitUrlDeConnexionPostgres()) {
    return new EntrepotsMAC();
  }
  return new EntrepotsMemoire();
};
