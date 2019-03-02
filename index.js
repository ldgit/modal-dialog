export function makeOpenDialog(document, htmlContent) {
  const modalOverlay = document.createElement('div');
  modalOverlay.setAttribute('data-testid', 'modal-overlay');
  const modalDiv = document.createElement('div');
  modalDiv.setAttribute('data-testid', 'modal-div');
  modalDiv.innerHTML = htmlContent;
  modalOverlay.appendChild(modalDiv);
  const closeButton = document.createElement('span');
  closeButton.setAttribute('data-testid', 'modal-close-button');
  closeButton.addEventListener('click', closeDialog);
  modalDiv.appendChild(closeButton);
  document.body.appendChild(modalOverlay);

  function closeDialog() {
    modalOverlay.parentNode.removeChild(modalOverlay);
  };

  modalOverlay.addEventListener('click', function(event) {
    if (!modalDiv.contains(event.target)) {
      closeDialog();
    }
  });

  return closeDialog;
}
