# Guide agent - Mon Aide Cyber

Ce depot est une copie de travail de `betagouv/mon-aide-cyber`, le service MonAideCyber. Le README est vide pour l'instant ; ce fichier sert donc de carte du projet et de guide de contribution pour les agents.

## Vue d'ensemble

- Monorepo `pnpm` avec deux workspaces : `mon-aide-cyber-api` et `mon-aide-cyber-ui`.
- Runtime attendu : Node `22.21.1` via `.nvmrc`, pnpm `10.26.0`.
- Back-end : TypeScript, Express 5, PostgreSQL, Knex, Vitest, architecture par commandes/sagas/evenements, entrepots et adaptateurs.
- Front-end : React 18, Vite 7, React Router, TanStack Query, Sass, DSFR (`@gouvfr/dsfr`), Vitest avec `happy-dom`, Storybook.
- Le serveur API sert aussi le build front depuis `mon-aide-cyber-ui/dist`.

## Regles de travail

- Utiliser uniquement `pnpm` pour les dependances et scripts. Le `preinstall` bloque les autres gestionnaires.
- Garder le vocabulaire metier en francais : `aidant`, `diagnostic`, `restitution`, `demande`, `entrepot`, `adaptateur`, `capteur`, `saga`.
- Limiter les changements au domaine concerne. Eviter les refactors globaux si la demande est locale.
- Ajouter ou ajuster les tests au plus proche du comportement modifie. Les dossiers `test` miroir souvent les dossiers `src`.
- Ne jamais commiter de secrets. Les fichiers `.env.template` documentent les variables attendues.
- Sur les parcours publics et gouvernementaux, conserver les protections existantes : CSP, cookies securises, limiteurs de trafic, verification HATEOAS/relations, sanitization HTML et chiffrement des donnees sensibles.
- Pour les modifications UI, rester coherent avec le DSFR et les composants existants plutot que recreer des controles.

## Racine du depot

- `.github/workflows/` : CI GitHub Actions. `nodejs.yml` installe pnpm, construit back/front, initialise Postgres et lance les tests. Les workflows CodeQL, Checkov, deploiement et Storybook sont aussi presents.
- `clevercloud/` : configuration de taches planifiees Clever Cloud.
- `docker-entrypoint-initdb.d/` : SQL d'initialisation de la base principale.
- `Dockerfile-api` / `Dockerfile-ui` : images Node 22.21.1 pour les services API et UI.
- `docker-compose.yml` : services `web`, `api`, `db`, `db-test`, `migration-test`, `browserless`. Le reseau externe attendu est `reseau-mon-aide-cyber`.
- `package.json` : scripts racine `test`, `build`, `format:verifie`, `format:corrige`, delegation vers les workspaces.
- `pnpm-workspace.yaml` : workspaces et contraintes de release age pnpm.
- `.prettierrc.json` : single quotes, trailing commas ES5.
- `.pre-commit-config.yaml` : hooks whitespace/YAML/large files, stylelint, eslint front et back.

## API - `mon-aide-cyber-api`

### Points d'entree

- `index.ts` assemble les adaptateurs concrets, les entrepots, les bus, les services externes, puis demarre le serveur sur `PORT` ou `8081`.
- `src/serveur.ts` cree l'app Express : sessions cookies, CSRF optionnel, redirection URL de base, limiteur UI, maintenance, headers securite, fichiers statiques du front, routes `/api`, `/pro-connect`, `/contact`, fallback SPA.
- `src/api/routesAPI.ts` monte les sous-routes API principales : contexte, diagnostic libre acces, diagnostic, token, utilisateur, aidant, mon-espace, profil, demandes, annuaire, recherche entreprise, articles, webhooks, statistiques.

### Dossiers metier et techniques

- `src/domaine/` : primitives transverses (`Aggregat`, `Entrepot`, `Entrepots`, `BusEvenement`, `commande`, erreurs MAC).
- `src/diagnostic/` : coeur du moteur de diagnostic, referentiels, questions/reponses, indices, mesures, strategie de reponse, restitution logique.
- `src/diagnostic-libre-acces/` : saga publique qui cree une demande de diagnostic libre acces, initialise un diagnostic, publie l'evenement `DIAGNOSTIC_LIBRE_ACCES_LANCE`, puis cree la relation demande/diagnostic.
- `src/api/diagnostic-libre-acces/` : routes publiques `/api/diagnostic-libre-acces`, lecture/modification du diagnostic, restitution JSON/PDF, verification des diagnostics de moins de 7 jours.
- `src/api/hateoas/` : construction des liens d'action disponibles cote client. Beaucoup d'ecrans consomment ces liens, donc mettre a jour HATEOAS avec les routes.
- `src/api/representateurs/` : transformation des agregats domaine en representations client.
- `src/relation/` : tuples et verification de relations entre entites, notamment pour verifier qu'un diagnostic libre acces correspond a une demande initiee.
- `src/infrastructure/` : implementations techniques.
  - `adaptateurs/` : acces services externes et helpers techniques.
  - `authentification/` : gestion JWT/session.
  - `brevo/` : templates et envoi email.
  - `bus/` : bus commandes/evenements MAC.
  - `entrepots/postgres/` : entrepots Postgres, `knexfile.ts`, migrations.
  - `entrepots/memoire/` : implementations memoire utiles aux tests.
  - `horloge/` : fournisseur de temps, souvent utilise en tests.
  - `middlewares/`, `securite/`, `restitution/`, `taches/` : middleware HTTP, CSP/reseau, generation restitution/PDF, taches planifiees.
- `src/adaptateurs/` : fabriques et adaptateurs de bord de domaine (environnement, cookies, verification de session/acces/relations, ProConnect, messagerie, geographie, Crisp).
- `src/administration/` : scripts CLI de rattrapage, extraction, activation, recherche, suppression et operations ponctuelles.
- `src/gestion-demandes/` : parcours demandes d'aide et demandes devenir aidant.
- `src/espace-aidant/`, `src/espace-utilisateur-inscrit/`, `src/annuaire-aidants/`, `src/statistiques/` : sous-domaines applicatifs.
- `src/journalisation/` : consommateurs d'evenements et ecriture journalisee.
- `src/maintenance/` : page de maintenance servie si `MAINTENANCE_EST_ACTIVE` est activee.

### Tests API

- `test/api/` : tests d'integration HTTP avec `light-my-request`.
- `test/diagnostic/`, `test/auto-diagnostic/`, `test/gestion-demandes/`, etc. : tests unitaires ou metier par domaine.
- `test/infrastructure/entrepots/postgres/` : tests d'entrepots Postgres ; besoin d'une base accessible.
- `test/constructeurs/` : builders de donnees de test. Les reutiliser plutot que creer des objets inline volumineux.
- `test/utilitaires/nettoyeurBDD.ts` : nettoyage des tables de test.

## UI - `mon-aide-cyber-ui`

### Points d'entree

- `src/main.tsx` initialise React, `BrowserRouter`, `QueryClientProvider`, fournisseurs Matomo/navigation/utilisateur/toast, `ErrorBoundary`, modales, routeurs public et prive.
- `src/RouteurPublic.tsx` declare les routes publiques, notamment `/diagnostic-libre-acces`, `/diagnostic/:id` et `/diagnostic/:id/restitution`.
- `src/RouteurPrive.tsx` declare les routes sous espace authentifie.
- `index.html` contient le point de montage React et le placeholder de nonce CSP remplace par l'API.

### Dossiers UI

- `src/assets/` : styles globaux, Sass, tokens visuels et ressources importees dans l'app.
- `public/` : images, fontes et fichiers statiques servis par Vite ou copies dans le build.
- `src/composants/` : composants reutilisables.
  - `atomes/`, `communs/`, `formulaires/` : composants bas niveau.
  - `layout/` : layouts public, diagnostic, aidant, header/footer/sidebar.
  - `diagnostic/` : ecran diagnostic, boutons thematiques, reponses possibles, restitution.
  - `intercepteurs/` : `ComposantIntercepteur` injecte params de route et query params dans les composants d'ecran.
  - `alertes/`, `modale/`, `mot-de-passe/`, `auto-completion/`, `espace-aidant/`, `landing/`, `promouvoir/`, `utilisateur/` : composants specialises.
- `src/domaine/` : fonctionnalites applicatives cote front.
  - `auto-diagnostic/` : ecran et formulaire de demande du diagnostic libre acces.
  - `diagnostic/` : logique front du diagnostic et reducteurs.
  - `hateoas/` : consommation des actions exposees par l'API.
  - `connexion/`, `authentification/`, `validation-cgu/`, `profil/`, `preferences/`, `gestion-demandes/`, `espace-aidant/`, `parcours-utilisation-service/`, `vitrine/`, `crisp/`, `contact/` : parcours fonctionnels.
- `src/fournisseurs/` : context providers React.
- `src/hooks/` : hooks transverses, dont SEO.
- `src/infrastructure/` : liens et integration front de services.
- `src/reducteurs/`, `src/validateurs/`, `src/types/` : utilitaires partages.
- `src/stories/` et `.storybook/` : Storybook.
- `test/` : tests Vitest front, organises par `composants`, `domaine`, `fournisseurs`, `reducteurs`, `constructeurs`.

## Parcours diagnostic libre acces

1. L'utilisateur arrive sur `/diagnostic-libre-acces`.
2. `RouteurPublic.tsx` affiche `EcranDemandeAutodiagnostic`.
3. Le formulaire `CapteurFormulaireDemandeAutodiagnostic` envoie `{ cguSignees: true }` vers `POST /api/diagnostic-libre-acces`.
4. L'API valide les CGU, publie `SagaLanceDiagnosticLibreAcces`, cree une demande, initialise un diagnostic depuis les referentiels, persiste le diagnostic et publie `DIAGNOSTIC_LIBRE_ACCES_LANCE`.
5. Les consommateurs creent la relation entre demande et diagnostic.
6. Le client poursuit sur `/diagnostic/:id`, qui lit et modifie via `GET/PATCH /api/diagnostic-libre-acces/:id`.
7. La restitution est disponible sur `/diagnostic/:id/restitution` et via `GET /api/diagnostic-libre-acces/:id/restitution`, en JSON par defaut ou PDF avec `Accept: application/pdf`.
8. Les routes verifient que le diagnostic libre acces est lie a une demande et qu'il date de moins de 7 jours.

## Commandes utiles

Installation :

```bash
nvm use
pnpm install --frozen-lockfile
```

Build :

```bash
pnpm run build
pnpm run build:back
pnpm run build:front
```

Tests :

```bash
pnpm run test
pnpm run test:back
pnpm run test:front
pnpm -F mon-aide-cyber-api run test:coverage
pnpm -F mon-aide-cyber-ui run test:coverage
```

Format :

```bash
pnpm run format:verifie
pnpm run format:corrige
```

Developpement local :

```bash
docker network create reseau-mon-aide-cyber
docker compose up db db-test browserless
pnpm -F mon-aide-cyber-ui run dev
pnpm -F mon-aide-cyber-api run dev
```

Notes :

- `mon-aide-cyber-ui` a deux modes de dev : `dev` lance `vite build --watch` pour alimenter le serveur API en fichiers statiques, `dev2` lance le serveur Vite sur le port 3000.
- L'API ecoute par defaut sur `8081`.
- Les tests API utilisent par defaut `postgres://postgres@localhost:5434` via `vitest.config.ts`. La CI utilise aussi des variables d'environnement explicites.
- Si une base de test est neuve, lancer les migrations ou l'initialisation CI cote API avant les tests d'integration Postgres.

## Variables d'environnement

- `mon-aide-cyber-api/.env.template` liste les variables API : base MAC, base journalisation, URL MAC/MSC, ProConnect, CSP, CSRF, chiffrement, cookies, Brevo, reseau, Crisp, generation PDF, webhooks, Metabase.
- `mon-aide-cyber-ui/.env.template` liste les variables Vite publiques : maintenance, promotion MSC, URL MSC, URL ProConnect.
- En local, creer les `.env` a partir des templates sans versionner les valeurs.

## Points de vigilance

- Les routes API renvoient souvent des liens HATEOAS consommes par le front. Quand une URL ou action change, verifier API, representateurs, contexte HATEOAS et composants front.
- Les donnees sensibles peuvent etre chiffrees ou journalisees. Suivre les adaptateurs existants plutot que lire/ecrire directement les tables.
- Les migrations Knex sont dans `src/infrastructure/entrepots/postgres/migrations`. Ajouter une migration datee, mettre a jour l'entrepot Postgres et, si necessaire, l'entrepot memoire.
- Les composants front importent beaucoup de `.scss` locaux. Verifier les effets de bord CSS avant de renommer des classes.
- Le build front doit exister dans `mon-aide-cyber-ui/dist` pour que l'API serve correctement la SPA.
- Garder les textes utilisateurs en francais et coherents avec le ton administratif/service public du produit.
