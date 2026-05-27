import { Request, Response } from 'express';
import Cookies, { Option } from 'cookies';
import crypto from 'crypto';
import { Contexte, ErreurMAC } from '../domaine/erreurMAC';
import {
  ErreurAccesRefuse,
  InformationsContexte,
} from './AdaptateurDeVerificationDeSession';
import {
  GestionnaireDeJeton,
  JwtMACPayload,
} from '../authentification/GestionnaireDeJeton';

export type MACCookies = { session: string };

export type ParametresCookies = {
  clef?: {
    keys: string[];
  };
  nom: string;
  signed?: boolean;
};

const recuperateurDeCookies = (
  requete: Request,
  reponse: Response,
  parametres: ParametresCookies = {
    nom: 'session',
    signed: true,
  }
): string | undefined => {
  // Determine keys: prefer explicit config, otherwise generate ephemeral key in dev.
  const keys = parametres.clef?.keys
    ? parametres.clef.keys
    : process.env.SECRET_COOKIE
    ? [process.env.SECRET_COOKIE]
    : [crypto.randomBytes(32).toString('hex')];

  const options: Option = { keys };
  return new Cookies(requete, reponse, options).get(
    parametres.nom,
    parametres.signed ? { signed: true } : undefined
  );
};

const utilitairesDeCookies = (
  contexte: Contexte,
  requete: Request,
  reponse: Response
): MACCookies => {
  const cookies = recuperateurDeCookies(requete, reponse);
  if (!cookies) {
    throw ErreurMAC.cree(
      contexte,
      new ErreurAccesRefuse(
        'Cookie invalide.',
        requete.query as InformationsContexte
      )
    );
  }
  return {
    session: cookies,
  };
};

const jwtPayload = (
  cookies: MACCookies,
  gestionnaireDeJeton: GestionnaireDeJeton
): JwtMACPayload => {
  const sessionDecodee = JSON.parse(
    Buffer.from(cookies.session, 'base64').toString()
  );

  const jetonProconnect = sessionDecodee.ProConnectIdToken;
  return gestionnaireDeJeton.verifie(sessionDecodee.token, jetonProconnect);
};

const reinitialiseLaSession = (requete: Request, reponse: Response): void => {
  const keys = process.env.SECRET_COOKIE
    ? [process.env.SECRET_COOKIE]
    : [crypto.randomBytes(32).toString('hex')];
  const cookies = new Cookies(requete, reponse, { keys });
  cookies.set('session');
};

type UtilitairesCookies = {
  jwtPayload: (
    cookies: MACCookies,
    gestionnaireDeJeton: GestionnaireDeJeton
  ) => JwtMACPayload;
  fabriqueDeCookies: (
    contexte: Contexte,
    requete: Request,
    reponse: Response
  ) => MACCookies;
  recuperateurDeCookies: (
    requete: Request,
    reponse: Response,
    parametres?: ParametresCookies
  ) => string | undefined;
  reinitialiseLaSession(requete: Request, reponse: Response): void;
};

export const utilitairesCookies: UtilitairesCookies = {
  jwtPayload,
  fabriqueDeCookies: utilitairesDeCookies,
  recuperateurDeCookies,
  reinitialiseLaSession,
};
