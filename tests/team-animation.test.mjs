import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const css = await readFile(new URL('../components/team-section.module.css', import.meta.url), 'utf8');
const component = await readFile(new URL('../components/team-section.tsx', import.meta.url), 'utf8');

test('team reveal avoids expensive blur and long staggered entrance', () => {
  assert.doesNotMatch(css, /@keyframes orbitIn[^}]*filter:\s*blur/i);
  assert.doesNotMatch(css, /@keyframes teamMobileReveal[^}]*filter:\s*blur/i);
  assert.match(css, /\.member \{[^}]*opacity:\s*1/);
  assert.match(css, /animation:\s*orbitIn\s+720ms/);
  assert.match(css, /animation:\s*teamMobileReveal\s+480ms/);
  assert.doesNotMatch(component, /index \* 90/);
  assert.match(component, /rootMargin:\s*'0px 0px -18% 0px'/);
  assert.doesNotMatch(component, /requestAnimationFrame\(enter\)/);
});

test('desktop spheres animate out from behind the central logo', () => {
  assert.match(css, /\.symbol\s*\{[^}]*z-index:\s*4/);
  assert.match(css, /--orbit-x:/);
  assert.match(css, /@keyframes orbitIn[\s\S]*translate3d\(calc\(-50% \+ var\(--orbit-x\)\), calc\(-50% \+ var\(--orbit-y\)\), 0\) scale\(\.62\)/);
});

test('team images use lightweight assets and composited motion', () => {
  assert.match(component, /\/assets\/equipe\/optimized\//);
  assert.match(css, /\.member\s*\{[^}]*will-change:\s*transform, opacity/);
  assert.match(css, /backface-visibility:\s*hidden/);
});
