import { QuestionsThematique } from '../Referentiel';

export const donneesTest: QuestionsThematique = {
    questions: [
        {
        identifiant: 'test-nature-entite',
        libelle: 'Quelle est la nature de votre entité ?',
        poids: 0,
        reponsesPossibles: [
            {
            identifiant: 'test-nature-entite-entite-publique',
            libelle:
                'Entité publique (ex : collectivité, administration, syndicats mixte, GIP etc.)',
            ordre: 0,
            },
            {
            identifiant: 'test-nature-entite-entreprise-privee',
            libelle: 'Entreprise privée (ex : TPE, PME, ETI)',
            ordre: 1,
            },
            {
            identifiant: 'test-nature-entite-association',
            libelle: 'Association (ex : association loi 1901)',
            ordre: 2,
            },
            {
            identifiant: 'test-nature-entite-autre',
            libelle: 'Autre',
            ordre: 3,
            },
        ],
        type: 'choixUnique',
        },
    ],
};