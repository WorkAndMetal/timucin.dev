/* Apex domain enforcement (redirect www -> apex) */
if (location.hostname === 'www.timucin.dev') {
  location.replace(location.href.replace('www.timucin.dev', 'timucin.dev'));
}

/* Core state */
const state = {
  tabs: [], // { id, file, title, lang, content, active }
  openEditors: new Map(), // file -> id
  theme: localStorage.getItem('theme') || 'dark',
  panelVisible: true,
  sidebarVisible: true,
};

/* DOM refs */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

const tabsEl = $('.tabs');
const editorEl = $('#editor-content');
const panelEl = $('#panel');
const panelBodyEl = $('#panel-body');
const terminalEl = $('#terminal');
const outputEl = $('#output');
const quickOpen = $('#quick-open');
const quickInput = $('#quick-open-input');
const quickList = $('#quick-open-list');
const appRoot = $('#app');

/* Theme */
function applyTheme(theme) {
  appRoot.classList.toggle('theme-dark', theme === 'dark');
  appRoot.classList.toggle('theme-light', theme === 'light');
  state.theme = theme;
  localStorage.setItem('theme', theme);
}

/* Files registry from embedded templates */
function loadFileRegistry() {
  const ids = ['README.md', 'about.ts', 'projects.json', 'contact.html'];
  const files = ids.map((name) => {
    const node = document.getElementById(`file-${name}`);
    if (!node) return null;
    const json = JSON.parse(node.textContent || '{}');
    return { name, language: json.language || 'text', content: json.content || '' };
  }).filter(Boolean);
  return new Map(files.map(f => [f.name, f]));
}

const registry = loadFileRegistry();

/* Rendering */
function renderTabs() {
  tabsEl.innerHTML = '';
  state.tabs.forEach(tab => {
    const el = document.createElement('button');
    el.className = `tab${tab.active ? ' active' : ''}`;
    el.setAttribute('role', 'tab');
    el.dataset.id = tab.id;
    el.innerHTML = `
      <svg class="icon"><use href="/assets/icons.svg#${iconFor(tab.file)}"></use></svg>
      <span>${tab.title}</span>
      <span class="close" title="Kapat">×</span>
    `;
    el.addEventListener('click', (e) => {
      if (e.target.closest('.close')) {
        closeTab(tab.id);
      } else {
        activateTab(tab.id);
      }
    });
    tabsEl.appendChild(el);
  });
}

function iconFor(file) {
  const ext = file.split('.').pop();
  switch (ext) {
    case 'md': return 'markdown';
    case 'ts': return 'ts';
    case 'json': return 'json';
    case 'html': return 'html';
    default: return 'file';
  }
}

function renderEditor() {
  const active = state.tabs.find(t => t.active);
  if (!active) { editorEl.innerHTML = ''; return; }
  const { language, content } = active;
  let html = '';
  switch (language) {
    case 'markdown':
      html = markdownToHtml(content);
      break;
    case 'html':
      html = content;
      break;
    default:
      html = `<pre><code>${escapeHtml(content)}</code></pre>`;
  }
  editorEl.setAttribute('aria-label', `${active.title} — ${language}`);
  editorEl.innerHTML = html;
}

function markdownToHtml(md) {
  // ultra light MD -> HTML (headings, bold, links, lists, paragraphs)
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noreferrer">$1<\/a>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  html = html.replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>');
  return html;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
}

/* Tab operations */
let nextId = 1;
function openFile(name) {
  const existing = state.openEditors.get(name);
  if (existing) { activateTab(existing); return; }
  const file = registry.get(name);
  if (!file) return;
  const id = String(nextId++);
  const tab = { id, file: name, title: name, lang: file.language, language: file.language, content: file.content, active: true };
  state.tabs.forEach(t => t.active = false);
  state.tabs.push(tab);
  state.openEditors.set(name, id);
  renderTabs();
  renderEditor();
}

function activateTab(id) {
  state.tabs.forEach(t => t.active = (t.id === id));
  renderTabs();
  renderEditor();
}

function closeTab(id) {
  const idx = state.tabs.findIndex(t => t.id === id);
  if (idx === -1) return;
  const [removed] = state.tabs.splice(idx, 1);
  state.openEditors.delete(removed.file);
  if (removed.active && state.tabs.length) {
    state.tabs[state.tabs.length - 1].active = true;
  }
  renderTabs();
  renderEditor();
}

/* Sidebar interactions */
$$('.file').forEach(el => {
  el.addEventListener('click', () => openFile(el.dataset.file));
});

/* Activity bar */
$('.theme-toggle')?.addEventListener('click', () => toggleTheme());

function toggleTheme() { applyTheme(state.theme === 'dark' ? 'light' : 'dark'); }

/* Panel */
$('#toggle-panel')?.addEventListener('click', () => togglePanel());
function togglePanel(force) {
  const visible = force ?? !state.panelVisible;
  state.panelVisible = visible;
  panelEl.classList.toggle('hidden', !visible);
}

/* Status bar controls */
$('#toggle-sidebar')?.addEventListener('click', () => toggleSidebar());
function toggleSidebar(force) {
  const visible = force ?? !state.sidebarVisible;
  state.sidebarVisible = visible;
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.style.display = visible ? 'flex' : 'none';
}

/* Keyboard shortcuts */
document.addEventListener('keydown', (e) => {
  // Ctrl+B -> toggle sidebar
  if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    toggleSidebar();
  }
  // Ctrl+J -> toggle panel
  if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'j') {
    e.preventDefault();
    togglePanel();
  }
  // Ctrl+P -> quick open
  if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'p') {
    e.preventDefault();
    openQuickOpen();
  }
  // Ctrl+K Ctrl+T -> theme
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    let once = false;
    const handler = (ev) => {
      if (once) return;
      once = true;
      if (ev.ctrlKey && ev.key.toLowerCase() === 't') {
        ev.preventDefault(); toggleTheme();
      }
      document.removeEventListener('keydown', handler, true);
    };
    document.addEventListener('keydown', handler, true);
  }
});

/* Quick Open */
function openQuickOpen() {
  quickList.innerHTML = '';
  const items = Array.from(registry.keys());
  items.forEach((name, idx) => {
    const li = document.createElement('li');
    li.className = 'quick-open-item';
    li.setAttribute('role', 'option');
    if (idx === 0) li.setAttribute('aria-selected', 'true');
    li.innerHTML = `<svg class="icon"><use href="/assets/icons.svg#${iconFor(name)}"></use></svg><span>${name}</span>`;
    li.addEventListener('click', () => { openFile(name); quickOpen.close(); });
    quickList.appendChild(li);
  });
  quickOpen.showModal();
  quickInput.value = '';
  quickInput.focus();
}

quickInput?.addEventListener('input', () => {
  const q = quickInput.value.toLowerCase();
  const items = $$('.quick-open-item', quickList);
  items.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(q) ? '' : 'none';
  });
});

quickOpen?.addEventListener('close', () => {
  quickList.innerHTML = '';
});

/* Panel tabs */
$$('.panel-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.panel-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (btn.dataset.panel === 'terminal') {
      terminalEl.classList.remove('hidden');
      outputEl.classList.add('hidden');
    } else {
      terminalEl.classList.add('hidden');
      outputEl.classList.remove('hidden');
    }
  });
});

/* Activity: Explorer default */
$('.activity-item[data-view="explorer"]')?.addEventListener('click', () => {
  // For the demo we only highlight the active item
  $$('.activity-item').forEach(i => i.classList.remove('active'));
  $('.activity-item[data-view="explorer"]').classList.add('active');
});

/* Startup */
applyTheme(state.theme);
openFile('README.md');
togglePanel(true);

// Register SW
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  });
}
