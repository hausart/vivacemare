import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const component = await readFile(new URL('../components/vehicle-finance-popup.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../components/vehicle-finance-popup.module.css', import.meta.url), 'utf8');
const founders = await readFile(new URL('../components/founders-section.tsx', import.meta.url), 'utf8');

test('vehicle popup keeps its three-second delay running after leaving solutions', () => {
  const visibilityHandler = component.slice(
    component.indexOf('const updateVisibility'),
    component.indexOf("window.addEventListener('scroll', updateVisibility"),
  );
  assert.match(component, /getBoundingClientRect\(\)/);
  assert.match(component, /addEventListener\('scroll', updateVisibility/);
  assert.match(component, /setTimeout\([\s\S]*?3000\)/);
  assert.match(component, /hasTriggeredRef\.current/);
  assert.doesNotMatch(visibilityHandler, /clearTimeout\(delayTimer\)/);
  assert.match(component, /if \(delayTimer !== undefined\) window\.clearTimeout\(delayTimer\)/);
});

test('vehicle popup uses the supplied image and links to an advisor on WhatsApp', () => {
  assert.match(component, /financiamento-veiculo\.webp/);
  assert.match(component, /whatsappHref\('financiamento de veículo'\)/);
  assert.match(component, /Falar com um assessor/);
  assert.match(component, /titleRef\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(css, /padding:\s*0 48px;/);
});

test('vehicle popup has a wide desktop layout and a content-sized compact mobile layout', () => {
  assert.match(css, /width:\s*min\(1200px/);
  assert.match(css, /@media\s*\(max-width:\s*680px\)/);
  assert.match(css, /grid-template-rows:\s*minmax\(180px, 30svh\) auto/);
  assert.match(css, /height:\s*fit-content;/);
  assert.match(css, /\.content h2:focus\s*\{\s*outline:\s*none;/);
  assert.match(css, /justify-content:\s*flex-start;/);
  assert.match(css, /padding:\s*16px 24px 20px;/);
  assert.match(css, /margin-top:\s*16px;/);
});

test('Janaina biography is updated with the supplied education and certifications', () => {
  assert.match(founders, /Formada em Administração de Empresas pela Unimes/);
  assert.match(founders, /certificações CPA-20, Ancord e Susep/);
});
