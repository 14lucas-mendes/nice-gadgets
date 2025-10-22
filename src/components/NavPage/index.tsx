'use client';

import Link from "next/link";
import { HeadingCard } from "../HeadingCard";
import ItemSelect from "../Select";
import { Product } from "@/types/Product";
import Card from "../Card";
import { useState } from "react";

type NavPageProps = {
    products: Product[]
    page: string;
    title: string;
    description: string;
}

export default function NavPage({products, page, title, description }: NavPageProps) {
    const [sortBy, setSortBy] = useState('Newest');
    const [perPage, setPerPage] = useState('All');

    const sortHandlerProducts = [...products].sort((a, b) => {
        if (sortBy === 'Newest') {
            return 0; 
        } else if (sortBy === 'Alphabetically') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'Cheapest') {
            return a.price - b.price;
        }
        return 0;
    });

    const paginatedProducts = perPage === 'All' ? sortHandlerProducts : sortHandlerProducts.slice(0, parseInt(perPage));

    const sortItems = [{
        label: 'Newest',
        value: 'Newest'
    },
    {
        label: 'Alphabetically', 
        value: 'Alphabetically'
    },
    {
        label: 'Cheapest', 
        value: 'Cheapest'
    },
    

    ];

    const perPageItems = [{
        label: '4',
        value: '4'
    },
    {
        label: '8', 
        value: '8'
    }, 
    {
        label: '16', 
        value: '16'
    },
    {
        label: 'All', 
        value: 'All'
    }
]

  return (
    <>
    <div className="max-w-7xl mx-auto pt-6">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#B4BDC3]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <h3 className="font-semibold text-[14px] text-[#89939A]">{page}</h3>
                </div>
            </div>
            <div className="mt-10">
                <HeadingCard as="h1">{title}</HeadingCard>
                <p className="font-semibold text-[14px] text-[#89939A] mt-2">{description}</p>
            </div>
            <div className="flex items-center gap-4 mt-10">
                <div>
                    <ItemSelect
                    items={sortItems}
                    title="Sort By"
                    value={sortBy}
                    setValue={setSortBy}
                    />
                </div>
                <div>
                   <ItemSelect 
                    items={perPageItems}
                    title="Items on page"
                    value={perPage}
                    setValue={setPerPage}
                   />
                </div>
            </div>
    </div>
    <div className="grid grid-cols-4 mt-6 gap-4 gap-y-8 overflow-hidden">
        {paginatedProducts.map(product => (
            <div key={product.id} 
            className="">
            <Card 
            product={product}
            />
            </div>
        ))}
    </div>
    </>
  );
}

