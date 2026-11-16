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
      ['filename', 'file', 'name', 'download'].some(key => pdf(url.searchParams.get(key))) ||
      /\.pdf(?:\s|$|[)\]])/i.test(link.textContent || '') ||
      /\bpdf\b/i.test([link.getAttribute('aria-label'), link.title,
        ...Array.from(link.querySelectorAll('img'), image => `${image.alt} ${image.getAttribute('src')}`)
      ].filter(Boolean).join(' '));
  }

  document.addEventListener('click', event => {
    if (!enabled || !chrome.runtime?.id || event.defaultPrevented || event.button !== 0 ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
        !sites.includes(`${location.origin}/*`)) return;
    const link = event.composedPath().find(node => node instanceof HTMLAnchorElement);
    if (!link?.href || !isPdf(link)) return;
    // Stop LMS click handlers from replacing this navigation with a same-tab redirect.
    event.preventDefault();
    event.stopImmediatePropagation();
    chrome.runtime.sendMessage({ type: 'openPdf', url: link.href }).then(result => {
      if (!result?.opened) location.assign(link.href);
    }).catch(() => location.assign(link.href));
  }, true);
})();
