const timestampInput = document.querySelector('#timestamp');
if (timestampInput) {
  timestampInput.value = new Date().toISOString();
}

const triggers = document.querySelectorAll('.modal-trigger');
triggers.forEach((button) => {
  button.addEventListener('click', () => {
    const dialogId = button.dataset.modal;
    const dialog = document.getElementById(dialogId);
    if (dialog) {
      dialog.showModal();
    }
  });
});

const closeButtons = document.querySelectorAll('.close-modal');
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    if (dialog) {
      dialog.close();
    }
  });
});

const dialogs = document.querySelectorAll('dialog.benefit-modal');
dialogs.forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
});