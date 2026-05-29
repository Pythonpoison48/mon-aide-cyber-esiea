import crypto from 'crypto';
import { DefinitionTuple, Tuple, unTuple } from '../relation/Tuple';

export type DefinitionEntiteInitieDiagnosticLibreAcces = DefinitionTuple & {
  relation: 'initiateur';
  typeObjet: 'auto-diagnostic';
  typeUtilisateur: 'entité';
};

export const definitionEntiteInitieDiagnosticLibreAcces: {
  definition: DefinitionEntiteInitieDiagnosticLibreAcces;
} = {
  definition: {
    relation: 'initiateur',
    typeObjet: 'auto-diagnostic',
    typeUtilisateur: 'entité',
  },
};

export const unTupleEntiteInitieDiagnosticLibreAcces = (
  identifiantDemande: crypto.UUID,
  identifiantDiagnostic: crypto.UUID
): Tuple =>
  unTuple<DefinitionEntiteInitieDiagnosticLibreAcces>(
    definitionEntiteInitieDiagnosticLibreAcces
  )
    .avecUtilisateur(identifiantDemande)
    .avecObjet(identifiantDiagnostic)
    .construis();