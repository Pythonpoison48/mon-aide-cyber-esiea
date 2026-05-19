import { MesurePriorisee } from '../../../diagnostic/Diagnostic';
import { GenerateurLaTeX } from './GenerateurLaTeX';
import { Compilateur } from './Compilateur';

export interface DonneesRapportModifiees {
  diagnosticId: string;
  mesuresPrioritaires: MesurePriorisee[];
  mesuresComplementaires: MesurePriorisee[];
  contenuLatexCustom?: string; // Contenu LaTeX personnalisé si l'utilisateur veut éditer directement
}

/**
 * Gère la recompilation d'un rapport après modification
 */
export class EditeurLatex {
  private generateurLaTeX: GenerateurLaTeX;
  private compilateur: Compilateur;

  constructor() {
    this.generateurLaTeX = creerGenerateurLaTeX();
    this.compilateur = creerCompilateur();
  }

  /**
   * Recompile le rapport avec les mesures réorganisées
   * @param donnees Données modifiées du rapport
   * @returns PDF recompilé en Buffer
   */
  async recompile(donnees: DonneesRapportModifiees): Promise<Buffer> {
    try {
      // Si du contenu LaTeX personnalisé est fourni, l'utiliser directement
      let contenuLatex: string;

      if (donnees.contenuLatexCustom) {
        // Mode édition libre: utiliser le contenu fourni directement
        contenuLatex = donnees.contenuLatexCustom;
      } else {
        // Mode réorganisation simple: régénérer avec nouvel ordre
        contenuLatex = this.generateurLaTeX.genere({
          diagnosticId: donnees.diagnosticId,
          mesuresPrioritaires: donnees.mesuresPrioritaires,
          mesuresComplementaires: donnees.mesuresComplementaires,
        });
      }

      // Compiler en PDF
      const pdfBuffer = this.compilateur.compile({
        contenuLatex: contenuLatex,
      });

      return pdfBuffer;
    } catch (erreur) {
      console.error('Erreur recompilation rapport LaTeX', erreur);
      throw new Error(
        `Erreur lors de la recompilation du rapport PDF: ${erreur instanceof Error ? erreur.message : String(erreur)}`
      );
    }
  }

  /**
   * Exporte le contenu LaTeX pour édition manuelle
   * @param donnees Données du rapport
   * @returns Contenu LaTeX en string
   */
  extraireLatex(donnees: DonneesRapportModifiees): string {
    if (donnees.contenuLatexCustom) {
      return donnees.contenuLatexCustom;
    }

    return this.generateurLaTeX.genere({
      diagnosticId: donnees.diagnosticId,
      mesuresPrioritaires: donnees.mesuresPrioritaires,
      mesuresComplementaires: donnees.mesuresComplementaires,
    });
  }
}

export const creerEditeurLatex = (): EditeurLatex => {
  return new EditeurLatex();
};
