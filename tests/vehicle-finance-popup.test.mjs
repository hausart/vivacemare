import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const component = await readFile(new URL('../components/vehicle-finance-popup.tsx', import.meta.url), 'utf8');
const css = await readFile(new URL('../components/vehicle-finance-popup.module.css', import.meta.url), 'utf8');
const founders = await readFile(new URL('../components/founders-section.tsx', import.meta.url), 'utf8');

test('vehicle popup waits two seconds after the solutions section enters view and fires once', () => {
  assert.match(component, /getBoundingClientRect\(\)/);
  assert.match(component, /addEventListener\('scroll', updateVisibility/);
  assert.match(component, /setTimeout\([\s\S]*?2000\)/);
  assert.match(component, /hasTriggeredRef\.current/);
  assert.match(component, /clearTimeout\(delayTimer\)/);
});

test('vehicle popup uses the supplied image and links to an advisor on WhatsApp', () => {
  assert.match(component, /financiamento-veiculo\.webp/);
  assert.match(component, /whatsappHref\('financiamento de veículo'\)/);
  assert.match(component, /Falar com um assessor/);
  assert.match(component, /closeButtonRef\.current\?\.focus\(\{ preventScroll: true \}\)/);
  assert.match(css, /padding:\s*0 48px;/);
});

test('vehicle popup has a wide desktop layout and a compact mobile layout', () => {
  assert.match(css, /width:\s*min\(1200px/);
  assert.match(css, /@media\s*\(max-width:\s*680px\)/);
  assert.match(css, /grid-template-rows:\s*minmax\(180px, 30svh\) minmax\(0, 1fr\)/);
});

test('Janaina biography is updated with the supplied education and certifications', () => {
  assert.match(founders, /Formada em Administração de Empresas pela Unimes/);
  assert.match(founders, /certificações CPA-20, Ancord e Susep/);
});
