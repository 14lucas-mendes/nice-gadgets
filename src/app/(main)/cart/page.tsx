'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { useProductsFromIds } from '@/hooks/useProductsFromIds';
import PageHeader from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { CartItem } from '@/components/Cart/CartItem';
import { CartSummary } from '@/components/Cart/CartSummary';
import { CheckoutModal } from '@/components/Cart/CheckoutModal';
import { Skeleton } from '@/components/ui/skeleton';

export default function CartPage() {
  const { cartItems, cartCount, clearCart } = useCartFavorite();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const checkoutButtonRef = useRef<HTMLButtonElement>(null);
  const cartContentRef = useRef<HTMLDivElement>(null);

  const itemIds = useMemo(() => Array.from(cartItems.keys()), [cartItems]);
  const { products: cartProducts, isLoading, error } = useProductsFromIds(itemIds);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((total, product) => {
      const quantity = cartItems.get(product.itemId) || 0;
      return total + product.price * quantity;
    }, 0);
  }, [cartProducts, cartItems]);

  const handleCheckout = useCallback(() => {
    clearCart();
    setIsModalOpen(false);

    window.requestAnimationFrame(() => {
      cartContentRef.current?.focus();
    });
  }, [clearCart]);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div
      ref={cartContentRef}
      tabIndex={-1}
      aria-label="Conteúdo do carrinho"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
    >
      <PageHeader
        page="Cart"
        title="Shopping Cart"
        description={
          cartCount > 0
            ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart`
            : 'Your cart is empty'
        }
      />

      {isLoading && (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
          <Skeleton className="lg:w-96 h-64" />
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">
            Error loading cart items: {error.message}
          </p>
        </div>
      )}

      {!isLoading && !error && cartProducts.length === 0 && (
        <EmptyState
          imageSrc="/img/layout/cart-is-empty.png"
          imageAlt="Empty cart"
          title="Seu carrinho está vazio"
          description="Adicione alguns produtos para começar!"
          action={{
            label: 'Começar a comprar',
            href: '/products/phones',
          }}
        />
      )}

      {!isLoading && !error && cartProducts.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8">
          <div className="flex-1">
            {cartProducts.map((product) => (
              <CartItem key={product.itemId} product={product} />
            ))}
          </div>

          <CartSummary
            totalPrice={totalPrice}
            itemCount={cartCount}
            onCheckout={() => setIsModalOpen(true)}
            checkoutButtonRef={checkoutButtonRef}
          />
        </div>
      )}

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleCheckout}
        totalPrice={totalPrice}
        itemCount={cartCount}
        returnFocusRef={checkoutButtonRef}
      />
    </div>
  );
}
