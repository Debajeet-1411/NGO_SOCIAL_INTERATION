// --- DEMO DATA ---
const demoRequests = [
  {id:1, title:'Urgent need for 100 cooked meals', category:'food', desc:'Shanti Orphanage requires 100 fresh, warm meals for dinner tonight. Veg only.', urgency:'high', city:'Pune', org:'Shanti Home', distance:1.2},
  {id:2, title:'50 blankets for rural school', category:'clothes', desc:'Kisan Seva School needs 50 warm blankets before the winter sets in. Any size appreciated.', urgency:'medium', city:'Satara', org:'Kisan Seva', distance:14},
  {id:3, title:'Volunteer doctors for health camp', category:'medical', desc:'Medical camp this Sunday. Need general physicians and nurses for 4 hours.', urgency:'high', city:'Pune', org:'Arogya Foundation', distance:5.5},
  {id:4, title:'Textbooks for 8th grade students', category:'volunteer', desc:'Need volunteers to help sort and distribute old textbooks. Location: Community Hall.', urgency:'low', city:'Mumbai', org:'Vidya Mitra', distance:98},
  {id:5, title:'Emergency blood donation O-neg', category:'medical', desc:'Patient in critical condition at City Hospital requires O-negative blood urgently.', urgency:'high', city:'Pune', org:'City Hospital', distance:2.1},
  {id:6, title:'Warm sweaters and jackets drive', category:'clothes', desc:'Collecting gently used winter wear for the homeless. Drop-off points across the city.', urgency:'medium', city:'Pune', org:'Goodwill Collective', distance:8.0},
];
const demoBlogs = [
  {id:1, title:'The Ultimate Guide to Effective NGO Requests', excerpt:'Learn the 3 key elements that make your request stand out and attract donors.'},
  {id:2, title:'Food Donation Safety: A Checklist for Restaurants', excerpt:'Ensure the food you donate is safe, hygienic, and truly helps the community.'},
  {id:3, title:'A Volunteer\'s Story: My First Day at a Shelter', excerpt:'Read about the impactful experience of a first-time volunteer and why you should join.'},
  {id:4, title:'How Micro-Donations Can Create Macro Impact', excerpt:'You don\'t need to be wealthy to make a difference. Learn how small contributions add up.'}
];

// --- LOCAL STORAGE KEYS ---
const STORAGE_USER = 'ngb_user';
const STORAGE_REQUESTS = 'ngb_requests';
const STORAGE_THEME = 'ngb_theme';

// --- APPLICATION STATE ---
let state = {
  user: JSON.parse(localStorage.getItem(STORAGE_USER)) || null,
  requests: JSON.parse(localStorage.getItem(STORAGE_REQUESTS)) || demoRequests.slice(),
  theme: localStorage.getItem(STORAGE_THEME) || 'light',
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', init);

function init() {
  setupUI();
  setupEventListeners();
  renderAll();
}

function setupUI() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeToggleBtn').innerText = state.theme === 'light' ? '🌙' : '☀️';
}

function setupEventListeners() {
  document.getElementById('searchInput').addEventListener('input', e => renderFeed(e.target.value.toLowerCase()));
  document.getElementById('sortSelect').addEventListener('change', () => renderFeed());
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => {
      document.querySelector('.tab.active').classList.remove('active');
      t.classList.add('active');
      renderFeed();
    });
  });

  window.addEventListener('click', e => {
    ['authModal', 'createPanel', 'msgModal'].forEach(id => {
      const m = document.getElementById(id);
      if (e.target === m) m.classList.add('hidden');
    });
  });
}

function renderAll() {
  renderProfileMini();
  renderFeed();
  renderBlogs();
}


// --- THEME ---
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem(STORAGE_THEME, state.theme);
  setupUI();
}

// --- NAVIGATION ---
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(`page-${page}`).classList.remove('hidden');
}

// --- RENDERING ---
function renderProfileMini() {
  const u = state.user;
  document.getElementById('profileName').innerText = u ? u.name : 'Guest';
  document.getElementById('profileRole').innerText = u ? u.role : 'Visitor';
  document.getElementById('avatar').innerText = u ? u.name[0].toUpperCase() : 'G';
  const authBtn = document.getElementById('authBtn');
  authBtn.innerText = u ? 'Sign out' : 'Login';
  authBtn.onclick = u ? signOut : openAuth;
}

function renderFeed(search = '') {
  let items = [...state.requests];
  const activeTab = document.querySelector('.tab.active').dataset.filter;
  if (activeTab) items = items.filter(it => it.category === activeTab);
  if (search) items = items.filter(it => (it.title + it.desc + it.org).toLowerCase().includes(search));
  
  const sort = document.getElementById('sortSelect').value;
  if (sort === 'urgent') items.sort((a, b) => urgencyScore(b.urgency) - urgencyScore(a.urgency));
  else if (sort === 'near') items.sort((a, b) => a.distance - b.distance);
  
  const feed = document.getElementById('feed');
  feed.innerHTML = items.length ? '' : '<p>No requests found matching your criteria.</p>';
  items.forEach(it => {
    const d = document.createElement('div');
    d.className = 'request';
    d.innerHTML = `
      <div>
        <div class="request-header">${it.title}</div>
        <div class="small">${it.org} • ${it.city} (${it.distance}km away)</div>
        <div class="small" style="margin-top:8px;">${it.desc}</div>
      </div>
      <div class="request-meta">
          <div class="badge">${it.category}</div>
          <div class="badge ${it.urgency}">${it.urgency} urgency</div>
          <div style="flex-grow:1;"></div>
          <button class="btn" onclick="openMessage(${it.id},'${it.org}')">Offer Help</button>
      </div>`;
    feed.appendChild(d);
  });
}

function renderBlogs() {
  const el = document.getElementById('blogsList');
  el.innerHTML = '';
  demoBlogs.forEach(b => {
    const div = document.createElement('div');
    div.className = 'blog-post';
    div.innerHTML = `<div style="font-weight:700">${b.title}</div><div class="small">${b.excerpt}</div>`;
    el.appendChild(div);
  });
}

// --- ACTIONS & MODALS ---
function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function closeAuth() { document.getElementById('authModal').classList.add('hidden'); }
function authSignIn() {
  const email = document.getElementById('authEmail').value;
  if (!email) return showToast('Please enter an email.');
  const user = {id:Date.now(), email, name:email.split('@')[0], role:document.getElementById('authRole').value};
  state.user = user;
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
  closeAuth();
  renderProfileMini();
  showToast(`Welcome, ${user.name}!`);
}
function signOut() {
  if (!state.user) return;
  state.user = null;
  localStorage.removeItem(STORAGE_USER);
  renderProfileMini();
  showToast('You have been signed out.');
}

function openCreateRequest() {
  if (!state.user) return openAuth();
  document.getElementById('createPanel').classList.remove('hidden');
}
function closeCreate() { document.getElementById('createPanel').classList.add('hidden'); }
function publishRequest() {
  const newReq = {
    id: Date.now(),
    title: document.getElementById('rTitle').value,
    category: document.getElementById('rCategory').value,
    urgency: document.getElementById('rUrgency').value,
    desc: document.getElementById('rDesc').value + ' Contact: ' + document.getElementById('rContact').value,
    city: 'Pune', // Assuming user's city
    org: state.user.name,
    distance: Math.round(Math.random() * 10 * 10) / 10,
  };
  state.requests.unshift(newReq);
  localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(state.requests));
  closeCreate();
  renderFeed();
  showToast('Request published successfully!');
  document.getElementById('createForm').reset();
}

function openMessage(id, org) {
  if (!state.user) return openAuth();
  document.getElementById('msgModal').classList.remove('hidden');
  document.getElementById('msgTitle').innerText = 'Message ' + org;
}
function closeMsg() { document.getElementById('msgModal').classList.add('hidden'); }
function sendMsg() {
  closeMsg();
  showToast('Message sent (demo)!');
}

// --- HELPERS ---
function urgencyScore(u) { return u === 'high' ? 3 : (u === 'medium' ? 2 : 1); }
function simulateHelp() { showToast('Searching for nearby helpers... (demo)'); }
function showToast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toast-out 0.5s forwards';
        setTimeout(() => toast.remove(), 500);
    }, duration);
}