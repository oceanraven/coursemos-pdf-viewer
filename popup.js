const toggle = document.querySelector('#toggle');
const add = document.querySelector('#add');
const message = document.querySelector('#message');
let enabled = true;
let currentSite;

async function refresh() {
  const state = await chrome.runtime.sendMessage({ type: 'sync' });
  if (state.error) throw new Error(state.error);
  enabled = state.enabled;
  toggle.setAttribute('aria-checked', String(enabled));
  toggle.textContent = enabled ? 'ON' : 'OFF';
  document.querySelector('#state').textContent = enabled ? 'Inline PDF viewing enabled' : 'Using default download behavior';
  document.querySelector('#count').textContent = String(state.sites.length).padStart(2, '0');
  const list = document.querySelector('#sites');
  list.replaceChildren();
  for (const site of state.sites) {
    const row = document.createElement('li');
    const name = document.createElement('span');
    name.textContent = new URL(site).host;
    row.append(name);
    if (site !== state.defaultSite) {
      const remove = document.createElement('button');
      remove.className = 'remove';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${name.textContent}`);
      remove.addEventListener('click', () => run(async () => {
        await chrome.permissions.remove({ origins: [site] });
        await refresh();
      }));
      row.append(remove);
    }
    list.append(row);
  }
  add.disabled = !currentSite || state.sites.includes(currentSite);
  add.textContent = !currentSite ? 'Open an HTTP(S) LMS tab' : state.sites.includes(currentSite) ? 'Current site already added' : '+ Add current LMS site';
  toggle.disabled = false;
}
async function run(action) {
  message.textContent = '';
  try { await action(); }
  catch (error) { message.textContent = `Could not apply settings: ${error.message}`; }
}
toggle.addEventListener('click', () => run(async () => {
  toggle.disabled = true;
  try {
    await chrome.storage.local.set({ enabled: !enabled });
    await refresh();
    message.textContent = 'Applies to the next PDF you open.';
  } finally { toggle.disabled = false; }
}));
add.addEventListener('click', () => run(async () => {
  if (!currentSite) return;
  const granted = await chrome.permissions.request({ origins: [currentSite] });
  if (!granted) { message.textContent = 'Site permission was not granted.'; return; }
  await refresh();
  message.textContent = 'Site added. Open the PDF link again.';
}));
run(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.url && /^https?:/.test(tab.url)) currentSite = `${new URL(tab.url).origin}/*`;
  await refresh();
});
