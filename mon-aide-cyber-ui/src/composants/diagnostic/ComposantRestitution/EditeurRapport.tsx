import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../atomes/Button/Button';
import './EditeurRapport.scss';

interface EditeurRapportProps {
  idDiagnostic: string;
  mesuresPrioritaires: any[];
  mesuresComplementaires: any[];
  mesuresDisponibles: any[];
  onClose: () => void;
  onRecompile: (mesures: {
    mesuresPrioritaires: any[];
    mesuresComplementaires: any[];
  }) => Promise<Blob>;
}

type MesureDisponiblePourAjout = {
  clef: string;
  identifiant: string;
  niveau: 'niveau1' | 'niveau2';
  titre: string;
  pourquoi: string;
  comment: string;
  priorisation: number;
  categorie?: 'technique' | 'non-technique';
};

/**
 * Éditeur du rapport LaTeX avec réorganisation des mesures
 * Permet de:
 * - Réorganiser les mesures (drag & drop)
 * - Recompiler le PDF
 * - Afficher un aperçu
 */
export const EditeurRapport: React.FC<EditeurRapportProps> = ({
  idDiagnostic,
  mesuresPrioritaires: mesuresInitialesPrioritaires,
  mesuresComplementaires: mesuresInitialesComplementaires,
  mesuresDisponibles: mesuresInitialesDisponibles,
  onClose,
  onRecompile,
}) => {
  const [mesuresPrioritaires, setMesuresPrioritaires] = useState(
    mesuresInitialesPrioritaires
  );
  const [mesuresComplementaires, setMesuresComplementaires] = useState(
    mesuresInitialesComplementaires
  );
  const [mesuresDisponibles, setMesuresDisponibles] = useState<MesureDisponiblePourAjout[]>(
    mesuresInitialesDisponibles
  );
  const [selectionMesurePrioritaire, setSelectionMesurePrioritaire] = useState('');
  const [selectionMesureComplementaire, setSelectionMesureComplementaire] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<{
    section: 'prioritaires' | 'complementaires';
    index: number;
    categorie?: 'technique' | 'non-technique';
  } | null>(null);
  const [enChargement, setEnChargement] = useState(false);
  const [affichageActif, setAffichageActif] = useState<
    'prioritaires' | 'complementaires' | 'apercu'
  >('prioritaires');

  useEffect(() => {
    setMesuresDisponibles(mesuresInitialesDisponibles);
  }, [mesuresInitialesDisponibles]);

  const cleMesure = (mesure: any) =>
    [
      mesure.titre,
      mesure.pourquoi,
      mesure.comment,
      mesure.priorisation,
      mesure.categorie || '',
    ].join('||');

  const mesuresDejaPresentes = new Set(
    [...mesuresPrioritaires, ...mesuresComplementaires].map(cleMesure)
  );

  const mesuresAjoutables = mesuresDisponibles.filter(
    (mesure: MesureDisponiblePourAjout) => !mesuresDejaPresentes.has(cleMesure(mesure))
  );

  useEffect(() => {
    if (!mesuresAjoutables.some((mesure: MesureDisponiblePourAjout) => mesure.clef === selectionMesurePrioritaire)) {
      setSelectionMesurePrioritaire(mesuresAjoutables[0]?.clef || '');
    }
    if (!mesuresAjoutables.some((mesure: MesureDisponiblePourAjout) => mesure.clef === selectionMesureComplementaire)) {
      setSelectionMesureComplementaire(mesuresAjoutables[0]?.clef || '');
    }
  }, [mesuresAjoutables, selectionMesurePrioritaire, selectionMesureComplementaire]);

  const ajouteMesure = (section: 'prioritaires' | 'complementaires') => {
    const clefSelectionnee =
      section === 'prioritaires'
        ? selectionMesurePrioritaire
        : selectionMesureComplementaire;
    const mesure = mesuresAjoutables.find((item: MesureDisponiblePourAjout) => item.clef === clefSelectionnee);

    if (!mesure) {
      return;
    }

    const mesureAAjouter = {
      ...mesure,
      valeurObtenue: null,
    };

    if (section === 'prioritaires') {
      setMesuresPrioritaires((courant: any[]) => [...courant, mesureAAjouter]);
    } else {
      setMesuresComplementaires((courant: any[]) => [...courant, mesureAAjouter]);
    }
  };

  const handleDragStart = (
    section: 'prioritaires' | 'complementaires',
    index: number,
    categorie?: 'technique' | 'non-technique'
  ) => {
    setDraggedIndex({ section, index, categorie });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    section: 'prioritaires' | 'complementaires',
    index: number,
    categorie?: 'technique' | 'non-technique'
  ) => {
    if (!draggedIndex) return;

    const sourceMesures =
      draggedIndex.section === 'prioritaires'
        ? mesuresPrioritaires
        : mesuresComplementaires;
    if (draggedIndex.section === section) {
      if (section === 'complementaires' && draggedIndex.categorie && categorie && draggedIndex.categorie !== categorie) {
        setDraggedIndex(null);
        return;
      }

      // Réorganisation dans la même section
      if (section === 'prioritaires') {
        const nouvelles = [...sourceMesures];
        const [element] = nouvelles.splice(draggedIndex.index, 1);
        nouvelles.splice(index, 0, element);
        setMesuresPrioritaires(nouvelles);
      } else {
        const mesuresNonTechniques = [...mesuresComplementaires.filter((mesure: any) => mesure.categorie !== 'technique')];
        const mesuresTechniques = [...mesuresComplementaires.filter((mesure: any) => mesure.categorie === 'technique')];
        const groupe = draggedIndex.categorie === 'technique' ? mesuresTechniques : mesuresNonTechniques;
        const [element] = groupe.splice(draggedIndex.index, 1);
        groupe.splice(index, 0, element);
        setMesuresComplementaires([...mesuresNonTechniques, ...mesuresTechniques]);
      }
    } else {
      // Déplacement entre sections (avancé)
      // Pour MVP, on ignore le déplacement cross-section
    }

    setDraggedIndex(null);
  };

  const deplacerMesure = (
    section: 'prioritaires' | 'complementaires',
    index: number,
    direction: 'up' | 'down',
    categorie?: 'technique' | 'non-technique'
  ) => {
    if (section === 'prioritaires') {
      const mesures = [...mesuresPrioritaires];
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === mesures.length - 1)
      ) {
        return;
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [mesures[index], mesures[newIndex]] = [mesures[newIndex], mesures[index]];
      setMesuresPrioritaires(mesures);
    } else {
      const mesuresNonTechniques = [...mesuresComplementaires.filter((mesure: any) => mesure.categorie !== 'technique')];
      const mesuresTechniques = [...mesuresComplementaires.filter((mesure: any) => mesure.categorie === 'technique')];
      const groupe = categorie === 'technique' ? mesuresTechniques : mesuresNonTechniques;

      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === groupe.length - 1)
      ) {
        return;
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [groupe[index], groupe[newIndex]] = [groupe[newIndex], groupe[index]];

      setMesuresComplementaires([...mesuresNonTechniques, ...mesuresTechniques]);
    }
  };

  const handleRecompile = useCallback(async () => {
    setEnChargement(true);
    try {
      const blob = await onRecompile({
        mesuresPrioritaires,
        mesuresComplementaires,
      });

      // Télécharger le PDF modifié
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `restitution-modifiee-${idDiagnostic}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      onClose();
    } catch (erreur) {
      console.error('Erreur recompilation:', erreur);
      alert('Erreur lors de la recompilation du rapport');
    } finally {
      setEnChargement(false);
    }
  }, [mesuresPrioritaires, mesuresComplementaires, onRecompile, idDiagnostic, onClose]);

  const supprimerMesure = (
    section: 'prioritaires' | 'complementaires',
    index: number,
    categorie?: 'technique' | 'non-technique'
  ) => {
    if (section === 'prioritaires') {
      setMesuresPrioritaires(mesuresPrioritaires.filter((_: any, i: number) => i !== index));
    } else {
      const mesuresNonTechniques = mesuresComplementaires.filter(
        (mesure: any) => mesure.categorie !== 'technique'
      );
      const mesuresTechniques = mesuresComplementaires.filter(
        (mesure: any) => mesure.categorie === 'technique'
       );
      const groupe = categorie === 'technique' ? mesuresTechniques : mesuresNonTechniques;
      groupe.splice(index, 1);
      setMesuresComplementaires([...mesuresNonTechniques, ...mesuresTechniques]);
    }
  };

  const telechargerCodeLatex = useCallback(async () => {
    setEnChargement(true);
    try {
      const response = await fetch(
        `/api/diagnostic/${idDiagnostic}/restitution/latex`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            mesuresPrioritaires,
            mesuresComplementaires,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const resultat = await response.json() as {
        codeLatex: string;
        graphiquePolairePdfBase64?: string | null;
        nomFichierGraphiquePolaire?: string;
      };

      const telechargeBlob = (blob: Blob, nomFichier: string) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nomFichier;
        link.click();
        URL.revokeObjectURL(url);
      };

      telechargeBlob(
        new Blob([resultat.codeLatex], { type: 'text/plain' }),
        `rapport-${idDiagnostic}.tex`
      );

      if (resultat.graphiquePolairePdfBase64) {
        const binaire = atob(resultat.graphiquePolairePdfBase64);
        const octets = Uint8Array.from(binaire, (caractere) => caractere.charCodeAt(0));
        telechargeBlob(
          new Blob([octets], { type: 'application/pdf' }),
          resultat.nomFichierGraphiquePolaire || `graphique-polaire-${idDiagnostic}.pdf`
        );
      }
    } catch (erreur) {
      console.error('Erreur téléchargement LaTeX:', erreur);
      alert('Erreur lors du téléchargement du code LaTeX');
    } finally {
      setEnChargement(false);
    }
  }, [mesuresPrioritaires, mesuresComplementaires, idDiagnostic]);

  const groupeMesuresParCategorie = (mesures: any[]) => {
    return {
      techniques: mesures.filter(m => m.categorie === 'technique'),
      nonTechniques: mesures.filter(m => m.categorie === 'non-technique' || !m.categorie),
    };
  };

  const renderMesureItem = (
    mesure: any,
    index: number,
    section: 'prioritaires' | 'complementaires'
  ) => (
    <div
      key={index}
      draggable
      onDragStart={() => handleDragStart(section, index, mesure.categorie)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(section, index, mesure.categorie)}
      className={`mesure-item ${draggedIndex?.index === index && draggedIndex?.section === section ? 'dragging' : ''}`}
    >
      <div className="mesure-header">
        <span className="mesure-numero">{index + 1}.</span>
        <span className="mesure-titre">{mesure.titre}</span>
      </div>
      <div className="mesure-controls">
        <button
          className="btn-small"
          onClick={() => deplacerMesure(section, index, 'up', mesure.categorie)}
          disabled={index === 0}
          title="Déplacer vers le haut"
        >
          ↑
        </button>
        <button
          className="btn-small"
          onClick={() => deplacerMesure(section, index, 'down', mesure.categorie)}
          disabled={
            index ===
            (section === 'prioritaires'
              ? mesuresPrioritaires.length - 1
              : (mesure.categorie === 'technique'
                ? mesuresComplementaires.filter((item: any) => item.categorie === 'technique').length - 1
                : mesuresComplementaires.filter((item: any) => item.categorie !== 'technique').length - 1))
          }
          title="Déplacer vers le bas"
        >
          ↓
        </button>
        <button
          className="btn-small btn-danger"
          onClick={() => supprimerMesure(section, index, mesure.categorie)}
          title="Supprimer cette mesure"
        >
          ✕
        </button>
      </div>
    </div>
  );

  const renderAjoutMesure = (section: 'prioritaires' | 'complementaires') => {
    const valeurSelectionnee =
      section === 'prioritaires'
        ? selectionMesurePrioritaire
        : selectionMesureComplementaire;

    return (
      <div className="ajout-mesure">
        <select
          className="ajout-mesure-select"
          value={valeurSelectionnee}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            if (section === 'prioritaires') {
              setSelectionMesurePrioritaire(event.target.value);
            } else {
              setSelectionMesureComplementaire(event.target.value);
            }
          }}
          disabled={mesuresAjoutables.length === 0}
        >
          {mesuresAjoutables.length === 0 ? (
            <option value="">Aucune mesure disponible</option>
          ) : (
            mesuresAjoutables.map((mesure: MesureDisponiblePourAjout) => (
              <option key={mesure.clef} value={mesure.clef}>
                {mesure.titre} - {mesure.niveau}
              </option>
            ))
          )}
        </select>
        <button
          className="btn-add-mesure"
          onClick={() => ajouteMesure(section)}
          disabled={mesuresAjoutables.length === 0}
          type="button"
        >
          Ajouter une mesure
        </button>
      </div>
    );
  };

  return createPortal(
    <div className="editeur-rapport-modal">
      <div className="editeur-rapport-backdrop" onClick={onClose} />
      <div className="editeur-rapport-contenu">
        <div className="editeur-rapport-header">
          <h2>Modifier le rapport</h2>
          <button
            className="btn-close"
            onClick={onClose}
            aria-label="Fermer l'éditeur"
          >
            ✕
          </button>
        </div>

        <div className="editeur-rapport-tabs">
          <button
            className={`tab ${affichageActif === 'prioritaires' ? 'active' : ''}`}
            onClick={() => setAffichageActif('prioritaires')}
          >
            Mesures prioritaires ({mesuresPrioritaires.length})
          </button>
          <button
            className={`tab ${affichageActif === 'complementaires' ? 'active' : ''}`}
            onClick={() => setAffichageActif('complementaires')}
          >
            Mesures complémentaires ({mesuresComplementaires.length})
          </button>
          <button
            className={`tab ${affichageActif === 'apercu' ? 'active' : ''}`}
            onClick={() => setAffichageActif('apercu')}
          >
            Aperçu
          </button>
        </div>

        <div className="editeur-rapport-body">
          {affichageActif === 'prioritaires' && (
            <div className="mesures-section">
              {mesuresPrioritaires.length === 0 ? (
                <p className="info" style={{ color: '#d32f2f' }}>
                  Aucune mesure prioritaire à afficher.
                </p>
              ) : (
                <>
                  <p className="info">
                    Faites glisser les mesures pour les réorganiser, ou utilisez les
                    boutons ↑/↓
                  </p>
                </>
              )}
              {renderAjoutMesure('prioritaires')}
              <div className="mesures-list">
                {mesuresPrioritaires.map((mesure, index) =>
                  renderMesureItem(mesure, index, 'prioritaires')
                )}
              </div>
            </div>
          )}

          {affichageActif === 'complementaires' && (
            <div className="mesures-section">
              {mesuresComplementaires.length === 0 ? (
                <p className="info" style={{ color: '#d32f2f' }}>
                  Aucune mesure complémentaire à afficher.
                </p>
              ) : (
                <>
                  <p className="info">
                    Faites glisser les mesures pour les réorganiser, ou utilisez les
                    boutons ↑/↓
                  </p>
                </>
              )}
              {renderAjoutMesure('complementaires')}
              {(() => {
                const groupes = groupeMesuresParCategorie(mesuresComplementaires);
                return (
                  <>
                    {groupes.nonTechniques.length > 0 && (
                      <div className="mesures-categorie">
                        <h4>📋 Mesures non-techniques</h4>
                        <div className="mesures-list">
                          {groupes.nonTechniques.map((mesure, indexCategorie) =>
                            renderMesureItem(
                              mesure,
                              indexCategorie,
                              'complementaires'
                            )
                          )}
                        </div>
                      </div>
                    )}
                    {groupes.techniques.length > 0 && (
                      <div className="mesures-categorie">
                        <h4>🔧 Mesures techniques</h4>
                        <div className="mesures-list">
                          {groupes.techniques.map((mesure, indexCategorie) =>
                            renderMesureItem(
                              mesure,
                              indexCategorie,
                              'complementaires'
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {affichageActif === 'apercu' && (
            <div className="apercu-section">
              <p className="info">
                Aperçu des modifications apportées:
              </p>
              <div className="apercu-stats">
                <div className="stat">
                  <span className="label">Mesures prioritaires:</span>
                  <span className="value">{mesuresPrioritaires.length}</span>
                </div>
                <div className="stat">
                  <span className="label">Mesures complémentaires:</span>
                  <span className="value">{mesuresComplementaires.length}</span>
                </div>
              </div>
              <div className="apercu-details">
                <div>
                  <h4>Mesures prioritaires (ordre):</h4>
                  <ol>
                    {mesuresPrioritaires.map((m) => (
                      <li key={m.titre}>{m.titre}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4>Mesures complémentaires (ordre):</h4>
                  <ol>
                    {mesuresComplementaires.map((m) => (
                      <li key={m.titre}>{m.titre}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="editeur-rapport-footer">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={enChargement}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={telechargerCodeLatex}
            disabled={enChargement}
          >
            Télécharger LaTeX
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleRecompile}
            disabled={enChargement}
          >
            {enChargement ? 'Recompilation...' : 'Recompiler et télécharger'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};
