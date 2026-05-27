import crypto from 'crypto';
import { Response } from 'express';

export const positionneLesCsp = (reponse: Response, csp: string) => {
  if (!csp) {
    // Default to a restrictive policy when none is configured.
    // Allow the DSFR assets and common CDN hosts used for icons/scripts used in `dist`.
    // This keeps a tight policy while permitting cdn.jsdelivr.net and the ANSSI UI kit host.
    const defaultCsp =
      "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com; style-src 'self' https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com; object-src 'none'; base-uri 'self'";
    reponse.setHeader('Content-Security-Policy', defaultCsp);
    return;
  }

  const resultats = [];
  for (let morceau of csp.split(';')) {
    if (morceau.trim().startsWith('style-src'))
      morceau = rajouteNonceAleatoire(morceau, reponse);

    resultats.push(morceau);
  }

  reponse.setHeader('Content-Security-Policy', resultats.join(';'));
};

const rajouteNonceAleatoire = (cspExistante: string, reponse: Response) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  reponse.locals.nonce = nonce;

  return `${cspExistante} 'nonce-${nonce}'`;
};
