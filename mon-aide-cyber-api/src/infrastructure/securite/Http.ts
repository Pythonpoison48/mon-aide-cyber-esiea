import crypto from 'crypto';
import { Response } from 'express';

export const positionneLesCsp = (reponse: Response, csp: string) => {
  if (!csp) {
    // Default to a restrictive policy when none is configured.
    // Allow the DSFR assets and common CDN hosts used for icons/scripts used in `dist`.
    // Also permit data: and blob: for inline SVG icons and object URLs used for downloads.
    // Include the Matomo/stat host commonly used for analytics.
    const defaultCsp =
      "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com https://stats.beta.gouv.fr; style-src 'self' https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com 'nonce-'; img-src 'self' data: blob: https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com; object-src 'none'; base-uri 'self'";
    reponse.setHeader('Content-Security-Policy', defaultCsp);
    return;
  }

  const resultats = [];
  const allowedHosts = " https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com https://stats.beta.gouv.fr";

  const morceaux = csp.split(';').map((m) => m.trim()).filter(Boolean);
  let hasImgSrc = false;

  for (let morceau of morceaux) {
    if (morceau.startsWith('style-src')) {
      if (!morceau.includes('cdn.jsdelivr.net')) morceau = morceau + allowedHosts;
      morceau = rajouteNonceAleatoire(morceau, reponse);
    } else if (morceau.startsWith('script-src')) {
      if (!morceau.includes('cdn.jsdelivr.net')) morceau = morceau + allowedHosts;
    } else if (morceau.startsWith('img-src')) {
      hasImgSrc = true;
      if (!morceau.includes('data:')) morceau = morceau + ' data: blob:';
    }

    resultats.push(morceau);
  }

  // If the provided CSP doesn't specify an img-src, add one allowing data/blob for inline SVGs.
  if (!hasImgSrc) {
    resultats.push(
      "img-src 'self' data: blob: https://cdn.jsdelivr.net https://lab-anssi-ui-kit-prod-s3-assets.cellar-c2.services.clever-cloud.com"
    );
  }

  reponse.setHeader('Content-Security-Policy', resultats.join(';'));
};

const rajouteNonceAleatoire = (cspExistante: string, reponse: Response) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  reponse.locals.nonce = nonce;

  return `${cspExistante} 'nonce-${nonce}'`;
};
