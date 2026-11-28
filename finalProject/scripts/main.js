const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
}

const yearEl = document.querySelector('#currentyear');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const modEl = document.querySelector('#lastModified');
if (modEl) {
  modEl.textContent = `Last Modified: ${document.lastModified}`;
}

const openModalBtn = document.querySelector('#open-formula-modal');
const closeModalBtn = document.querySelector('#close-formula-modal');
const formulaModal = document.querySelector('#formula-modal');

if (openModalBtn && formulaModal) {
  openModalBtn.addEventListener('click', () => formulaModal.showModal());
}
if (closeModalBtn && formulaModal) {
  closeModalBtn.addEventListener('click', () => formulaModal.close());
}

const savedStatusEl = document.querySelector('#saved-setup-status');
if (savedStatusEl) {
  const savedRaw = localStorage.getItem('chalcoSolarLastCalc');
  if (savedRaw) {
    try {
      const saved = JSON.parse(savedRaw);
      savedStatusEl.textContent = `Last saved: ${saved.dailyWh} Wh/day at ${saved.systemVoltage}V (${saved.recommendedSolarWatts}W solar).`;
    } catch {
      savedStatusEl.textContent = 'Saved calculation found.';
    }
  }
}