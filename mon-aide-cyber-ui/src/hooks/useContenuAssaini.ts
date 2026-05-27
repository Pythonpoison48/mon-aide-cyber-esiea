import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

export const useContenuAssaini = (contenuInitial: string) => {
  // Sanitize immediately for the initial render to avoid a flash
  // of untrusted HTML being rendered before the effect runs.
  const [contenuAssaini, setContenuAssaini] = useState(() =>
    DOMPurify.sanitize(contenuInitial)
  );

  useEffect(() => {
    const assaini = DOMPurify.sanitize(contenuInitial);
    setContenuAssaini(assaini);
  }, [contenuInitial]);

  return contenuAssaini;
};
