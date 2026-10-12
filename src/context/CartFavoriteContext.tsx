'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  getBrowserStorage,
  parseCartItems,
  parseFavoriteItems,
  readStorageValue,
  serializeCartItems,
  serializeFavoriteItems,
  STORAGE_KEYS,
  writeStorageValueAfterRestore,
} from '@/lib/persistence';

interface CartFavoriteContextType {
  cartItems: Map<string, number>;
  favoriteItems: Set<string>;
  addToCart: (productId: string) => void;
  decrementFromCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  isFavorite: (productId: string) => boolean;
  cartCount: number;
  favoriteCount: number;
  decrementCart: (itemId: string) => void;
}

const CartFavoriteContext = createContext<CartFavoriteContextType | undefined>(undefined);

export function CartFavoriteProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Map<string, number>>(new Map());
  const [favoriteItems, setFavoriteItems] = useState<Set<string>>(new Set());
  const [isRestored, setIsRestored] = useState(false);

  useEffect(() => {
    const storage = getBrowserStorage();

    setCartItems(parseCartItems(readStorageValue(storage, STORAGE_KEYS.cartItems)));
    setFavoriteItems(
      parseFavoriteItems(readStorageValue(storage, STORAGE_KEYS.favoriteItems)),
    );
    setIsRestored(true);
  }, []);

  useEffect(() => {
    writeStorageValueAfterRestore(
      getBrowserStorage(),
      STORAGE_KEYS.cartItems,
      serializeCartItems(cartItems),
      isRestored,
    );
  }, [cartItems, isRestored]);

  useEffect(() => {
    writeStorageValueAfterRestore(
      getBrowserStorage(),
      STORAGE_KEYS.favoriteItems,
      serializeFavoriteItems(favoriteItems),
      isRestored,
    );
  }, [favoriteItems, isRestored]);

  const addToCart = (productId: string) => {
    if (productId.trim() === '') {
      return;
    }

    setCartItems((prev) => {
      const next = new Map(prev);
      const currentQuantity = next.get(productId) ?? 0;
      next.set(productId, currentQuantity + 1);
      return next;
    });
  };

  const decrementFromCart = (productId: string) => {
    setCartItems((prev) => {
      const next = new Map(prev);
      const currentQuantity = next.get(productId) ?? 0;

      if (currentQuantity > 1) {
        next.set(productId, currentQuantity - 1);
      }

      return next;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const next = new Map(prev);
      next.delete(productId);
      return next;
    });
  };

  const decrementCart = (itemId: string) => {
    setCartItems((prev) => {
      const next = new Map(prev);
      const currentQuantity = next.get(itemId) ?? 0;

      if (currentQuantity <= 1) {
        next.delete(itemId);
      } else {
        next.set(itemId, currentQuantity - 1);
      }

      return next;
    });
  };

  const toggleFavorite = (productId: string) => {
    if (productId.trim() === '') {
      return;
    }

    setFavoriteItems((prev) => {
      const next = new Set(prev);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });
  };

  const clearCart = () => {
    setCartItems(new Map());
  };

  const isInCart = (productId: string) => cartItems.has(productId);
  const isFavorite = (productId: string) => favoriteItems.has(productId);
  const cartCount = Array.from(cartItems.values()).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  return (
    <CartFavoriteContext.Provider
      value={{
        cartItems,
        favoriteItems,
        addToCart,
        decrementFromCart,
        removeFromCart,
        toggleFavorite,
        clearCart,
        isInCart,
        isFavorite,
        cartCount,
        decrementCart,
        favoriteCount: favoriteItems.size,
      }}
    >
      {children}
    </CartFavoriteContext.Provider>
  );
}

export function useCartFavorite() {
  const context = useContext(CartFavoriteContext);

  if (!context) {
    throw new Error('useCartFavorite must be used within a CartFavoriteProvider');
  }

  return context;
}
