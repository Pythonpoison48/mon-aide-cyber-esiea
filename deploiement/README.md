# Déploiement MonAideCyber

Ce dossier contient les fichiers pour passer du mode de développement local à une exécution de production avec Docker, puis revenir au mode de développement précédent si besoin.

## 1. Passage du mode dev au mode prod

Le setup de production utilise:

- `docker-compose.prod.yml` à la racine du projet.
- `Dockerfile-api.prod` à la racine du projet.
- `deploiement/.env.production` pour les variables d'environnement de production.

### Étapes

Sur Windows, si `pnpm` n'est pas disponible dans le terminal, active Corepack une fois avec `corepack enable`, puis utilise `corepack pnpm ...` à la place de `pnpm ...`.

1. Créer le fichier d'environnement de production à partir du modèle:

```powershell
Copy-Item .\deploiement\.env.production.example .\deploiement\.env.production
```

2. Ouvrir [deploiement/.env.production](./.env.production) et remplacer les valeurs suivantes:

- `URL_MAC` et `URL_AIDE_MAC` par l'URL publique réelle.
- `POSTGRES_PASSWORD` par un mot de passe fort.
- `SECRET_COOKIE` par une valeur longue et aléatoire.
- `CLEF_SECRETE_SIGNATURE_JETONS_SESSIONS` par une autre valeur longue et aléatoire.
- `CLEF_SECRETE_CHIFFREMENT` par une clé longue.
- `GENERATION_PDF_TOKEN_DU_SERVICE` par le token attendu par le service PDF.
- `PRO_CONNECT_*`, `URL_MSC`, `URL_API_RECHERCHE_ENTREPRISE`, `SENTRY_*`, `CRISP_*` seulement si ces services sont utilisés.

3. Créer le réseau Docker partagé s'il n'existe pas déjà:

```powershell
docker network create reseau-mon-aide-cyber
```

4. Lancer la stack de production:

```powershell
docker compose --env-file deploiement/.env.production -f docker-compose.prod.yml up -d --build
```

### Ce qui change en prod

- L'API démarre avec `NODE_ENV=production`.
- Les secrets ne sont plus générés automatiquement en éphémère.
- Le front est buildé dans l'image de production.
- Les volumes de code source ne sont plus montés dans les conteneurs de prod.
- PostgreSQL est stocké dans un volume nommé Docker au lieu du dossier local `bdd-mac/`.

## 2. Revenir au mode dev précédent

L'ancien environnement de développement repose sur:

- `docker-compose.yml` ou `deploiement/docker-compose.windows.yml` selon le poste.
- `deploiement/.env.local` pour les variables locales.
- Les volumes montés sur le code source.
- La base locale dans `bdd-mac/`.

### Retour au mode dev

1. Arrêter la stack de prod si elle tourne:

```powershell
docker compose -f docker-compose.prod.yml down
```

2. Restaurer la configuration de dev locale:

```powershell
Copy-Item .\deploiement\.env.local .\mon-aide-cyber-api\.env
```

3. Utiliser le fichier de composition dev:

```powershell
docker compose up
```

ou, sur Windows, utiliser le script historique:

```powershell
.\deploiement\deploie.ps1
```

Le script Windows copie d'abord `deploiement/.env.local` vers `mon-aide-cyber-api/.env`, puis lance Docker avec cette configuration.

### Ce qui caractérise le mode dev précédent

- `POSTGRES_HOST_AUTH_METHOD=trust` sur la base locale.
- Les fichiers source sont montés dans les conteneurs.
- L'UI et l'API tournent avec des volumes de travail, donc les changements sont visibles immédiatement.
- Les variables sensibles peuvent rester vides ou temporaires pour le travail local.

## 3. Fichiers d'environnement à conserver dans Git

Les fichiers à versionner sont les exemples:

- `mon-aide-cyber-api/.env.example`
- `mon-aide-cyber-ui/.env.example`
- `deploiement/.env.production.example`

Les vrais fichiers à ne pas versionner sont:

- `mon-aide-cyber-api/.env`
- `mon-aide-cyber-ui/.env`
- `deploiement/.env.production`
- `deploiement/.env.local`

## 4. Notes importantes

- Si tu n'as pas encore d'URL publique, tu peux déployer en interne pour tester, mais il faudra remplacer `URL_MAC` et `URL_AIDE_MAC` avant une vraie mise en ligne.
- Si `MAC_CSP` est trop restrictif, les icônes DSFR ou certains scripts externes peuvent être bloqués.
- Si un secret manque en production, l'API refusera maintenant de démarrer au lieu de générer une clé temporaire.
- Lorsque vous testez sur `localhost:8081` avec `deploiement/.env.production`, gardez `AVEC_PROTECTION_CSRF=false` et `URL_MAC=http://localhost:8081`. Remettez `AVEC_PROTECTION_CSRF=true` uniquement pour le déploiement public réel.
- Si `VITE_URL_MSC` n'est pas défini, l'UI utilise l'origine courante au lieu de produire des liens `/undefined`.
- L'image de production lance les migrations PostgreSQL avant `start`.