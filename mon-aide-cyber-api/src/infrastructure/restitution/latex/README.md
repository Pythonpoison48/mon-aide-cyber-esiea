# Génération de Rapports PDF avec LaTeX

## Description

Le système de génération de rapports a été migré de Pug + Puppeteer vers **LaTeX + pdflatex** pour une meilleure qualité typographique et un contrôle accru sur le rendu du document.

## Prérequis Système

Vous avez deux options: **Docker** ou **Installation locale**.

### Option 1: Docker (Recommandé) 🐳

Si vous utilisez déjà Docker:

```bash
docker-compose down
docker-compose up --build api
docker-compose exec api pdflatex --version
```

👉 Voir [DOCKER_INSTALLATION.md](./DOCKER_INSTALLATION.md) pour plus de détails.

### Option 2: Installation Locale

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install -y texlive-latex-base texlive-latex-extra texlive-fonts-extra texlive-xetex
```

### macOS
```bash
brew install basictex
brew install --cask mactex
```

### Windows
Téléchargez et installez MiKTeX ou TeX Live depuis:
- [MiKTeX](https://miktex.org/download)
- [TeX Live](https://www.tug.org/texlive/)

Assurez-vous que `pdflatex` est disponible dans le PATH.

## Vérification de l'Installation

```bash
pdflatex --version
```

## Architecture

### Fichiers Créés

1. **`src/infrastructure/restitution/latex/Compilateur.ts`**
   - Classe responsable de la compilation LaTeX en PDF
   - Utilise `pdflatex` via `child_process`
   - Gère les fichiers temporaires

2. **`src/infrastructure/restitution/latex/GenerateurLaTeX.ts`**
   - Classe responsable de la génération du contenu LaTeX
   - Construit les commandes LaTeX à partir des données
   - Échappe les caractères spéciaux LaTeX

3. **`src/infrastructure/restitution/latex/templates/rapport-template.tex`**
   - Template LaTeX principal
   - Inclut la mise en forme complète du document
   - Contient les placeholders pour les données dynamiques

4. **`src/infrastructure/adaptateurs/AdaptateurDeRestitutionPDF.ts`** (modifié)
   - Adaptateur de restitution PDF
   - Utilise maintenant LaTeX au lieu de Pug + Puppeteer

## Utilisation

### Données Requises

```typescript
interface DonneesRapport {
  diagnosticId: string;
  mesuresPrioritaires: MesurePriorisee[];
  mesuresComplementaires: MesurePriorisee[];
}

interface MesurePriorisee {
  titre: string;
  pourquoi: string;
  comment: string;
  valeurObtenue: Valeur;
  priorisation: number;
}
```

### Exemple de Généra

```typescript
const adaptateur = new AdaptateurDeRestitutionPDF();
const restitution: Restitution = { /* ... */ };
const pdfBuffer = await adaptateur.genereRestitution(restitution);
// Le pdfBuffer contient le PDF généré
```

## Caractéristiques LaTeX

Le template utilise:
- **Classe article** avec mise en page A4
- **Babel français** pour la typographie correcte
- **Fontawesome5** pour les icônes
- **tcolorbox** pour les boîtes colorées
- **titlesec** pour la mise en forme des titres
- **fancyhdr** pour en-tête et pied de page

## Structure du Template

1. **Pages de titre et table des matières**
2. **Remerciements** (boîte colorée)
3. **Recommandations prioritaires** (jusqu'à 6 mesures)
4. **Recommandations complémentaires** (mesures supplémentaires)
5. **Liens utiles** (ressources et contacts)

## Gestion des Erreurs

- Les erreurs de compilation LaTeX sont loggées en console
- Les fichiers temporaires sont nettoyés automatiquement après la compilation
- Les exceptions sont propagées avec des messages détaillés

## Performance

- Compilation rapide (généralement < 2 secondes)
- Pas de besoin de navigateur (pas de Puppeteer)
- Pas de serveur PDF externe requise
- Génération en mémoire des fichiers temporaires

## Dépendances

Aucune nouvelle dépendance npm n'est requise. Le système utilise uniquement:
- `fs`, `path`, `os` (modules Node.js natifs)
- `child_process` pour exécuter `pdflatex`

## Tests

Les tests existants pour l'adaptateur PDF continueront de fonctionner. Les mocks peuvent être mis à jour si nécessaire.

## Migration depuis Pug + Puppeteer

Les méthodes suivantes ne sont plus utilisées:
- `pug.compileFile()` - remplacée par `GenerateurLaTeX`
- `puppeteer.connect()` - remplacée par `pdflatex` CLI
- `pdf-lib.PDFDocument` - fusion PDF (si nécessaire, peut être réimplémentée)

Les dépendances `pug` et `puppeteer` peuvent rester dans package.json pour d'autres usages.
