'use client';

import { useMemo, useState } from 'react';
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

  // Get product IDs from cart
  const itemIds = useMemo(() => Array.from(cartItems.keys()), [cartItems]);

  // Fetch products
  const { products: cartProducts, isLoading, error } = useProductsFromIds(itemIds);

  // Calculate total
  const totalPrice = useMemo(() => {
    return cartProducts.reduce((total, product) => {
      const quantity = cartItems.get(product.itemId) || 0;
      return total + product.price * quantity;
    }, 0);
  }, [cartProducts, cartItems]);

  const handleCheckout = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <PageHeader
        page="Cart"
        title="Shopping Cart"
        description={
          cartCount > 0
            ? `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your cart`
            : 'Your cart is empty'
        }
      />

      {/* Loading State */}
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

      {/* Error State */}
      {error && (
        <div className="mt-8 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">
            Error loading cart items: {error.message}
          </p>
        </div>
      )}

      {/* Empty State */}
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

      {/* Cart with Items */}
      {!isLoading && !error && cartProducts.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8">
          {/* Items List */}
          <div className="flex-1">
            {cartProducts.map((product) => (
              <CartItem key={product.itemId} product={product} />
            ))}
          </div>

          {/* Summary */}
          <CartSummary
            totalPrice={totalPrice}
            itemCount={cartCount}
            onCheckout={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCheckout}
        totalPrice={totalPrice}
        itemCount={cartCount}
      />
    </div>
  );
}
