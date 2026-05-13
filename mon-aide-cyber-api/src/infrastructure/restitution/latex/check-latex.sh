#!/bin/bash

# Script de vérification des dépendances LaTeX
# Utilisation: chmod +x check-latex.sh && ./check-latex.sh

set -e

echo "================================"
echo "Vérification des dépendances LaTeX"
echo "================================"
echo ""

# Fonction pour vérifier si une commande existe
check_command() {
  if command -v "$1" &> /dev/null; then
    echo "✓ $1 trouvé"
    "$1" --version | head -n 1
    return 0
  else
    echo "✗ $1 NOT FOUND"
    return 1
  fi
}

# Vérifications
echo "Vérification des commandes LaTeX requises..."
echo ""

check_command pdflatex || MISSING_PDFLATEX=1
check_command xelatex || MISSING_XELATEX=1

echo ""
echo "================================"

if [ -z "$MISSING_PDFLATEX" ] && [ -z "$MISSING_XELATEX" ]; then
  echo "✓ Toutes les dépendances LaTeX sont installées!"
  echo "Vous pouvez maintenant utiliser la génération de rapports PDF."
  exit 0
else
  echo "✗ Dépendances manquantes détectées!"
  echo ""
  echo "Pour installer les dépendances LaTeX:"
  echo ""
  
  if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "# Ubuntu/Debian"
    echo "sudo apt-get update"
    echo "sudo apt-get install -y texlive-latex-base texlive-latex-extra texlive-fonts-extra"
    echo ""
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "# macOS"
    echo "brew install basictex"
    echo "# OU"
    echo "brew install --cask mactex"
    echo ""
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "# Windows"
    echo "Téléchargez MiKTeX depuis: https://miktex.org/download"
    echo "OU téléchargez TeX Live depuis: https://www.tug.org/texlive/"
    echo ""
  fi
  
  exit 1
fi
