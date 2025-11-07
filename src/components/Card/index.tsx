'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartFavorite } from '@/context/CartFavoriteContext';

type CardProps = {
  product: {
  image: string;
  name: string;
  price: number,
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string,
  itemId: string,
  category: string
  }
  
}

export default function Card({product}: CardProps) {
  
  const {image, category, itemId, name, price, fullPrice, screen, capacity, ram} = product;

  const router = useRouter();
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } = useCartFavorite();

  const navigateToProduct = () => {
    router.push(`/products/${category}/${itemId}`);
  }

  const handleToggleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart(itemId)) {
      removeFromCart(itemId);
    } else {
      addToCart(itemId);
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(itemId);
  }

  return (
   <div className='flex flex-col'>
        <div className="w-[272px] h-[506px] bg-white rounded-lg border border-slate-400 shadow-md">
          <div className='px-8 py-8 flex flex-col gap-2'>
            <div className='w-[208px] h-[196px] flex
            md:hover:scale-105 md:transition-transform md:duration-300 md:ease-in-out
            '>
             <Image
                  src={`/${image}`}
                  alt="Category Accessories"
                  width={208}
                  height={196}
                  className='object-contain cursor-pointer'
                  onClick={() => navigateToProduct()}
                />
            </div>
            <div className='w-[208px] h-[58px]'>
              <p className='font-semibold text-[14px] mt-4 line-clamp-2 text-[#0F0F11]'>{name}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className='font-extrabold text-[22px] text-[#0F0F11]'>{`R$${price}`}</p>
              <p className='font-medium text-[22px] text-[#89939A] line-through'>{`R$${fullPrice}`}</p>
            </div>
            <hr />
            <div className='font-semibold text-[14px] text-[#89939A] mt-2'>
              <div className='flex flex-row justify-between'>
                 <p>Screen</p>
                 <p className='font-bold text-[#0F0F11]'>{screen}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p>Capacity</p>
                <p className='font-bold text-[#0F0F11]'>{capacity}</p>
              </div>
              <div className='flex flex-row justify-between'>
                <p>RAM</p>
                <p className='font-bold text-[#0F0F11]'>{ram}</p>
              </div>
            </div>
            <div className='flex flex-row gap-2 font-bold text-[14px] mt-4'>
              <button 
                onClick={handleToggleCart}
                className={`w-[160px] h-[40px] rounded-[8px] cursor-pointer transition-colors ${
                  isInCart(itemId)
                    ? 'bg-slate-200 text-blue-600 border border-blue-500'
                    : 'bg-blue-500 hover:bg-blue-700 text-white'
                }`}
              >
                {isInCart(itemId) ? 'Added' : 'Add to cart'}
              </button>
              <button 
                onClick={handleToggleFavorite}
                className={`flex justify-center items-center rounded-full border w-10 h-10 ${
                  isFavorite(itemId) 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-400'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill={isFavorite(itemId) ? "currentColor" : "none"} 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className={`size-6 ${isFavorite(itemId) ? 'text-red-500' : 'text-[#0F0F11]'}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
   </div>  
  )
}