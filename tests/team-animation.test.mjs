import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const css = await readFile(new URL('../components/team-section.module.css', import.meta.url), 'utf8');
const component = await readFile(new URL('../components/team-section.tsx', import.meta.url), 'utf8');

test('team reveal avoids expensive blur and long staggered entrance', () => {
  assert.doesNotMatch(css, /@keyframes orbitIn[^}]*filter:\s*blur/i);
  assert.doesNotMatch(css, /@keyframes teamMobileReveal[^}]*filter:\s*blur/i);
  assert.match(css, /\.member \{[^}]*opacity:\s*1/);
  assert.match(css, /animation:\s*orbitIn\s+650ms/);
  assert.match(css, /animation:\s*teamMobileReveal\s+480ms/);
  assert.doesNotMatch(component, /index \* 90/);
  assert.match(component, /rootMargin:\s*'0px 0px 12% 0px'/);
});
