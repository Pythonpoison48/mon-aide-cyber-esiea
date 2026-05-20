import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { MesurePriorisee } from '../../../diagnostic/Diagnostic';

export interface DonneesRapport {
  diagnosticId: string;
  mesuresPrioritaires: MesurePriorisee[];
  mesuresComplementaires: MesurePriorisee[];
  indicateurs?: { [thematique: string]: { moyennePonderee: number } };
}

/**
 * Génère le contenu LaTeX à partir des données de restitution
 */
export class GenerateurLaTeX {
  private templatePath: string;
  private dossierTemp: string | null = null;

  constructor(dossierTemp?: string) {
    this.templatePath = path.join(
      __dirname,
      'templates',
      'rapport-template.tex'
    );
    this.dossierTemp = dossierTemp || null;
  }

  /**
   * Génère le contenu LaTeX complet
   * @param donnees Données du rapport
   * @returns Contenu LaTeX prêt à être compilé
   */
  genere(donnees: DonneesRapport): string {
    // Charger le template
    const template = fs.readFileSync(this.templatePath, 'utf-8');

    // Générer les mesures (prioritaires sans groupement, complémentaires avec groupement)
    const mesuresPrioritaires = this.genereMesures(
      donnees.mesuresPrioritaires,
      true
    );
    const mesuresComplementaires = this.genereMesures(
      donnees.mesuresComplementaires,
      false
    );

    // Générer l'indicateur polaire si disponible
    let indicateur = '';
    if (donnees.indicateurs) {
      const svgContent = this.genereIndicateurSVG(donnees.indicateurs);
      indicateur = this.genereLatexPourGraphique(svgContent, donnees.diagnosticId);
    }

    // Remplacer les placeholders
    let contenuLatex = template
      .replace('<<DIAGNOSTIC_ID>>', donnees.diagnosticId)
      .replace('<<MESURES_PRIORITAIRES>>', mesuresPrioritaires)
      .replace('<<MESURES_COMPLEMENTAIRES>>', mesuresComplementaires)
      .replace('<<INDICATEUR_POLAIRE>>', indicateur);

    return contenuLatex;
  }

  /**
   * Génère le code SVG du graphique polaire (identique à la page web)
   * @param indicateurs Indicateurs par thématique
   * @returns Code SVG
   */
  private genereIndicateurSVG(indicateurs: { [thematique: string]: { moyennePonderee: number } }): string {
    // Mapping des thématiques avec leurs couleurs
    const couleursThematiques: Map<string, string> = new Map([
      ['gouvernance', '#6369F1'],
      ['SecuriteAcces', '#FEC54B'],
      ['securiteposte', '#8248A1'],
      ['securiteinfrastructure', '#F26C85'],
      ['sensibilisation', '#8ED4A3'],
      ['reaction', '#FD8FB9'],
    ]);

    const libellesThematiques: Map<string, string> = new Map([
      ['gouvernance', 'Gouvernance'],
      ['SecuriteAcces', 'Sécurité Accès'],
      ['securiteposte', 'Sécurité Poste'],
      ['securiteinfrastructure', 'Sécurité Infrastructure'],
      ['sensibilisation', 'Sensibilisation'],
      ['reaction', 'Réaction'],
    ]);

    // Extraire configuration similaire à la page web
    const configurationIndicateurs = Object.entries(indicateurs)
      .map(([thematique, indicateur]) => ({
        thematique: thematique.toLowerCase(),
        legende: libellesThematiques.get(thematique) || thematique,
        couleur: couleursThematiques.get(thematique) || '#000000',
        valeur: indicateur.moyennePonderee * 5 / 3, // Normaliser 0-3 → 0-5
      }));

    const values = configurationIndicateurs.map(c => c.valeur);
    const colors = configurationIndicateurs.map(c => c.couleur);

    // Générateur de SVG identique au Pug
    const size = 1200;
    const height = 1200;
    const tailleRadar = 550;

    const polaireVersCartesien = (r: number, theta: number) => ({
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
    });

    const calculeAngleAIndex = (index: number) => (index * 2 * Math.PI) / 6 + Math.PI / 2 + 2 * Math.PI / 3;

    // Générer les points du polygone
    const pointsDuPolygone: string[] = [];
    for (let index = 0; index < 6; index++) {
      const valeur = values[index];
      const r = ((valeur || 0) / 5) * tailleRadar;
      const theta = calculeAngleAIndex(index);
      const theta2 = calculeAngleAIndex(index + 1);
      const point1 = polaireVersCartesien(r, theta);
      const point2 = polaireVersCartesien(r, theta2);
      pointsDuPolygone.push(`M 0 0 L ${point1.x} ${point1.y} L ${point2.x} ${point2.y} Z`);
    }

    // Construire le SVG complet
    let svgContent = `<svg viewBox="-600 -600 ${size} ${height}" xmlns="http://www.w3.org/2000/svg" width="600" height="600">\n`;
    

    // Lignes radiales
    svgContent += `  <!-- Lignes radiales -->\n`;
    for (let index = 0; index < 6; index++) {
      const theta = calculeAngleAIndex(index);
      const thetaSuivant = calculeAngleAIndex(index + 1);
      const coordonnees = polaireVersCartesien(tailleRadar, theta);
      
      svgContent += `  <line x1="0" y1="0" x2="${coordonnees.x}" y2="${coordonnees.y}" stroke="#ddd" stroke-width="3"/>\n`;
      
      for (let index2 = 0; index2 < 6; index2++) {
        const decalage = (tailleRadar / 5) * index2;
        const coordonneesActuelles = polaireVersCartesien(decalage, theta);
        const coordonneesSuivantes = polaireVersCartesien(decalage, thetaSuivant);
        svgContent += `  <line x1="${coordonneesActuelles.x}" y1="${coordonneesActuelles.y}" x2="${coordonneesSuivantes.x}" y2="${coordonneesSuivantes.y}" stroke="#ddd" stroke-width="3"/>\n`;
      }
    }

    // Polygone des données
    svgContent += `  <!-- Données -->\n`;
    pointsDuPolygone.forEach((chemin, i) => {
      svgContent += `  <path d="${chemin}" fill-opacity="0.7" fill="${colors[i]}"/>\n`;
    });

    // Valeurs sur l'échelle
    svgContent += `  <!-- Étiquettes d'échelle -->\n`;
    for (let index = 1; index <= 5; index++) {
      const r = (tailleRadar / 5) * index;
      const y = -r * Math.sin(Math.PI / 2);
      svgContent += `  <text x="0" y="${y}" text-anchor="middle" font-size="32" font-weight="bold" dominant-baseline="middle" fill="#666">${index}</text>\n`;
    }

    svgContent += `</svg>\n`;

    return svgContent;
  }

  /**
   * Génère le code LaTeX pour inclure le graphique SVG
   * @param svgContent Contenu SVG
   * @param diagnosticId ID du diagnostic
   * @returns Code LaTeX avec légende
   */
  private genereLatexPourGraphique(svgContent: string, diagnosticId: string): string {
    // Sauvegarder le SVG dans un fichier temporaire
    const dossierTemp = this.dossierTemp || path.join(__dirname, 'temp');
    if (!fs.existsSync(dossierTemp)) {
      fs.mkdirSync(dossierTemp, { recursive: true });
    }

    const nomFichierSvg = `graphique-polaire-${diagnosticId}.svg`;
    const cheminSvg = path.join(dossierTemp, nomFichierSvg);
    const nomFichierPdf = `graphique-polaire-${diagnosticId}.pdf`;
    const cheminPdf = path.join(dossierTemp, nomFichierPdf);

    // Sauvegarder le SVG
    fs.writeFileSync(cheminSvg, svgContent, 'utf-8');

    // Convertir SVG → PDF avec rsvg-convert
    try {
      // Utiliser des guillemets appropriés pour les chemins
      const cmdSvgToPdf = `rsvg-convert -f pdf -o "${cheminPdf}" "${cheminSvg}"`;
      execSync(cmdSvgToPdf, { 
        encoding: 'utf-8',
        cwd: dossierTemp,
      });
    } catch (e) {
      console.error('Erreur lors de la conversion SVG→PDF:', e);
      // Si la conversion échoue, retourner un message d'erreur
      return `\\vspace{1cm}\n\\begin{center}\n\\textit{Graphique polaire: erreur de conversion SVG}\n\\end{center}\n`;
    }

    // Vérifier que le PDF a été créé
    if (!fs.existsSync(cheminPdf)) {
      console.warn(`PDF non généré: ${cheminPdf}`);
      return `\\vspace{1cm}\n\\begin{center}\n\\textit{Graphique polaire: fichier PDF non généré}\n\\end{center}\n`;
    }

    // Générer le LaTeX pour inclure le PDF
    // Utiliser le chemin complet pour \includegraphics
    let latex = `\\vspace{1cm}\n`;
    latex += `\\begin{figure}[h]\n`;
    latex += `\\centering\n`;
    latex += `\\includegraphics[width=0.6\\textwidth]{${cheminPdf}}\n`;
    latex += `\\end{figure}\n\n`;

    // Ajouter la légende
    latex += `\\begin{center}\n`;
    latex += `\\begin{tabular}{ll}\n`;
    latex += `\\toprule\n`;
    latex += `\\textbf{Thématique}\\\\\n`;
    latex += `\\midrule\n`;
    
    const themes = [
      { label: 'Gouvernance', couleur: '#6369F1' },
      { label: 'Sécurité Accès', couleur: '#FEC54B' },
      { label: 'Sécurité Poste', couleur: '#8248A1' },
      { label: 'Sécurité Infrastructure', couleur: '#F26C85' },
      { label: 'Sensibilisation', couleur: '#8ED4A3' },
      { label: 'Réaction', couleur: '#FD8FB9' },
    ];

    themes.forEach(theme => {
      const couleurHex = theme.couleur.substring(1);
      latex += `{\\color[HTML]{${couleurHex}} \\rule{6pt}{6pt}} ${theme.label} \\\\\n`;
    });

    latex += `\\bottomrule\n`;
    latex += `\\end{tabular}\n`;
    latex += `\\end{center}\n`;

    return latex;
  }

  /**
   * Génère les commandes LaTeX pour une liste de mesures groupées par catégorie (sauf pour prioritaires)
   * @param mesures Liste des mesures à générer
   * @param estPrioritaire true si ce sont les mesures prioritaires (pas de groupement)
   * @returns Contenu LaTeX des mesures
   */
  private genereMesures(mesures: MesurePriorisee[], estPrioritaire: boolean = false): string {
    if (estPrioritaire) {
      // Mesures prioritaires: pas de groupement par catégorie
      return mesures
        .map((mesure, index) => this.genereMesure(mesure, index + 1))
        .join('\n\n');
    }

    // Mesures complémentaires: grouper avec non-techniques d'abord
    const mesuresNonTechniques = mesures.filter(m => m.categorie === 'non-technique' || !m.categorie);
    const mesurestechniques = mesures.filter(m => m.categorie === 'technique');

    let resultat = '';

    // Section mesures non-techniques d'abord
    if (mesuresNonTechniques.length > 0) {
      resultat += '\\subsubsection*{Mesures non-techniques}\n\n';
      resultat += mesuresNonTechniques
        .map((mesure, index) => this.genereMesure(mesure, index + 1))
        .join('\n\n');
    }

    // Section mesures techniques
    if (mesurestechniques.length > 0) {
      if (resultat) resultat += '\n\n';
      resultat += '\\subsubsection*{Mesures techniques}\n\n';
      resultat += mesurestechniques
        .map((mesure, index) => 
          this.genereMesure(mesure, (mesuresNonTechniques.length || 0) + index + 1)
        )
        .join('\n\n');
    }

    return resultat || mesures
      .map((mesure, index) => this.genereMesure(mesure, index + 1))
      .join('\n\n');
  }

  /**
   * Génère la commande LaTeX pour une seule mesure
   * @param mesure Mesure à générer
   * @param index Numéro de la mesure
   * @returns Contenu LaTeX de la mesure
   */
  private genereMesure(mesure: MesurePriorisee, index: number): string {
    const titre = this.echappeLaTeX(mesure.titre);
    const pourquoi = this.echappeLaTeX(this.chargeContenuFichier(mesure.pourquoi));
    const comment = this.echappeLaTeX(this.chargeContenuFichier(mesure.comment));

    return `%--- ${index + 1}
\\recommandation{${titre}}{%
	${pourquoi}
}{%
	${comment}
}`;
  }

  /**
   * Charge et extrait le contenu d'un fichier Pug
   * @param cheminOuContenu Chemin vers le fichier Pug ou contenu texte direct
   * @returns Contenu extrait du fichier ou texte original
   */
  private chargeContenuFichier(cheminOuContenu: string): string {
    // Si ce n'est pas un chemin vers un fichier, retourner le contenu tel quel
    if (!cheminOuContenu.includes('.pug')) {
      return cheminOuContenu;
    }

    try {
      // Extraire le nom du fichier (en cas de chemin relatif comme ../../mesures/postes/nom.pug)
      let nomFichier = path.basename(cheminOuContenu);
      
      // Essayer d'ajouter l'extension .pug s'il manque
      if (!nomFichier.endsWith('.pug')) {
        nomFichier += '.pug';
      }

      // Chercher le fichier dans le répertoire des mesures
      // Les fichiers de mesures sont dans /restitution/mesures/
      // this.templatePath = .../restitution/latex/templates/rapport-template.tex
      // dirname = .../restitution/latex/templates/
      // Nous avons besoin de remonter à .../restitution/mesures/ (2 niveaux + mesures)
      const dossierMesures = path.join(
        path.dirname(this.templatePath),
        '..',
        '..',
        'mesures'
      );

      // Chercher d'abord dans les sous-dossiers de mesures (postes, gouvernance, etc.)
      const dossiersPossibles = [
        path.join(dossierMesures, 'postes'),
        path.join(dossierMesures, 'gouvernance'),
        path.join(dossierMesures, 'acces'),
        path.join(dossierMesures, 'infras'),
        path.join(dossierMesures, 'sensibilisation'),
        path.join(dossierMesures, 'reaction'),
        dossierMesures, // Chercher aussi à la racine de mesures
        path.dirname(this.templatePath), // Chercher dans le dossier du template en dernier
      ];

      let cheminAbsolu = '';
      for (const dossier of dossiersPossibles) {
        const chemin = path.join(dossier, nomFichier);
        if (fs.existsSync(chemin)) {
          cheminAbsolu = chemin;
          console.log(`✓ Fichier trouvé: ${chemin}`);
          break;
        }
      }

      // Si le fichier n'a pas été trouvé, logger et retourner l'original
      if (!cheminAbsolu) {
        console.error(
          `✗ Fichier Pug non trouvé: ${nomFichier}\n` +
          `  Répertoires cherchés:\n` +
          `  ${dossiersPossibles.map(d => `  - ${d}`).join('\n')}`
        );
        return cheminOuContenu;
      }

      // Charger le contenu du fichier Pug
      const contenuPug = fs.readFileSync(cheminAbsolu, 'utf-8');

      // Extraire le texte du Pug (parse simple)
      return this.extraitTextePug(contenuPug);
    } catch (erreur) {
      console.warn(`Erreur lors du chargement de ${cheminOuContenu}:`, erreur);
      return cheminOuContenu;
    }
  }

  /**
   * Extrait le texte d'un fichier Pug simple
   * Gère les formes basiques: div, p, etc. avec contenu texte
   * Traite aussi les directives include en chargeant les fichiers inclus
   * @param contenuPug Contenu brut du fichier Pug
   * @param cheminRacine Chemin racine pour les includes
   * @returns Texte extrait
   */
  private extraitTextePug(contenuPug: string, cheminRacine?: string): string {
    // Supprimer les lignes vides
    let lignes = contenuPug
      .split('\n')
      .map((ligne) => ligne.trim())
      .filter((ligne) => ligne.length > 0);

    // Traiter les directives include
    lignes = lignes.map((ligne) => {
      // Détecte les includes: include nom-du-fichier
      const matchInclude = ligne.match(/^include\s+(.+?)(?:\s|$)/);
      if (matchInclude) {
        const [, nomFichier] = matchInclude;
        try {
          // Charger le fichier inclus
          const contenuInclude = this.chargeContenuFichier(nomFichier);
          // Traiter récursivement le contenu inclus
          return this.extraitTextePug(contenuInclude, cheminRacine);
        } catch (e) {
          console.warn(`Impossible de charger l'include: ${nomFichier}`, e);
          return ''; // Retourner vide si le fichier n'existe pas
        }
      }
      return ligne;
    });

    // Traiter les lignes Pug avec liens
    lignes = lignes.map((ligne) => {
      if (ligne.length === 0) return ligne; // Ne pas traiter les lignes vides
      
      // Gérer les liens Pug: a(href="...") texte
      // Extraire juste le texte du lien ou l'URL
      const matchLien = ligne.match(/^a\s*\(\s*href\s*=\s*["']([^"']+)["']\s*\)\s*(.*)$/);
      if (matchLien) {
        const [, href, texteAffiche] = matchLien;
        // Si le texte du lien existe et n'est pas vide, l'utiliser, sinon utiliser l'URL
        return texteAffiche.trim() || href;
      }
      return ligne;
    });

    // Extraire le texte (tout après le pipe | ou après une balise)
    let texte = lignes
      .map((ligne) => {
        if (ligne.length === 0) return '';
        if (ligne.startsWith('|')) {
          return ligne.substring(1).trim();
        }

        const matchTagAvecTexte = ligne.match(
          /^(div|p|span|li|ul|ol|h\d|html|head|body|a)(\([^)]*\))?(?:\s+(.*))?$/
        );

        if (matchTagAvecTexte) {
          const [, balise, , texteInline] = matchTagAvecTexte;

          if (
            balise === 'ul' ||
            balise === 'ol' ||
            balise === 'div' ||
            balise === 'html' ||
            balise === 'head' ||
            balise === 'body'
          ) {
            return '';
          }

          return (texteInline ?? '').trim();
        }

        // Retourner la ligne telle quelle (peut être du texte direct)
        return ligne;
      })
      .filter((ligne) => ligne.length > 0)
      .join(' ');

    // Convertir aussi les balises HTML en texte simple (au cas où)
    texte = texte.replace(/<a\s+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi, (_match, href, texteAffiche) => {
      const contenuAffiche = texteAffiche.trim() || href;
      return contenuAffiche;
    });

    // Supprimer les autres balises HTML
    texte = texte.replace(/<[^>]+>/g, '');

    // Nettoyer les espaces multiples
    return texte.replace(/\s+/g, ' ').trim();
  }

  /**
   * Échappe les caractères spéciaux LaTeX
   * @param texte Texte à échapper
   * @returns Texte échappé pour LaTeX
   */
  private echappeLaTeX(texte: string): string {
    return texte
      .replace(/\\/g, '\\textbackslash{}') // Backslash
      .replace(/[&%$#_{}~^]/g, (match) => {
        switch (match) {
          case '&':
            return '\\&';
          case '%':
            return '\\%';
          case '$':
            return '\\$';
          case '#':
            return '\\#';
          case '_':
            return '\\_';
          case '{':
            return '\\{';
          case '}':
            return '\\}';
          case '~':
            return '\\textasciitilde{}';
          case '^':
            return '\\textasciicircum{}';
          default:
            return match;
        }
      });
  }
}

export const creerGenerateurLaTeX = (): GenerateurLaTeX => {
  return new GenerateurLaTeX();
};
