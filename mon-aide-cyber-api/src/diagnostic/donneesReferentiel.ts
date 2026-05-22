import { Referentiel } from './Referentiel';
import { donneesContexteEnglish } from './referentiel-english/donneesContexteEnglish';
import { donneesGouvernanceEnglish } from './referentiel-english/donneesGouvernanceEnglish';
import { donneesSecuriteAccesEnglish } from './referentiel-english/donneesSecuriteAccesEnglish';
import { donneesSecuritePosteEnglish } from './referentiel-english/donneesSecuritePosteEnglish';
import { donneesSecuriteInfrastructureEnglish } from './referentiel-english/donneesSecuriteInfrastructureEnglish';
import { donneesSensibilisationEnglish } from './referentiel-english/donneesSensibilisationEnglish';
import { donneesReactionEnglish } from './referentiel-english/donneesReactionEnglish';

const referentiel: Referentiel = {
  contexte: donneesContexteEnglish,
  gouvernance: donneesGouvernanceEnglish,
  SecuriteAcces: donneesSecuriteAccesEnglish,
  securiteposte: donneesSecuritePosteEnglish,
  securiteinfrastructure: donneesSecuriteInfrastructureEnglish,
  sensibilisation: donneesSensibilisationEnglish,
  reaction: donneesReactionEnglish,
};

export { referentiel };
