import Image from 'next/image';
import Link from 'next/link';

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
  
  const {image, category, itemId, name, price, fullPrice, screen, capacity, ram} = product

  return (
   <div className='flex flex-col'>
        <div className="w-[272px] h-[506px] bg-white rounded-lg border border-slate-400 shadow-md">
          <div className='px-8 py-8 flex flex-col gap-2'>
            <div className='w-[208px] h-[196px] flex
            md:hover:scale-105 md:transition-transform md:duration-300 md:ease-in-out
            '>
             <Link href={`/${category}/${itemId}`}>
             <Image
                  src={`/${image}`}
                  alt="Category Accessories"
                  width={208}
                  height={196}
                  className='object-contain'
                />
             </Link>
            </div>
            <div className='w-[208px] h-[58px]'>
              <p className='font-semibold text-[14px] mt-4 line-clamp-2 text-[#0F0F11]'>{name}</p>
            </div>
            <div className='flex flex-row gap-2'>
              <p className='font-extrabold text-[22px] text-[#0F0F11]'>{price}</p>
              <p className='font-medium text-[22px] text-[#89939A] line-through'>{fullPrice}</p>
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
            <div className='flex flex-row gap-2 font-bold text-[14px] text-white mt-4'>
              <button className='w-[160px] h-[40px] bg-[#F86800] rounded-[8px]'>Add to cart</button>
              <Link href='/products' className="flex justify-center items-center rounded-full border border-gray-400 w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#0F0F11]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
   </div>  
  )
}