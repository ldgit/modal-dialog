export default function openDialog(htmlContent) {
  return makeOpenDialog(document, htmlContent);
}

export function makeOpenDialog(document, htmlContent) {
  const modalOverlay = createModalOverlay(document);
  const modalDiv = createModalDiv(document, htmlContent, closeDialog);

  modalOverlay.appendChild(modalDiv);
  document.body.appendChild(modalOverlay);

  function closeDialog() {
    modalOverlay.parentNode.removeChild(modalOverlay);
  }

  modalOverlay.addEventListener('click', (event) => {
    if (!modalDiv.contains(event.target)) {
      closeDialog();
    }
  });

  return closeDialog;
}

function createModalOverlay(document) {
  const modalOverlay = document.createElement('div');
  modalOverlay.setAttribute('data-testid', 'modal-overlay');

  return modalOverlay;
}

function createModalDiv(document, htmlContent, closeDialog) {
  const modalDiv = document.createElement('div');
  const closeButton = createCloseButton(document, closeDialog);

  modalDiv.setAttribute('data-testid', 'modal-div');
  modalDiv.innerHTML = htmlContent;
  modalDiv.insertBefore(closeButton, modalDiv.firstChild);

  return modalDiv;
}

function createCloseButton(document, closeDialog) {
  const closeButton = document.createElement('span');
  closeButton.setAttribute('data-testid', 'modal-close-button');
  closeButton.addEventListener('click', closeDialog);

  return closeButton;
}
