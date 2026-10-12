import assert from 'node:assert/strict';
import test from 'node:test';

import {
  normalizePage,
  parsePage,
  parsePageSize,
  parsePerPageOption,
  parseSortOption,
} from '../src/lib/catalog-filters.ts';

test('usa defaults para parâmetros ausentes ou inválidos', () => {
  assert.equal(parseSortOption(null), 'newest');
  assert.equal(parseSortOption('unknown'), 'newest');
  assert.equal(parsePerPageOption(null), 'all');
  assert.equal(parsePerPageOption('12'), 'all');
  assert.equal(parsePage(null), 1);
  assert.equal(parsePage('0'), 1);
  assert.equal(parsePage('2.5'), 1);
  assert.equal(parsePage('Infinity'), 1);
  assert.equal(parsePageSize('0'), 10);
  assert.equal(parsePageSize('2.5'), 10);
  assert.equal(parsePageSize('999'), 100);
});

test('aceita somente opções e inteiros positivos finitos', () => {
  assert.equal(parseSortOption('cheapest'), 'cheapest');
  assert.equal(parsePerPageOption('16'), '16');
  assert.equal(parsePage('12'), 12);
  assert.equal(parsePageSize('8'), 8);
});

test('limita a página aos resultados disponíveis', () => {
  assert.equal(normalizePage(1, 20), 1);
  assert.equal(normalizePage(4, 3), 3);
  assert.equal(normalizePage(0, 3), 1);
  assert.equal(normalizePage(20, 0), 1);
});
