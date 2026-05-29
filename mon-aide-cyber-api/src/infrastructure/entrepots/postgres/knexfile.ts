import { construitUrlDeConnexionPostgres } from './urlDeConnexionPostgres';

export default {
  client: 'pg',
  connection:
    process.env.URL_SERVEUR_BASE_DONNEES ||
    construitUrlDeConnexionPostgres() ||
    'postgres://postgres@localhost:5434',
  pool: {
    min: 0,
    max: process.env.BASE_DE_DONNEES_MAX_POOL
      ? parseInt(process.env.BASE_DE_DONNEES_MAX_POOL)
      : 10,
  },
  migrations: { tableName: 'knex_migrations' },
};
