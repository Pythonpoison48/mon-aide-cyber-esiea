import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as os from 'os';

export interface CompilationLaTeXOptions {
  contenuLatex: string;
  cheminSortie?: string;
}

export class Compilateur {
  private dossierTemporaire: string;

  constructor() {
    this.dossierTemporaire = fs.mkdtempSync(
      path.join(os.tmpdir(), 'latex-')
    );
  }

  /**
   * Compile un document LaTeX en PDF
   * @param options Options de compilation
   * @returns Buffer contenant le PDF généré
   */
  compile(options: CompilationLaTeXOptions): Buffer {
    try {
      const cheminFichierTex = path.join(
        this.dossierTemporaire,
        'document.tex'
      );
      const cheminFichierPdf = path.join(
        this.dossierTemporaire,
        'document.pdf'
      );

      // Écrire le fichier LaTeX
      fs.writeFileSync(cheminFichierTex, options.contenuLatex, 'utf-8');

      // Compiler avec pdflatex (exécuté deux fois pour la table des matières)
      this.executePdfLaTeX(cheminFichierTex);
      this.executePdfLaTeX(cheminFichierTex); // Seconde passe pour TOC

      // Vérifier que le PDF a été généré
      if (!fs.existsSync(cheminFichierPdf)) {
        throw new Error(
          `Échec de la compilation LaTeX. Le fichier PDF n'a pas été généré.`
        );
      }

      // Lire le PDF généré
      const pdfBuffer = fs.readFileSync(cheminFichierPdf);

      return pdfBuffer;
    } catch (erreur) {
      console.error('Erreur lors de la compilation LaTeX:', erreur);
      throw new Error(
        `Erreur de compilation LaTeX: ${erreur instanceof Error ? erreur.message : String(erreur)}`
      );
    } finally {
      this.nettoyerDossierTemporaire();
    }
  }

  /**
   * Exécute pdflatex pour compiler le document
   * @param cheminFichierTex Chemin complet vers le fichier .tex
   */
  private executePdfLaTeX(cheminFichierTex: string): void {
    const dossier = path.dirname(cheminFichierTex);
    const nomFichier = path.basename(cheminFichierTex, '.tex');

    try {
      execSync(
        `pdflatex -interaction=nonstopmode -output-directory="${dossier}" "${cheminFichierTex}"`,
        {
          cwd: dossier,
          stdio: 'pipe',
          encoding: 'utf-8',
        }
      );
    } catch (erreur) {
      // pdflatex peut retourner un code d'erreur même si le PDF a été généré
      // Donc on ne lance une exception que si le PDF n'existe pas
      const cheminPdf = path.join(dossier, `${nomFichier}.pdf`);
      if (!fs.existsSync(cheminPdf)) {
        throw new Error(
          `Erreur pdflatex: ${erreur instanceof Error ? erreur.message : String(erreur)}`
        );
      }
    }
  }

  /**
   * Nettoie le dossier temporaire
   */
  private nettoyerDossierTemporaire(): void {
    try {
      if (fs.existsSync(this.dossierTemporaire)) {
        fs.rmSync(this.dossierTemporaire, { recursive: true, force: true });
      }
    } catch (erreur) {
      console.warn(
        'Impossible de nettoyer le dossier temporaire:',
        erreur
      );
    }
  }
}

export const creerCompilateur = (): Compilateur => {
  return new Compilateur();
};
