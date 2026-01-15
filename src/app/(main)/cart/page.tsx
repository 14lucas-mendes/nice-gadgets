'use client';

import { useEffect, useState } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { getProductsByItemIds } from '@/utils/products';
import { Product } from '@/types/Product';
import CardItem from '@/context';
import PageHeader from '@/components/PageHeader';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, cartCount, clearCart } = useCartFavorite();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartProducts = async () => {
      setIsLoading(true);
      const itemIds = Array.from(cartItems.keys());
      if (itemIds.length > 0) {
        const products = await getProductsByItemIds(itemIds);
        setCartProducts(products);
      } else {
        setCartProducts([]);
      }
      setIsLoading(false);
    };

    fetchCartProducts();
  }, [cartItems]);

  const totalPrice = cartProducts.reduce((total, product) => {
    const quantity = cartItems.get(product.itemId) || 0;
    return total + product.price * quantity;
  }, 0);

  const handleCheckout = () => {
    // Simulação fictícia: limpar o carrinho
    clearCart();
    setIsModalOpen(false);
    // Aqui poderia adicionar uma mensagem de sucesso ou redirecionar
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto pt-2">
      <div className="flex items-center gap-2">
        <PageHeader
          page={'Cart'}
          title={'Your Cart'}
          description={'Review and manage your selected items'}
        />
      </div>

      {isLoading ? (
        <p className="mt-8 text-[var(--text-primary)]">Loading cart items...</p>
      ) : cartProducts.length === 0 ? (
        <div className="flex justify-center items-center mt-8">
          <div className="relative w-120 h-120">
            <Image
              src="/img/layout/cart-is-empty.png"
              alt="Cart is empty"
              fill
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-grow">
            {cartProducts.map((product) => (
              <CardItem key={product.itemId} product={product} />
            ))}
          </div>

          <div className="lg:w-96">
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center">
              <p className="font-extrabold text-4xl text-[var(--text-primary)]">{`R$${totalPrice}`}</p>
              <p className="text-[var(--text-muted)] mt-2">Total for {cartCount} items</p>
              <hr className="w-full my-6 border-gray-300" />
              <button
                className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Confirmar Compra
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Você está prestes a finalizar a compra de {cartCount} itens no valor de R${totalPrice}
              . Esta é uma simulação fictícia.
            </p>
            <div className="flex gap-4">
              <button
                className="flex-1 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="flex-1 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                onClick={handleCheckout}
              >
                Concluir Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
