import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const css = await readFile(new URL('../components/solutions-section.module.css', import.meta.url), 'utf8');
const component = await readFile(new URL('../components/solutions-section.tsx', import.meta.url), 'utf8');

test('mobile solution cards neutralize desktop hover styling', () => {
  assert.match(css, /@media \(max-width: 800px\)[\s\S]*\.card:hover \.cardOverlay\s*\{\s*background:/);
  assert.match(css, /@media \(max-width: 800px\)[\s\S]*\.card:hover \.cardCta\s*\{[\s\S]*background: var\(--color-gold\)/);
});

test('horizontal drag captures the pointer and disables snap synchronously', () => {
  assert.match(component, /scroller\.setPointerCapture\(event\.pointerId\)/);
  assert.match(component, /scroller\.style\.scrollSnapType = 'none'/);
  assert.match(component, /scroller\.style\.scrollSnapType = 'x mandatory'/);
});
