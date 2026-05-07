import { Referentiel } from './Referentiel';
import { donneesContexte } from './referentiel/donneesContexte';
import { donneesGouvernance } from './referentiel/donneesGouvernance';
import { donneesSecuriteAcces } from './referentiel/donneesSecuriteAcces';
import { donneesSecuritePoste } from './referentiel/donneesSecuritePoste';
import { donneesSecuriteInfrastructure } from './referentiel/donneesSecuriteInfrastructure';
import { donneesSensibilisation } from './referentiel/donneesSensibilisation';
import { donneesReaction } from './referentiel/donneesReaction';
import { donneesTest } from './referentiel/donneesTest';
import { ConfigurationCategories } from './configuration-categorie';

const referentiel: Referentiel = {};

ConfigurationCategories.filter(c => c.actif)
  .forEach(c => {
    referentiel[c.id] = require(c.fichierQuestions).default;
  });

export { referentiel };
