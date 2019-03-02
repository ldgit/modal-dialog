import assert from 'assert';
import { makeOpenDialog } from '../index';
import { getBrowserEnvironment, sel, clickOnElement } from './test-utils';

describe('modal dialog openDialog function', () => {
  let document;
  let window;
  let click;

  beforeEach(() => {
    ({ document, window } = getBrowserEnvironment());
    click = clickOnElement.bind(null, window);
  });

  it('should create modal div inside a modal overlay', () => {
    makeOpenDialog(document, '');

    const modalOverlay = sel(document.body, 'modal-overlay');
    const divsInsideModalOverlay = modalOverlay.querySelectorAll('div');

    assert.equal(divsInsideModalOverlay.length, 1);
  });

  it('should insert given string content into modal div as html', () => {
    makeOpenDialog(document, '<div data-testid="new-html">Important info</div>');

    const modalDiv = sel(document.body, 'modal-div');
    const htmlInModalDialog = sel(modalDiv, 'new-html');

    assert.equal(htmlInModalDialog.textContent, 'Important info');
  });

  it('should return a function that will close opened modal by removing it\'s elements from dom', () => {
    assert.strictEqual(document.body.innerHTML.trim(), '', 'nothing should be in document body at the beginning of this test');
    const closeDialog = makeOpenDialog(document, '');

    closeDialog();

    assert.strictEqual(document.body.innerHTML.trim(), '');
  });

  it('should add close button first, html content second', () => {
    makeOpenDialog(document, '<div data-testid="content"></div>');
    const modalDivChildren = sel(document.body, 'modal-div').childNodes;

    assert.equal(modalDivChildren[0].getAttribute('data-testid'), 'modal-close-button');
    assert.equal(modalDivChildren[1].getAttribute('data-testid'), 'content');
  });

  describe('behavior when dialog is opened', () => {
    it('should close when close button is clicked', () => {
      makeOpenDialog(document, '');
      const modalDiv = sel(document.body, 'modal-div');
      const closeButton = sel(modalDiv, 'modal-close-button');

      click(closeButton);

      assert.strictEqual(document.body.innerHTML.trim(), '');
    });

    it('should close when clicking outside of modal div', () => {
      makeOpenDialog(document, '');
      const modalOverlay = sel(document.body, 'modal-overlay');
      const modalDiv = sel(document.body, 'modal-div');
      click(modalDiv);
      assert.notEqual(document.body.innerHTML.trim(), '', 'clicking on modal div should not close it');

      click(modalOverlay);

      assert.strictEqual(document.body.innerHTML.trim(), '');
    });
  });
});
