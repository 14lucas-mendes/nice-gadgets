'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

  // Carregar do localStorage na inicialização
  useEffect(() => {
    // Verificar se estamos no cliente antes de acessar localStorage
    if (typeof window === 'undefined') return;

    const savedCart = localStorage.getItem('cartItems');
    const savedFavorites = localStorage.getItem('favoriteItems');

    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        setCartItems(new Map(cartData));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }

    if (savedFavorites) {
      try {
        setFavoriteItems(new Set(JSON.parse(savedFavorites)));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Salvar no localStorage sempre que houver mudanças
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cartItems', JSON.stringify(Array.from(cartItems.entries())));
  }, [cartItems]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('favoriteItems', JSON.stringify(Array.from(favoriteItems)));
  }, [favoriteItems]);

  const addToCart = (productId: string) => {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      const currentQuantity = newMap.get(productId) || 0;
      newMap.set(productId, currentQuantity + 1);
      return newMap;
    });
  };

  const decrementFromCart = (productId: string) => {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      const currentQuantity = newMap.get(productId) || 0;
      if (currentQuantity > 1) {
        newMap.set(productId, currentQuantity - 1);
      }
      return newMap;
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(productId);
      return newMap;
    });
  };

  const decrementCart = (itemId: string) => {
    setCartItems((prev) => {
      const newCart = new Map(prev);
      const currentQty = newCart.get(itemId) || 0;

      if (currentQty <= 1) {
        newCart.delete(itemId);
      } else {
        newCart.set(itemId, currentQty - 1);
      }

      return newCart;
    });
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const clearCart = () => {
    setCartItems(new Map());
  };

  const isInCart = (productId: string) => {
    return cartItems.has(productId);
  };

  const isFavorite = (productId: string) => {
    return favoriteItems.has(productId);
  };

  // Calcular total de itens no carrinho (soma das quantidades)
  const cartCount = Array.from(cartItems.values()).reduce((sum, quantity) => sum + quantity, 0);

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
  if (context === undefined) {
    throw new Error('useCartFavorite must be used within a CartFavoriteProvider');
  }
  return context;
}
