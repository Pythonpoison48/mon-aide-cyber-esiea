import React, { useState, useCallback } from 'react';
import Button from '../../atomes/Button/Button';
import './EditeurRapport.scss';

interface EditeurRapportProps {
  idDiagnostic: string;
  mesuresPrioritaires: any[];
  mesuresComplementaires: any[];
  onClose: () => void;
  onRecompile: (mesures: {
    mesuresPrioritaires: any[];
    mesuresComplementaires: any[];
  }) => Promise<Blob>;
}

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
  onClose,
  onRecompile,
}) => {
  const [mesuresPrioritaires, setMesuresPrioritaires] = useState(
    mesuresInitialesPrioritaires
  );
  const [mesuresComplementaires, setMesuresComplementaires] = useState(
    mesuresInitialesComplementaires
  );
  const [draggedIndex, setDraggedIndex] = useState<{
    section: 'prioritaires' | 'complementaires';
    index: number;
  } | null>(null);
  const [enChargement, setEnChargement] = useState(false);
  const [affichageActif, setAffichageActif] = useState<
    'prioritaires' | 'complementaires' | 'apercu'
  >('prioritaires');

  const handleDragStart = (
    section: 'prioritaires' | 'complementaires',
    index: number
  ) => {
    setDraggedIndex({ section, index });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    section: 'prioritaires' | 'complementaires',
    index: number
  ) => {
    if (!draggedIndex) return;

    const sourceMesures =
      draggedIndex.section === 'prioritaires'
        ? mesuresPrioritaires
        : mesuresComplementaires;
    const targetMesures =
      section === 'prioritaires'
        ? mesuresPrioritaires
        : mesuresComplementaires;

    if (draggedIndex.section === section) {
      // Réorganisation dans la même section
      const nouvelles = [...sourceMesures];
      const [element] = nouvelles.splice(draggedIndex.index, 1);
      nouvelles.splice(index, 0, element);

      if (section === 'prioritaires') {
        setMesuresPrioritaires(nouvelles);
      } else {
        setMesuresComplementaires(nouvelles);
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
    direction: 'up' | 'down'
  ) => {
    const mesures =
      section === 'prioritaires'
        ? [...mesuresPrioritaires]
        : [...mesuresComplementaires];

    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === mesures.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [mesures[index], mesures[newIndex]] = [mesures[newIndex], mesures[index]];

    if (section === 'prioritaires') {
      setMesuresPrioritaires(mesures);
    } else {
      setMesuresComplementaires(mesures);
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

  const supprimerMesure = (section: 'prioritaires' | 'complementaires', index: number) => {
    if (section === 'prioritaires') {
      setMesuresPrioritaires(mesuresPrioritaires.filter((_, i) => i !== index));
    } else {
      setMesuresComplementaires(mesuresComplementaires.filter((_, i) => i !== index));
    }
  };

  const telechargerCodeLatex = useCallback(async () => {
    setEnChargement(true);
    try {
      const response = await fetch(
        `/api/diagnostic/${idDiagnostic}/restitution/latex`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mesuresPrioritaires,
            mesuresComplementaires,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const text = await response.text();
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-${idDiagnostic}.tex`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (erreur) {
      console.error('Erreur téléchargement LaTeX:', erreur);
      alert('Erreur lors du téléchargement du code LaTeX');
    } finally {
      setEnChargement(false);
    }
  }, [mesuresPrioritaires, mesuresComplementaires, idDiagnostic]);

  const renderMesureItem = (
    mesure: any,
    index: number,
    section: 'prioritaires' | 'complementaires'
  ) => (
    <div
      key={index}
      draggable
      onDragStart={() => handleDragStart(section, index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(section, index)}
      className={`mesure-item ${draggedIndex?.index === index && draggedIndex?.section === section ? 'dragging' : ''}`}
    >
      <div className="mesure-header">
        <span className="mesure-numero">{index + 1}.</span>
        <span className="mesure-titre">{mesure.titre}</span>
      </div>
      <div className="mesure-controls">
        <button
          className="btn-small"
          onClick={() => deplacerMesure(section, index, 'up')}
          disabled={index === 0}
          title="Déplacer vers le haut"
        >
          ↑
        </button>
        <button
          className="btn-small"
          onClick={() => deplacerMesure(section, index, 'down')}
          disabled={
            index ===
            (section === 'prioritaires'
              ? mesuresPrioritaires.length - 1
              : mesuresComplementaires.length - 1)
          }
          title="Déplacer vers le bas"
        >
          ↓
        </button>
        <button
          className="btn-small btn-danger"
          onClick={() => supprimerMesure(section, index)}
          title="Supprimer cette mesure"
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
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
                  Aucune mesure prioritaire à afficher. Les mesures se chargeront bientôt...
                </p>
              ) : (
                <>
                  <p className="info">
                    Faites glisser les mesures pour les réorganiser, ou utilisez les
                    boutons ↑/↓
                  </p>
                  <div className="mesures-list">
                    {mesuresPrioritaires.map((mesure, index) =>
                      renderMesureItem(mesure, index, 'prioritaires')
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {affichageActif === 'complementaires' && (
            <div className="mesures-section">
              {mesuresComplementaires.length === 0 ? (
                <p className="info" style={{ color: '#d32f2f' }}>
                  Aucune mesure complémentaire à afficher. Les mesures se chargeront bientôt...
                </p>
              ) : (
                <>
                  <p className="info">
                    Faites glisser les mesures pour les réorganiser, ou utilisez les
                    boutons ↑/↓
                  </p>
                  <div className="mesures-list">
                    {mesuresComplementaires.map((mesure, index) =>
                      renderMesureItem(mesure, index, 'complementaires')
                    )}
                  </div>
                </>
              )}
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
    </div>
  );
};
