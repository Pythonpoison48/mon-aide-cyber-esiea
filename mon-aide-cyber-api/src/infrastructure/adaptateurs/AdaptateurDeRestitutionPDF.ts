import {
  AdaptateurDeRestitution,
  ContenuHtml,
} from '../../adaptateurs/AdaptateurDeRestitution';
import { Restitution } from '../../restitution/Restitution';
import {
  GenerateurLaTeX,
} from '../restitution/latex/GenerateurLaTeX';
import {
  creerCompilateur,
  Compilateur,
} from '../restitution/latex/Compilateur';

const forgeIdentifiant = (identifiant: string): string =>
  `${identifiant.substring(0, 3)} ${identifiant.substring(
    3,
    6
  )} ${identifiant.substring(6, 8)}`.toUpperCase();

export class AdaptateurDeRestitutionPDF
  implements AdaptateurDeRestitution<Buffer> {
  private generateurLaTeX: GenerateurLaTeX;
  private compilateur: Compilateur;

  constructor() {
    // Créer le compilateur en premier pour obtenir le dossier temporaire
    this.compilateur = creerCompilateur();
    // Passer le dossier temporaire au générateur LaTeX
    this.generateurLaTeX = new GenerateurLaTeX(this.compilateur.getDossierTemporaire());
  }

  async genereRestitution(restitution: Restitution): Promise<Buffer> {
    try {
      const identifiant = forgeIdentifiant(restitution.identifiant);

      // Générer le contenu LaTeX
      const contenuLatex = this.generateurLaTeX.genere({
        diagnosticId: identifiant,
        mesuresPrioritaires: restitution.mesures.mesuresPrioritaires,
        mesuresComplementaires: restitution.mesures.autresMesures,
        indicateurs: restitution.indicateurs,
      });

      // Compiler en PDF
      const pdfBuffer = this.compilateur.compile({
        contenuLatex: contenuLatex,
      });

      return pdfBuffer;
    } catch (erreur) {
      console.error('Erreur génération restitution', erreur);
      throw new Error(
        `Erreur lors de la génération du rapport PDF: ${erreur instanceof Error ? erreur.message : String(erreur)}`
      );
    }
  }

  genereAnnexe(restitution: Restitution): Promise<Buffer> {
    try {
      const identifiant = forgeIdentifiant(restitution.identifiant);

      // Générer uniquement les mesures complémentaires
      const contenuLatex = this.generateurLaTeX.genere({
        diagnosticId: identifiant,
        mesuresPrioritaires: [],
        mesuresComplementaires: restitution.mesures.autresMesures,
      });

      // Compiler en PDF
      const pdfBuffer = this.compilateur.compile({
        contenuLatex: contenuLatex,
      });

      return Promise.resolve(pdfBuffer);
    } catch (erreur) {
      console.error('Erreur génération annexe', erreur);
      throw new Error(
        `Erreur lors de la génération de l'annexe PDF: ${erreur instanceof Error ? erreur.message : String(erreur)}`
      );
    }
  }

  async genereHtml(): Promise<ContenuHtml> {
    // Méthode conservée pour compatibilité - non utilisée avec LaTeX
    throw new Error(
      'genereHtml ne sont pas supporté avec le backend LaTeX. Utilisez genereRestitution à la place.'
    );
  }
}
