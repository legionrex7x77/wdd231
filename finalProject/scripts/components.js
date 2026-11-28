const gridEl = document.querySelector('#components-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
let allComponents = [];

function displayComponents(items) {
  if (!gridEl) return;
  gridEl.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h2>${item.name}</h2>
      <p><strong>Spec:</strong> ${item.voltageSpec}</p>
      <p><strong>Rating:</strong> ${item.rating}</p>
      <p>${item.notes}</p>
    `;
    gridEl.appendChild(card);
  });
}

async function loadComponents() {
  try {
    const response = await fetch('data/solar-gear.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    allComponents = await response.json();
    displayComponents(allComponents);
  } catch (err) {
    console.error('Failed to load solar components:', err);
    if (gridEl) {
      gridEl.innerHTML = '<p class="card">Unable to load component data.</p>';
    }
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;
    if (category === 'all') {
      displayComponents(allComponents);
    } else {
      displayComponents(allComponents.filter((item) => item.category === category));
    }
  });
});

loadComponents();