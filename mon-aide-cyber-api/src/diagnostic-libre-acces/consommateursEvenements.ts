import { AdaptateurRelations } from '../relation/AdaptateurRelations';
import { ConsommateurEvenement, Evenement } from '../domaine/BusEvenement';
import { DiagnosticLibreAccesLance } from './CapteurSagaLanceDiagnosticLibreAcces';
import crypto from 'crypto';
import { DefinitionTuple, Tuple, unTuple } from '../relation/Tuple';
import {
  DefinitionEntiteInitieDiagnosticLibreAcces,
  unTupleEntiteInitieDiagnosticLibreAcces,
} from './tuples';

export const demandeInitieDiagnosticLibreAcces = (
  adaptateurRelations: AdaptateurRelations
) =>
  new (class implements ConsommateurEvenement {
    async consomme<E extends Evenement<unknown> = DiagnosticLibreAccesLance>(
      evenement: E
    ): Promise<void> {
      const diagnosticLance = evenement as DiagnosticLibreAccesLance;
      const tuple = unTupleEntiteInitieDiagnosticLibreAcces(
        diagnosticLance.corps.idDemande,
        diagnosticLance.corps.idDiagnostic
      );

      return adaptateurRelations.creeTuple(tuple);
    }
  })();

export { unTupleEntiteInitieDiagnosticLibreAcces };
