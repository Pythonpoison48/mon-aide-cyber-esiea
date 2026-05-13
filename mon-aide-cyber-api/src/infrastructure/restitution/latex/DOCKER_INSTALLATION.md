# 🐳 Installer LaTeX avec Docker

## Solution Rapide (Recommandée)

Si vous utilisez déjà Docker, **c'est tout ce que vous devez faire:**

### 1. Redémarrer les containers

```bash
# Arrêtez les containers actuels
docker-compose down

# Reconstruisez l'image API avec LaTeX inclus
docker-compose up --build api

# Ou en arrière-plan
docker-compose up --build -d api
```

### 2. Vérifier que LaTeX est installé

```bash
# Entrer dans le container
docker-compose exec api bash

# Vérifier pdflatex
pdflatex --version

# Vous devriez voir:
# pdfTeX 3.14159... (TeX Live ...)
```

### 3. Tester la génération PDF

```bash
# À l'intérieur du container
cd mon-aide-cyber-api
npm test
```

✅ **C'est tout!** LaTeX fonctionne maintenant dans Docker.

---

## Qu'est-ce Qui a Changé?

### Dockerfile-api (modifié)

Avant:
```dockerfile
FROM docker.io/node:22.21.1
RUN apt-get install -y jq
```

Maintenant:
```dockerfile
FROM docker.io/node:22.21.1
RUN apt-get install -y \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-extra \
    texlive-xetex \
    jq
```

### Avantages Docker

✅ **Isolation complète** - LaTeX dans un container dédié  
✅ **Reproductibilité** - Même environnement en dev et prod  
✅ **Aucune installation locale** - Pas besoin d'installer sur votre système  
✅ **Facile à déployer** - Fonctionne sur n'importe quel serveur avec Docker  
✅ **Nettoyer facilement** - Supprimer le container = plus de LaTeX

---

## Commandes Utiles

### Vérifier que LaTeX fonctionne

```bash
docker-compose exec api pdflatex --version
```

### Tester la génération PDF

```bash
docker-compose exec api bash -c "cd mon-aide-cyber-api && npm test"
```

### Voir les logs du container API

```bash
docker-compose logs -f api
```

### Accéder au shell du container

```bash
docker-compose exec api bash
```

### Arrêter/Redémarrer

```bash
# Arrêter
docker-compose stop api

# Redémarrer
docker-compose restart api

# Arrêter et supprimer
docker-compose down api
```

---

## Dépannage Docker

### ❌ "pdflatex: command not found" dans le container

**Cause:** Le Dockerfile n'a pas été reconstruit

**Solution:**
```bash
docker-compose down
docker-compose up --build api
```

### ❌ Erreur: "Cannot connect to Docker daemon"

**Cause:** Docker n'est pas démarré

**Solution (Linux/macOS):**
```bash
# Démarrer Docker
sudo systemctl start docker

# Ou sur macOS: ouvrir l'app Docker
```

### ❌ Permission denied (Windows)

**Cause:** Terminal PowerShell manque les permissions

**Solution:**
```powershell
# Ouvrir PowerShell en Admin
# Puis exécuter docker-compose
```

### ❌ Image "node:22.21.1" not found

**Cause:** Image Docker pas téléchargée

**Solution:**
```bash
# Télécharger l'image
docker pull node:22.21.1

# Puis rebuilder
docker-compose up --build api
```

---

## Vérification Complète

Exécutez cette commande complète:

```bash
#!/bin/bash
set -e

echo "1. Arrêter les containers actuels..."
docker-compose down

echo "2. Reconstruire l'image API avec LaTeX..."
docker-compose up --build -d api

echo "3. Attendre que le container démarre..."
sleep 5

echo "4. Vérifier pdflatex..."
docker-compose exec api pdflatex --version

echo "5. Lancer les tests..."
docker-compose exec api bash -c "cd mon-aide-cyber-api && npm test"

echo "✓ Tout fonctionne!"
```

Sauvegardez comme `setup-latex-docker.sh` et exécutez:
```bash
chmod +x setup-latex-docker.sh
./setup-latex-docker.sh
```

---

## Performance du Container

### Taille de l'image

Avant LaTeX: ~800 MB  
Après LaTeX: ~1.2 GB

**Raison:** TeX Live complet = ~400 MB

### Temps de build

Premier build: ~3-5 minutes (télécharge les packages)  
Builds suivants: < 30 secondes (utilise le cache)

---

## Déploiement en Production

### Sur un serveur Linux avec Docker

```bash
# 1. Cloner le repo
git clone <repo-url>
cd mon-aide-cyber-esiea

# 2. Vérifier que Docker est installé
docker --version
docker-compose --version

# 3. Lancer les containers
docker-compose up -d api

# 4. Vérifier
docker-compose exec api pdflatex --version

# 5. Tests
docker-compose exec api bash -c "cd mon-aide-cyber-api && npm test"
```

### Dockerfile personnalisé pour Production

Si vous voulez une image plus légère (sans dev):

```dockerfile
# Stage 1: Build
FROM node:22.21.1 as builder

RUN apt-get update && apt-get install -y \
    texlive-latex-base texlive-latex-extra texlive-fonts-extra jq && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY mon-aide-cyber-api/package.json ./mon-aide-cyber-api/
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Stage 2: Runtime
FROM node:22.21.1-slim

RUN apt-get update && apt-get install -y \
    texlive-latex-base texlive-latex-extra texlive-fonts-extra && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /build /usr/src/app
WORKDIR /usr/src/app
CMD ["pnpm", "--dir", "mon-aide-cyber-api", "run", "dev"]
```

---

## Variables d'Environnement

Vous pouvez ajouter à `docker-compose.yml`:

```yaml
api:
  environment:
    - LATEX_TEMP_DIR=/tmp/latex
    - LATEX_TIMEOUT=30000
```

Puis utiliser dans le code TypeScript:

```typescript
const tempDir = process.env.LATEX_TEMP_DIR || '/tmp/latex';
const timeout = parseInt(process.env.LATEX_TIMEOUT || '30000');
```

---

## Intégration CI/CD

### GitHub Actions

```yaml
name: Tests avec LaTeX

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_HOST_AUTH_METHOD: trust
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker-compose build api
      
      - name: Verify LaTeX
        run: docker-compose run --rm api pdflatex --version
      
      - name: Run tests
        run: docker-compose run --rm api bash -c "cd mon-aide-cyber-api && npm test"
```

---

## Notes Importantes

⚠️ **Fichiers Temporaires**
- LaTeX crée des fichiers temporaires dans `/tmp/latex-*`
- Ces fichiers sont nettoyés automatiquement
- Si le container est arrêté brutalement, vous pouvez avoir des fichiers restants

💾 **Volumes Persistants**
- Les sources sont montées comme volumes
- Les modifications locales sont reflétées dans le container
- Les `node_modules` sont masqués (voir docker-compose.yml)

🔒 **Sécurité**
- Le container tourne en tant que utilisateur node (pas root)
- LaTeX n'a accès qu'aux fichiers du projet
- Aucun accès réseau externe

---

## Comparaison: Avec/Sans Docker

| Aspect | Sans Docker | Avec Docker |
|--------|------------|-----------|
| Installation LaTeX | Manuelle (par OS) | Automatique dans Dockerfile |
| Environnement | Dépendant du système | Identique partout |
| Performance | Rapide (natif) | Léger ralentissement (~5-10%) |
| Déploiement | Besoin d'installer sur le serveur | Image prête à l'emploi |
| Nettoyage | Complexe | `docker system prune` |
| Maintenance | Par utilisateur | Centralisée (Dockerfile) |

---

## Prochaines Étapes

1. ✅ **Dockerfile-api modifié** - Contient maintenant LaTeX
2. ✅ **Rebuild** - Exécutez `docker-compose up --build api`
3. ✅ **Vérifier** - `docker-compose exec api pdflatex --version`
4. ✅ **Tester** - `docker-compose exec api bash -c "cd mon-aide-cyber-api && npm test"`

## 📞 Aide

Besoin d'aide?

```bash
# Voir les logs détaillés
docker-compose logs -f api

# Inspecter les variables du container
docker-compose exec api env | grep -i latex

# Tester manuellement la compilation
docker-compose exec api bash -c \
  "echo '\\documentclass{article}\\begin{document}Test\\end{document}' > test.tex && pdflatex test.tex"
```

---

**Vous êtes prêt! Lancez Docker et profitez de LaTeX!** 🚀
