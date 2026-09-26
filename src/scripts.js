function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.sidebar-overlay').classList.toggle('open');
}

function show(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  el.classList.add('active');
  document.querySelector('.sidebar').classList.remove('open');
  document.querySelector('.sidebar-overlay').classList.remove('open');
  localStorage.setItem('tc-section', id);
}

(function restoreSection() {
  const saved = localStorage.getItem('tc-section');
  if (!saved) return;
  const sec = document.getElementById('section-' + saved);
  const nav = document.querySelector(`.nav-item[onclick*="'${saved}'"]`);
  if (!sec || !nav) return;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  sec.classList.add('active');
  nav.classList.add('active');
})();

function filterPlugins(q) {
  q = q.toLowerCase();
  document.querySelectorAll('.plugin-cards .card').forEach(card => {
    const text = (card.dataset.tags || '') + ' ' + card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('#section-nvim h3').forEach(h3 => {
    const cards = h3.nextElementSibling;
    if (!cards || !cards.classList.contains('plugin-cards')) return;
    const visible = [...cards.querySelectorAll('.card')].some(c => c.style.display !== 'none');
    h3.style.display = visible ? '' : 'none';
    cards.style.display = visible ? '' : 'none';
  });
}

function filterExt(q) {
  q = q.toLowerCase();
  document.querySelectorAll('.ext-table tbody tr').forEach(row => {
    const text = (row.dataset.ext || '') + ' ' + row.innerText.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('.ext-section').forEach(sec => {
    const rows = [...sec.querySelectorAll('tbody tr')];
    const anyVisible = rows.some(r => r.style.display !== 'none');
    sec.style.display = anyVisible ? '' : 'none';
  });
}

function filterTools(q) {
  q = q.toLowerCase();
  document.querySelectorAll('.tool').forEach(card => {
    card.style.display = card.dataset.search.includes(q) ? '' : 'none';
  });
  document.querySelectorAll('.tool-group').forEach(g => {
    const any = [...g.querySelectorAll('.tool')].some(c => c.style.display !== 'none');
    g.style.display = any ? '' : 'none';
  });
}
