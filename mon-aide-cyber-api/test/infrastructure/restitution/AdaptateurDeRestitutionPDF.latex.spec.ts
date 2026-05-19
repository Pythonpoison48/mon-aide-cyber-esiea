import { describe, it, expect, beforeAll } from 'vitest';
import { AdaptateurDeRestitutionPDF } from '../adaptateurs/AdaptateurDeRestitutionPDF';
import { Restitution } from '../restitution/Restitution';
import { MesurePriorisee } from '../diagnostic/Diagnostic';

/**
 * Tests d'intégration pour le générateur PDF LaTeX
 *
 * NOTE: Nécessite que pdflatex soit installé sur le système
 */
describe.skip('AdaptateurDeRestitutionPDF - LaTeX Backend', () => {
  let adaptateur: AdaptateurDeRestitutionPDF;

  beforeAll(() => {
    adaptateur = new AdaptateurDeRestitutionPDF();
  });

  it('génère un PDF pour une restitution simple', async () => {
    const restitution: Restitution = {
      identifiant: '550e8400-e29b-41d4-a716-446655440000' as any,
      indicateurs: {
        gouvernance: { moyennePonderee: 65 },
        acces: { moyennePonderee: 72 },
      },
      informations: {
        dateCreation: new Date(),
        dateDerniereModification: new Date(),
        secteurActivite: 'Informatique',
        secteurGeographique: 'Île-de-France',
      },
      mesures: {
        mesuresPrioritaires: [
          {
            titre: 'Déployer systématiquement toutes les mises à jour',
            pourquoi:
              'Les vulnérabilités publiques sont exploitées rapidement par les attaquants',
            comment:
              'Activez les fonctions de mises à jour automatique proposées par les éditeurs',
            valeurObtenue: 65,
            priorisation: 1,
          },
          {
            titre: 'Réaliser des sauvegardes régulièrement',
            pourquoi:
              'En cas de rançongiciel, les sauvegardes permettent une restauration rapide',
            comment:
              'Définissez le rythme de sauvegarde et appliquez la règle 3-2-1',
            valeurObtenue: 50,
            priorisation: 2,
          },
        ],
        autresMesures: [
          {
            titre: 'Mettre en œuvre des bonnes pratiques de sensibilisation',
            pourquoi:
              'Les utilisateurs sont le maillon faible de la sécurité informatique',
            comment:
              'Lancez des campagnes de sensibilisation régulières et renouvelées',
            valeurObtenue: 45,
            priorisation: 5,
          },
        ],
      },
    };

    const pdf = await adaptateur.genereRestitution(restitution);

    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
    // PDF files typically start with '%PDF-'
    expect(pdf.toString('utf-8', 0, 5)).toBe('%PDF-');
  });

  it('échappe correctement les caractères spéciaux LaTeX', async () => {
    const restitution: Restitution = {
      identifiant: '550e8400-e29b-41d4-a716-446655440000' as any,
      indicateurs: {},
      informations: {
        dateCreation: new Date(),
        dateDerniereModification: new Date(),
        secteurActivite: 'Test & Développement',
        secteurGeographique: 'Test_Zone 100%',
      },
      mesures: {
        mesuresPrioritaires: [
          {
            titre: 'Titre avec caractères spéciaux: & % $ # _ { }',
            pourquoi: 'Test~^caractères',
            comment: 'Vérifiez l\'échappement correct',
            valeurObtenue: 50,
            priorisation: 1,
          },
        ],
        autresMesures: [],
      },
    };

    const pdf = await adaptateur.genereRestitution(restitution);

    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
  });

  it('génère une annexe avec uniquement les mesures complémentaires', async () => {
    const restitution: Restitution = {
      identifiant: '550e8400-e29b-41d4-a716-446655440000' as any,
      indicateurs: {},
      informations: {
        dateCreation: new Date(),
        dateDerniereModification: new Date(),
        secteurActivite: 'Test',
        secteurGeographique: 'Test',
      },
      mesures: {
        mesuresPrioritaires: [
          {
            titre: 'Mesure prioritaire',
            pourquoi: 'Cette mesure ne doit pas apparaître dans l\'annexe',
            comment: 'Vérifiez que seules les mesures complémentaires sont incluses',
            valeurObtenue: 50,
            priorisation: 1,
          },
        ],
        autresMesures: [
          {
            titre: 'Mesure complémentaire',
            pourquoi: 'Cette mesure doit apparaître',
            comment: 'Confirmez que l\'annexe fonctionne correctement',
            valeurObtenue: 45,
            priorisation: 5,
          },
        ],
      },
    };

    const pdf = await adaptateur.genereAnnexe(restitution);

    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
  });

  it('gère une restitution avec beaucoup de mesures', async () => {
    const mesures: MesurePriorisee[] = Array.from({ length: 20 }, (_, i) => ({
      titre: `Mesure ${i + 1}: Recommandation de sécurité`,
      pourquoi: `Explication du contexte pour la mesure ${i + 1}`,
      comment: `Étapes pour implémenter la mesure ${i + 1}`,
      valeurObtenue: 50 + Math.random() * 30,
      priorisation: i + 1,
    }));

    const restitution: Restitution = {
      identifiant: '550e8400-e29b-41d4-a716-446655440000' as any,
      indicateurs: {},
      informations: {
        dateCreation: new Date(),
        dateDerniereModification: new Date(),
        secteurActivite: 'Test',
        secteurGeographique: 'Test',
      },
      mesures: {
        mesuresPrioritaires: mesures.slice(0, 10),
        autresMesures: mesures.slice(10),
      },
    };

    const pdf = await adaptateur.genereRestitution(restitution);

    expect(pdf).toBeInstanceOf(Buffer);
    expect(pdf.length).toBeGreaterThan(0);
  });
});

/**
 * Tests unitaires pour le GenerateurLaTeX (sans dépendre de pdflatex)
 */
describe('GenerateurLaTeX', () => {
  it('génère du contenu LaTeX valide', async () => {
    const { creerGenerateurLaTeX } = await import(
      '../restitution/latex/GenerateurLaTeX'
    );
    const generateur = creerGenerateurLaTeX();

    const donnees = {
      diagnosticId: '550 e29 b4',
      mesuresPrioritaires: [
        {
          titre: 'Test',
          pourquoi: 'Raison',
          comment: 'Comment faire',
          valeurObtenue: 50,
          priorisation: 1,
        },
      ],
      mesuresComplementaires: [],
    };

    const contenuLatex = generateur.genere(donnees);

    expect(contenuLatex).toContain('\\documentclass');
    expect(contenuLatex).toContain('\\begin{document}');
    expect(contenuLatex).toContain('\\end{document}');
    expect(contenuLatex).toContain('550 e29 b4');
  });

  it('échappe les caractères spéciaux LaTeX', async () => {
    const { creerGenerateurLaTeX } = await import(
      '../restitution/latex/GenerateurLaTeX'
    );
    const generateur = creerGenerateurLaTeX();

    const donnees = {
      diagnosticId: 'TEST',
      mesuresPrioritaires: [
        {
          titre: 'Titre avec & et % et $',
          pourquoi: 'Pourquoi avec # et _ et { et }',
          comment: 'Comment avec ~ et ^',
          valeurObtenue: 50,
          priorisation: 1,
        },
      ],
      mesuresComplementaires: [],
    };

    const contenuLatex = generateur.genere(donnees);

    // Vérifier que les caractères spéciaux sont échappés
    expect(contenuLatex).toContain('\\&');
    expect(contenuLatex).toContain('\\%');
    expect(contenuLatex).toContain('\\$');
    expect(contenuLatex).toContain('\\#');
    expect(contenuLatex).toContain('\\_');
    expect(contenuLatex).toContain('\\{');
    expect(contenuLatex).toContain('\\}');
  });
});
