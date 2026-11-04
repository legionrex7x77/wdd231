// Navigation menu toggle
const menuButton = document.querySelector('#menu-button');
const primaryNav = document.querySelector('#primary-nav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuButton.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
  });
}

// Footer dynamic dates
const currentYearSpan = document.querySelector('#currentyear');
const lastModifiedParagraph = document.querySelector('#lastModified');

if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedParagraph) {
  lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}