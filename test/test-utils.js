import assert from 'assert';
import { JSDOM } from 'jsdom';

export function getBrowserEnvironment(html = '') {
  const { window } = new JSDOM(html || `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Modal dialog</title>
    </head>
    <body></body>
  </html>`);
  const { document } = window;

  return { document, window };
}

export function sel(container, testId) {
  const element = find(container, testId);
  assert.ok(element, `element with data-testid "${testId}" not found`);

  return element;
}

export function find(container, testId) {
  return container.querySelector(`[data-testid="${testId}"]`);
}

export function clickOnElement(window, element) {
  const event = new window.MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  assert.ok(element, 'Element that should be clicked on does not exist');
  element.dispatchEvent(event);
}
