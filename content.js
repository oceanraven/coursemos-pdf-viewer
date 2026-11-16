(() => {
  // Reconciliation may inject into an already open tab more than once.
  if (globalThis.__openEdxPdfLinks) return;
  globalThis.__openEdxPdfLinks = true;
  let enabled = false;
  let sites = [];
  chrome.storage.local.get({ enabled: true, activeSites: [] }).then(state => {
    enabled = state.enabled;
    sites = state.activeSites;
  });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (changes.enabled) enabled = changes.enabled.newValue;
    if (changes.activeSites) sites = changes.activeSites.newValue || [];
  });

  function isPdf(link) {
    const url = new URL(link.href, location.href);
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    const pdf = value => /\.pdf$/i.test(value || '');
    let path = url.pathname;
    try { path = decodeURIComponent(path); } catch { /* Keep malformed paths unchanged. */ }
    return pdf(path) || pdf(link.getAttribute('download')) ||
      link.type?.split(';')[0].trim().toLowerCase() === 'application/pdf' ||
      ['filename', 'file', 'name', 'download'].some(key => pdf(url.searchParams.get(key)));
  }

  document.addEventListener('click', event => {
    if (!enabled || !chrome.runtime?.id || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        !sites.includes(`${location.origin}/*`)) return;
    const link = event.composedPath().find(node => node instanceof HTMLAnchorElement);
    if (!link?.href || !isPdf(link)) return;
    // Let Chrome perform the navigation, preserving referrers and keyboard activation.
    const saved = ['target', 'rel', 'download'].map(name => [name, link.getAttribute(name)]);
    link.target = '_blank';
    link.relList.add('noopener');
    link.removeAttribute('download');
    setTimeout(() => {
      for (const [name, value] of saved) {
        if (value === null) link.removeAttribute(name);
        else link.setAttribute(name, value);
      }
    }, 0);
  }, true);
})();
