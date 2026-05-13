import * as fs from 'fs';
import * as path from 'path';
import { MesurePriorisee } from '../../../diagnostic/Diagnostic';

export interface DonneesRapport {
  diagnosticId: string;
  mesuresPrioritaires: MesurePriorisee[];
  mesuresComplementaires: MesurePriorisee[];
}

/**
 * Génère le contenu LaTeX à partir des données de restitution
 */
export class GenerateurLaTeX {
  private templatePath: string;

  constructor() {
    this.templatePath = path.join(
      __dirname,
      'templates',
      'rapport-template.tex'
    );
  }

  /**
   * Génère le contenu LaTeX complet
   * @param donnees Données du rapport
   * @returns Contenu LaTeX prêt à être compilé
   */
  genere(donnees: DonneesRapport): string {
    // Charger le template
    const template = fs.readFileSync(this.templatePath, 'utf-8');

    // Générer les mesures
    const mesuresPrioritaires = this.genereMesures(
      donnees.mesuresPrioritaires
    );
    const mesuresComplementaires = this.genereMesures(
      donnees.mesuresComplementaires
    );

    // Remplacer les placeholders
    let contenuLatex = template
      .replace('<<DIAGNOSTIC_ID>>', donnees.diagnosticId)
      .replace('<<MESURES_PRIORITAIRES>>', mesuresPrioritaires)
      .replace('<<MESURES_COMPLEMENTAIRES>>', mesuresComplementaires);

    return contenuLatex;
  }

  /**
   * Génère les commandes LaTeX pour une liste de mesures
   * @param mesures Liste des mesures à générer
   * @returns Contenu LaTeX des mesures
   */
  private genereMesures(mesures: MesurePriorisee[]): string {
    return mesures
      .map((mesure, index) => this.genereMesure(mesure, index))
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
      // Résoudre le chemin absolu du fichier
      // Les chemins Pug sont relatifs comme "../../mesures/postes/..."
      // Depuis /src/infrastructure/restitution/latex, path.resolve() normalise automatiquement
      const cheminAbsolu = path.resolve(
        path.dirname(this.templatePath),
        cheminOuContenu
      );

      // Vérifier si le fichier existe
      if (!fs.existsSync(cheminAbsolu)) {
        console.warn(`Fichier Pug non trouvé: ${cheminAbsolu}`);
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
   * @param contenuPug Contenu brut du fichier Pug
   * @returns Texte extrait
   */
  private extraitTextePug(contenuPug: string): string {
    // Supprimer les lignes vides
    let lignes = contenuPug
      .split('\n')
      .map((ligne) => ligne.trim())
      .filter((ligne) => ligne.length > 0);

    // Traiter les lignes Pug avec liens
    lignes = lignes.map((ligne) => {
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
        // Ignorer les lignes qui sont juste une balise ou un commentaire
        if (ligne.match(/^(div|p|span|li|ul|ol|h\d|html|head|body)(\s|$|\.|\#|\()/)) {
          return '';
        }
        // Supprimer le pipe et l'indentation
        if (ligne.startsWith('|')) {
          return ligne.substring(1).trim();
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
