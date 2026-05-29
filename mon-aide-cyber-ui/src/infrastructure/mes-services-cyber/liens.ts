const recupererBaseMesServicesCyber = () => {
  const urlBase = import.meta.env['VITE_URL_MSC'];
  if (urlBase && urlBase.trim().length > 0) {
    return urlBase;
  }

  return window.location.origin;
};

export const liensMesServicesCyber = () => {
  const base = recupererBaseMesServicesCyber();

  return {
    cyberDepartBrut: `${base}/cyberdepart`,
    cyberDepartAvecTracking: `${base}/cyberdepart?mtm_campaign=MAC_redirection`,
  };
};
