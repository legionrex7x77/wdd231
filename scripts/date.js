// Dynamic copyright year
const currentYearSpan = document.querySelector('#currentyear');
currentYearSpan.textContent = new Date().getFullYear();

// Document last modified date
const lastModifiedParagraph = document.querySelector('#lastModified');
lastModifiedParagraph.textContent = `Last Modification: ${document.lastModified}`;