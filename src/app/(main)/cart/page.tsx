'use client';

import { useEffect, useState } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { getProductsByItemIds } from '@/utils/products';
import { Product } from '@/types/Product';
import { HeadingCard } from '@/components/HeadingCard';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CardItem from '@/context';

export default function CartPage() {
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
        <Link href="/">
          <HomeOutlinedIcon />
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-[#B4BDC3]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <h3 className="font-semibold text-[14px] text-[#89939A]">Cart</h3>
      </div>

      <HeadingCard as="h1">Cart</HeadingCard>

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
