export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const STORAGE_KEYS = {
  cartItems: 'cartItems',
  favoriteItems: 'favoriteItems',
  theme: 'theme',
} as const;

function isProductId(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isQuantity(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}

export function parseCartItems(serialized: string | null): Map<string, number> {
  if (!serialized) {
    return new Map();
  }

  try {
    const parsed: unknown = JSON.parse(serialized);

    if (!Array.isArray(parsed)) {
      return new Map();
    }

    const cartItems = new Map<string, number>();

    for (const entry of parsed) {
      if (
        Array.isArray(entry) &&
        entry.length === 2 &&
        isProductId(entry[0]) &&
        isQuantity(entry[1])
      ) {
        cartItems.set(entry[0], entry[1]);
      }
    }

    return cartItems;
  } catch {
    return new Map();
  }
}

export function parseFavoriteItems(serialized: string | null): Set<string> {
  if (!serialized) {
    return new Set();
  }

  try {
    const parsed: unknown = JSON.parse(serialized);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter(isProductId));
  } catch {
    return new Set();
  }
}

export function serializeCartItems(items: ReadonlyMap<string, number>): string {
  return JSON.stringify(
    Array.from(items.entries()).filter(
      ([productId, quantity]) => isProductId(productId) && isQuantity(quantity),
    ),
  );
}

export function serializeFavoriteItems(items: ReadonlySet<string>): string {
  return JSON.stringify(Array.from(items).filter(isProductId));
}

export function readStorageValue(storage: StorageLike | null, key: string): string | null {
  if (!storage) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorageValue(
  storage: StorageLike | null,
  key: string,
  value: string,
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function writeStorageValueAfterRestore(
  storage: StorageLike | null,
  key: string,
  value: string,
  isRestored: boolean,
): boolean {
  if (!isRestored) {
    return false;
  }

  return writeStorageValue(storage, key, value);
}

export function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
