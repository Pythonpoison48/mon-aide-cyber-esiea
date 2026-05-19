# Installation Rapide - Génération PDF avec LaTeX

## ⚡ Démarrage Rapide (5 minutes)

### Étape 1: Installer LaTeX

Choisissez l'une des options ci-dessous selon votre système d'exploitation:

#### 🐧 Linux (Ubuntu/Debian)
```bash
sudo apt-get update && sudo apt-get install -y texlive-latex-base texlive-latex-extra texlive-fonts-extra texlive-xetex
```

#### 🍎 macOS
```bash
# Option 1: BasicTeX (minimal, ~100 MB)
brew install basictex

# Option 2: MacTeX (complet, ~4 GB)
brew install --cask mactex
```

#### 🪟 Windows
1. Téléchargez et installez [MiKTeX](https://miktex.org/download)
   - OU -
   Téléchargez et installez [TeX Live](https://www.tug.org/texlive/)
2. Redémarrez votre terminal après l'installation

### Étape 2: Vérifier l'Installation

```bash
# Linux/macOS
cd mon-aide-cyber-api/src/infrastructure/restitution/latex
chmod +x check-latex.sh
./check-latex.sh

# Windows
cd mon-aide-cyber-api\src\infrastructure\restitution\latex
check-latex.bat
```

Vous devriez voir:
```
✓ pdflatex trouvé
✓ Toutes les dépendances LaTeX sont installées!
```

### Étape 3: Tester la Génération

```bash
cd mon-aide-cyber-api
npm test
```

## 🔍 Troubleshooting

### ❌ "pdflatex: command not found"

**Linux/macOS:**
```bash
# Vérifiez le PATH
which pdflatex
ls /usr/local/bin/pdflatex

# Si pas trouvé, créez un lien symbolique
# (dépend de votre installation)
```

**Windows:**
- Ajoutez le dossier MiKTeX/TeX Live bin au PATH Windows
- Redémarrez le terminal

### ❌ "Template file not found"

Vérifiez la structure des fichiers:
```
src/
└── infrastructure/
    └── restitution/
        └── latex/
            └── templates/
                └── rapport-template.tex  ← Ce fichier doit exister
```

### ❌ Erreur de compilation LaTeX

Ajoutez du logging dans `GenerateurLaTeX.ts`:
```typescript
console.log('LaTeX généré:', contenuLatex);
```

## 📦 Dépendances Requises

| Dépendance | Type | Status |
|-----------|------|--------|
| pdflatex | Système | ✅ Requis |
| fontawesome5 | LaTeX package | Inclus avec texlive-fonts-extra |
| tcolorbox | LaTeX package | Inclus avec texlive-latex-extra |
| babel | LaTeX package | Inclus avec texlive-latex-base |

## 🎯 Prochaines Étapes

1. ✅ Installer LaTeX
2. ✅ Vérifier l'installation
3. 📝 [Lire le guide complet](./GUIDE_DEVELOPPEMENT.md)
4. 🎨 [Personnaliser le template](./templates/rapport-template.tex)
5. 📚 [Consulter la documentation](./README.md)

## 📋 Configuration Minimale du Système

| OS | RAM | Espace | Temps d'installation |
|----|-----|--------|----------------------|
| Ubuntu | 512 MB | 500 MB | 2-5 min |
| macOS | 1 GB | 100 MB (BasicTeX) | 1-3 min |
| Windows | 512 MB | 500 MB | 5-10 min |

## 🚀 Vérification Complète

```bash
#!/bin/bash
# Script de vérification complet

echo "1. Vérification de pdflatex..."
pdflatex --version

echo "2. Vérification des fichiers..."
ls -la src/infrastructure/restitution/latex/templates/rapport-template.tex

echo "3. Vérification de la structure TypeScript..."
npm run build

echo "4. Exécution des tests..."
npm test

echo "✓ Installation complétée!"
```

## 📞 Besoin d'Aide?

1. **Problèmes d'installation LaTeX**: Consultez [INSTALL_LATEX.md](./README.md)
2. **Personnalisation**: Consultez [GUIDE_DEVELOPPEMENT.md](./GUIDE_DEVELOPPEMENT.md)
3. **Questions LaTeX**: [TeX Stack Exchange](https://tex.stackexchange.com/)

## ✨ Points Clés

- ✅ **Aucune dépendance npm nouvelle** - Utilise uniquement les modules Node.js natifs
- ✅ **Compilation rapide** - Généralement < 2 secondes par PDF
- ✅ **Haute qualité typographique** - Rendu professionnel
- ✅ **Facile à personnaliser** - Template LaTeX modifiable
- ✅ **Bien documenté** - Guide complet fourni

## 🎓 Cas d'Usage

Après l'installation, vous pouvez:

```typescript
// Générer un rapport PDF
const pdf = await adaptateur.genereRestitution(restitution);
response.contentType('application/pdf').send(pdf);

// Générer une annexe
const annexe = await adaptateur.genereAnnexe(restitution);

// Ajouter des sections personnalisées
// → Modifiez rapport-template.tex
```

---

**Durée totale d'installation**: ⏱️ 10-20 minutes  
**Complexité**: ⭐ Facile  
**Support**: ✅ Documentation complète incluse
