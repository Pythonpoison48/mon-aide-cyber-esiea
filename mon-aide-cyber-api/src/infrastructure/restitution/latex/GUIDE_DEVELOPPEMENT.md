# Guide de Développement - Génération PDF avec LaTeX

## Vue d'ensemble

Ce guide explique comment utiliser et personnaliser le système de génération de rapports PDF avec LaTeX.

## Architecture du Système

```
┌─────────────────────────────────────────┐
│    Route API (routesAPIDiagnostic.ts)  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  AdaptateurDeRestitutionPDF             │
│  (genereRestitution/genereAnnexe)       │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
   ┌─────────┐      ┌──────────────┐
   │GenerateurLaTeX│  │ Compilateur  │
   │(données→LaTeX)│  │(LaTeX→PDF)   │
   └─────────┘      └──────────────┘
        │                 │
        └────────┬────────┘
                 │
                 ▼
            ┌─────────┐
            │   PDF   │
            └─────────┘
```

## Utilisation de Base

### 1. Générer un rapport PDF

```typescript
import { AdaptateurDeRestitutionPDF } from './infrastructure/adaptateurs/AdaptateurDeRestitutionPDF';
import { Restitution } from './restitution/Restitution';

const adaptateur = new AdaptateurDeRestitutionPDF();

// restitution provient de votre entrepôt ou service
const pdfBuffer: Buffer = await adaptateur.genereRestitution(restitution);

// Envoyer le PDF au client
response.contentType('application/pdf').send(pdfBuffer);
```

### 2. Générer une annexe

```typescript
const pdfAnnexe: Buffer = await adaptateur.genereAnnexe(restitution);
```

## Personnalisation

### Modifier le Template LaTeX

Le template se trouve à:
```
src/infrastructure/restitution/latex/templates/rapport-template.tex
```

Éléments clés du template:

1. **Placeholders** - Chaînes à remplacer:
   - `<<DIAGNOSTIC_ID>>` - Identifiant du diagnostic
   - `<<MESURES_PRIORITAIRES>>` - Commandes LaTeX des mesures prioritaires
   - `<<MESURES_COMPLEMENTAIRES>>` - Commandes LaTeX des mesures complémentaires

2. **Commandes personnalisées** - Définies dans le préambule:
   - `\recommandation{titre}{pourquoi}{comment}` - Crée une mesure formatée
   - `\sectionruleline` - Ligne de séparation stylistique

3. **Couleurs** - Définies via `\definecolor`:
   ```latex
   \definecolor{esieablue}{RGB}{54,169,225}
   \definecolor{esieadarkblue}{RGB}{21,29,52}
   % ... etc
   ```

### Ajouter une Section Personnalisée

Pour ajouter une nouvelle section au template:

```latex
\section{Ma nouvelle section}

\subsection{Mon sous-titre}

Du texte normal ou avec des commandes comme:

\begin{tcolorbox}[...]
  Contenu dans une boîte colorée
\end{tcolorbox}

\begin{itemize}
  \item Point 1
  \item Point 2
\end{itemize}
```

### Modifier le Formatage des Mesures

La classe `GenerateurLaTeX` génère les mesures avec:

```typescript
private genereMesure(mesure: MesurePriorisee, index: number): string {
  return `\\recommandation{${titre}}{${pourquoi}}{${comment}}`;
}
```

Pour personnaliser, modifiez cette méthode.

## Gestion des Caractères Spéciaux

La classe `GenerateurLaTeX` échappe automatiquement les caractères spéciaux LaTeX:

| Caractère | Échappement |
|-----------|------------|
| `\` | `\textbackslash{}` |
| `&` | `\&` |
| `%` | `\%` |
| `$` | `\$` |
| `#` | `\#` |
| `_` | `\_` |
| `{` | `\{` |
| `}` | `\}` |
| `~` | `\textasciitilde{}` |
| `^` | `\textasciicircum{}` |

**Aucune action requise** - l'échappement est automatique lors de la génération.

## Intégration avec les Routes API

### Route Existante - Exemple

```typescript
// Dans routesAPIDiagnostic.ts
const genereRestitution = (restitution: Restitution) => {
  if (requete.headers.accept === 'application/pdf') {
    return configuration.adaptateursRestitution
      .pdf()
      .genereRestitution(restitution);  // Utilise maintenant LaTeX
  }
  return configuration.adaptateursRestitution
    .html()
    .genereRestitution(restitution);
};
```

## Dépannage

### Erreur: "pdflatex not found"

**Solution**: Installez TeX/LaTeX sur votre système (voir README.md pour les instructions).

### Erreur: "File not found"

**Solution**: Vérifiez que le template existe à:
```
src/infrastructure/restitution/latex/templates/rapport-template.tex
```

### Résultat PDF incomplet ou mal formaté

**Solutions**:
1. Vérifiez le contenu LaTeX généré (ajoutez du logging)
2. Compilez le fichier LaTeX manuellement pour voir les erreurs:
   ```bash
   pdflatex document.tex
   ```
3. Vérifiez que les packages LaTeX requis sont installés

## Tests

Les tests existants pour `AdaptateurDeRestitutionPDF` continueront de fonctionner.

### Créer un test unitaire

```typescript
import { AdaptateurDeRestitutionPDF } from '...';
import { MesurePriorisee } from '...';

describe('AdaptateurDeRestitutionPDF', () => {
  it('génère un PDF valide', async () => {
    const adaptateur = new AdaptateurDeRestitutionPDF();
    const restitution = {
      identifiant: '550e8400-e29b-41d4-a716-446655440000',
      mesures: {
        mesuresPrioritaires: [/* ... */],
        autresMesures: [/* ... */],
      },
    };

    const pdf = await adaptateur.genereRestitution(restitution);

    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
  });
});
```

## Performance et Optimisation

- **Compilation en mémoire** - Les fichiers temporaires sont créés dans `/tmp`
- **Nettoyage automatique** - Les fichiers temporaires sont supprimés après compilation
- **Double passe LaTeX** - Nécessaire pour la table des matières (normal et attendu)

## Configuration Avancée

Voir `src/infrastructure/restitution/latex/configuration.ts` pour les paramètres personnalisables:

```typescript
configurationTemplate.couleurs.esieablue = { r: 50, g: 150, b: 220 };
configurationTemplate.misePage.marge = '2cm';
```

## Migrer depuis Pug + Puppeteer

Les anciens fichiers Pug peuvent être conservés pour la compatibilité ou supprimés:

```
src/infrastructure/restitution/pdf/modeles/
  └── restitution.*.pug  (potentiellement supprimables)
```

Les dépendances dans `package.json` peuvent être maintenues pour d'autres usages.

## Ressources Additionnelles

- [LaTeX Documentation](https://www.latex-project.org/help/documentation/)
- [TikZ Manual](https://tikz.dev/)
- [tcolorbox Package](https://www.ctan.org/pkg/tcolorbox)
- [teclof Package](https://www.ctan.org/pkg/tocloft)

