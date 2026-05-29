## MonAideCyber

### Développement local

1. Copier `mon-aide-cyber-api/.env.example` vers `mon-aide-cyber-api/.env`.
2. Copier `mon-aide-cyber-ui/.env.example` vers `mon-aide-cyber-ui/.env` si nécessaire.
3. Lancer l'environnement de dev avec `docker compose up`.

### Production

1. Créer le réseau Docker partagé si besoin: `docker network create reseau-mon-aide-cyber`.
2. Copier `deploiement/.env.production.example` vers `deploiement/.env.production`.
3. Renseigner les secrets réels et l'URL publique.
4. Lancer la stack de production avec:

```bash
docker compose --env-file deploiement/.env.production -f docker-compose.prod.yml up -d --build
```

Important: ensure `URL_SERVEUR_BASE_DONNEES` is set in `deploiement/.env.production` to a full Postgres connection string, for example:

```text
URL_SERVEUR_BASE_DONNEES=postgres://<db_user>:<db_password>@db:5432/<db_name>
```

If `URL_SERVEUR_BASE_DONNEES` is not provided, the API may fallback to the development defaults defined in `mon-aide-cyber-api/.env` (user `postgres`), which can cause authentication failures when the production database has different roles. Set the correct DB user/password or reinitialize the Postgres volume.

To recreate only the API container after updating `deploiement/.env.production` (no data loss):

```bash
docker compose --env-file deploiement/.env.production -f docker-compose.prod.yml up -d --no-deps --build api
```

To reinitialize the Postgres data volume (THIS DESTROYS DATA):

```bash
docker compose --env-file deploiement/.env.production -f docker-compose.prod.yml down
# Find and remove the volume (example):
docker volume rm mon-aide-cyber-esiea_postgres-data
docker compose --env-file deploiement/.env.production -f docker-compose.prod.yml up -d --build
```

Note: the production API image includes a retry loop for running migrations so it will wait briefly for PostgreSQL to become ready before starting.

### Notes

- Ne pas versionner les vrais fichiers `.env`, seulement les fichiers `.example`.
- Le service API construit automatiquement sa connexion PostgreSQL à partir de `POSTGRES_*` si `URL_SERVEUR_BASE_DONNEES` n'est pas renseigné.

