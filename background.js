const DEFAULT_SITE = 'https://plms.postech.ac.kr/*';
let queue = Promise.resolve();

async function reconcile() {
  const { enabled = true } = await chrome.storage.local.get('enabled');
  const { origins = [] } = await chrome.permissions.getAll();
  const sites = origins.filter(origin => /^https?:\/\/[^*]+\/\*$/.test(origin));
  const previous = await chrome.declarativeNetRequest.getDynamicRules();
  const addRules = enabled ? sites.map((site, index) => ({
    id: index + 1,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      responseHeaders: [{ header: 'Content-Disposition', operation: 'set', value: 'inline' }]
    },
    condition: {
      urlFilter: `|${site.slice(0, -1)}`,
      responseHeaders: [{ header: 'content-type', values: ['application/pdf*'] }],
      resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest', 'other']
    }
  })) : [];
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: previous.map(rule => rule.id), addRules
  });
  await chrome.storage.local.set({ activeSites: sites });
  const scripts = await chrome.scripting.getRegisteredContentScripts({ ids: ['pdf-links'] });
  if (sites.length) {
    const script = {
      id: 'pdf-links', matches: sites, js: ['content.js'],
      runAt: 'document_start', allFrames: true, persistAcrossSessions: true
    };
    if (scripts.length) await chrome.scripting.updateContentScripts([script]);
    else await chrome.scripting.registerContentScripts([script]);
    const tabs = await chrome.tabs.query({ url: sites });
    await Promise.allSettled(tabs.map(tab => chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true }, files: ['content.js']
    })));
  } else if (scripts.length) {
    await chrome.scripting.unregisterContentScripts({ ids: ['pdf-links'] });
  }
  await chrome.action.setBadgeText({ text: enabled ? '' : 'OFF' });
  await chrome.action.setBadgeBackgroundColor({ color: '#57534e' });
  return { enabled, sites };
}

function sync() {
  const result = queue.then(reconcile);
  queue = result.catch(error => console.error('PDF viewer:', error));
  return result;
}
chrome.runtime.onInstalled.addListener(() => { void sync(); });
chrome.runtime.onStartup.addListener(() => { void sync(); });
chrome.permissions.onAdded.addListener(() => { void sync(); });
chrome.permissions.onRemoved.addListener(() => { void sync(); });
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (sender.id !== chrome.runtime.id || message.type !== 'sync') return;
  sync().then(state => respond({ ...state, defaultSite: DEFAULT_SITE }))
    .catch(error => respond({ error: error.message }));
  return true;
});
