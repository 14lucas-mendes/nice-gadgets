import assert from 'node:assert/strict';
import test from 'node:test';

import phones from '../src/data/phones.json' with { type: 'json' };
import tablets from '../src/data/tablets.json' with { type: 'json' };
import accessories from '../src/data/accessories.json' with { type: 'json' };
import { matchesProductIdentity } from '../src/lib/product-data-matching.mjs';
import {
  buildProductId,
  formatVariantSlug,
  getProductUrlByCapacity,
  getProductUrlByColor,
  getSelectableCapacities,
  getSelectableColors,
  variantsMatch,
} from '../src/lib/product-url.ts';

const catalog = [...phones, ...tablets, ...accessories];
const catalogIds = new Set(catalog.map((product) => product.id));

test('normaliza fragmentos de capacidade e cor para o formato dos ids', () => {
  assert.equal(formatVariantSlug('Rose Gold'), 'rose-gold');
  assert.equal(formatVariantSlug('  SPACE GRAY '), 'space-gray');
  assert.equal(formatVariantSlug('128GB'), '128gb');
  assert.equal(formatVariantSlug('rosegold'), 'rosegold');
  assert.equal(variantsMatch('space-gray', 'space gray'), true);
  assert.equal(variantsMatch('512GB', '512gb'), true);
});

test('monta ids com cores compostas sem espaços', () => {
  assert.equal(
    buildProductId('apple-ipad-air-4th-gen', '256GB', 'rose gold'),
    'apple-ipad-air-4th-gen-256gb-rose-gold',
  );
  assert.equal(
    buildProductId('apple-watch-series-3', '38mm', 'space gray'),
    'apple-watch-series-3-38mm-space-gray',
  );
});

test('gera urls de variante que existem no catálogo local', () => {
  const tablet = tablets.find((product) => product.id === 'apple-ipad-air-4th-gen-256gb-rose-gold');
  const watch = accessories.find(
    (product) => product.id === 'apple-watch-series-3-38mm-space-gray',
  );

  assert.ok(tablet);
  assert.ok(watch);

  assert.equal(
    getProductUrlByColor(tablet, 'sky blue'),
    '/products/tablets/apple-ipad-air-4th-gen-256gb-sky-blue',
  );
  assert.equal(
    getProductUrlByCapacity(watch, '42mm'),
    '/products/accessories/apple-watch-series-3-42mm-space-gray',
  );

  assert.equal(catalogIds.has('apple-ipad-air-4th-gen-256gb-sky-blue'), true);
  assert.equal(catalogIds.has('apple-watch-series-3-42mm-space-gray'), true);
});

test('inclui o iPhone 14 Pro 512GB Gold nas capacidades selecionáveis', () => {
  const product = phones.find((item) => item.id === 'apple-iphone-14-pro-1tb-gold');
  assert.ok(product);

  const siblingIds = new Set(
    phones.filter((item) => item.namespaceId === product.namespaceId).map((item) => item.id),
  );

  const colors = getSelectableColors(product, siblingIds);
  const capacities = getSelectableCapacities(product, siblingIds);

  assert.deepEqual(colors, ['spaceblack', 'gold']);
  assert.ok(capacities.includes('1TB'));
  assert.ok(capacities.includes('128GB'));
  assert.equal(capacities.includes('512GB'), true);
  assert.equal(catalogIds.has('apple-iphone-14-pro-512gb-gold'), true);
});

test('oculta opções quando o conjunto de ids não contém a variante', () => {
  const product = phones.find((item) => item.id === 'apple-iphone-14-pro-1tb-gold');
  assert.ok(product);

  const capacities = getSelectableCapacities(product, new Set([product.id]));
  assert.deepEqual(capacities, ['1TB']);
});

test('links selecionáveis resolvem pela identidade real do catálogo', () => {
  const broken = [];

  for (const product of catalog) {
    const siblingIds = new Set(
      catalog
        .filter((item) => item.namespaceId === product.namespaceId)
        .map((item) => item.id),
    );

    for (const color of getSelectableColors(product, siblingIds)) {
      const id = buildProductId(product.namespaceId, product.capacity, color);
      const resolves = catalog.some((item) => matchesProductIdentity(item, id));
      if (!resolves) {
        broken.push(`${product.id} -> color ${color} => ${id}`);
      }
    }

    for (const capacity of getSelectableCapacities(product, siblingIds)) {
      const id = buildProductId(product.namespaceId, capacity, product.color);
      const resolves = catalog.some((item) => matchesProductIdentity(item, id));
      if (!resolves) {
        broken.push(`${product.id} -> capacity ${capacity} => ${id}`);
      }
    }
  }

  assert.deepEqual(broken, []);
});
