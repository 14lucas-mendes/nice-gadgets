import assert from 'node:assert/strict';
import test from 'node:test';

import {
  parseCartItems,
  parseFavoriteItems,
  readStorageValue,
  serializeCartItems,
  serializeFavoriteItems,
  writeStorageValue,
  writeStorageValueAfterRestore,
} from '../src/lib/persistence.ts';

test('ignora entradas inválidas do carrinho e mantém quantidades positivas', () => {
  const cart = parseCartItems(
    JSON.stringify([
      ['phone-a', 2],
      ['phone-b', 0],
      ['phone-c', -1],
      ['phone-d', 1.5],
      ['', 3],
      ['phone-e', '4'],
      ['phone-f', Number.MAX_SAFE_INTEGER],
      ['phone-g', Number.MAX_SAFE_INTEGER + 1],
      ['phone-a', 4],
      'invalid',
    ]),
  );

  assert.deepEqual(Array.from(cart.entries()), [
    ['phone-a', 4],
    ['phone-f', Number.MAX_SAFE_INTEGER],
  ]);
});

test('descarta favoritos inválidos e remove duplicatas', () => {
  const favorites = parseFavoriteItems(
    JSON.stringify(['phone-a', '', 'phone-a', 42, 'phone-b']),
  );

  assert.deepEqual(Array.from(favorites), ['phone-a', 'phone-b']);
});

test('serializa e restaura as coleções persistidas', () => {
  const cart = new Map([
    ['phone-a', 2],
    ['phone-b', 1],
  ]);
  const favorites = new Set(['phone-a', 'phone-b']);

  assert.deepEqual(
    parseCartItems(serializeCartItems(cart)),
    cart,
  );
  assert.deepEqual(
    parseFavoriteItems(serializeFavoriteItems(favorites)),
    favorites,
  );
});

test('não grava o estado antes da restauração terminar', () => {
  const writes = [];
  const storage = {
    getItem() {
      return null;
    },
    setItem(key, value) {
      writes.push([key, value]);
    },
  };

  assert.equal(
    writeStorageValueAfterRestore(storage, 'cartItems', '[]', false),
    false,
  );
  assert.deepEqual(writes, []);

  assert.equal(
    writeStorageValueAfterRestore(storage, 'cartItems', '[]', true),
    true,
  );
  assert.deepEqual(writes, [['cartItems', '[]']]);
});

test('protege leituras e gravações quando o storage lança erro', () => {
  const blockedStorage = {
    getItem() {
      throw new Error('blocked');
    },
    setItem() {
      throw new Error('blocked');
    },
  };

  assert.equal(readStorageValue(blockedStorage, 'cartItems'), null);
  assert.equal(writeStorageValue(blockedStorage, 'cartItems', '[]'), false);
});
