'use client';

import { useEffect, useState } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { getProductsByItemIds } from '@/utils/products';
import { Product } from '@/types/Product';
import CardItem from '@/context';
import PageHeader from '@/components/PageHeader';

type NavPageProps = {
  products: Product[]
  page: string;
  title: string;
  description: string;
}

export default function CartPage({ page, title, description }: NavPageProps) {
  const { cartItems, cartCount } = useCartFavorite();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-16">
      <div className="flex items-center gap-2 mb-10">
      <PageHeader page={'Cart'} title={title} description={description} />
      </div>

      <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F0F11]'>Cart</h1>

      {isLoading ? (
        <p className="mt-8">Loading cart items...</p>
      ) : cartProducts.length === 0 ? (
        <p className="mt-8 text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="flex-grow">
            {cartProducts.map((product) => (
              <CardItem key={product.itemId} product={product} />
            ))}
          </div>

          <div className="lg:w-96">
            <div className="border border-gray-300 rounded-lg p-6 flex flex-col items-center">
              <p className="font-extrabold text-4xl text-[#0F0F11]">{`R$${totalPrice}`}</p>
              <p className="text-gray-500 mt-2">Total for {cartCount} items</p>
              <hr className="w-full my-6 border-gray-300" />
              <button className="w-full h-12 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
