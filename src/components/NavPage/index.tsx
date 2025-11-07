'use client';

import Link from "next/link";
import { HeadingCard } from "../HeadingCard";
import ItemSelect from "../Select";
import { Product } from "@/types/Product";
import Card from "../Card";
import { useState } from "react";
import PaginationCard from "../Pagination";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

type NavPageProps = {
    products: Product[]
    page: string;
    title: string;
    description: string;
}

export default function NavPage({products, page, title, description }: NavPageProps) {
    const [sortBy, setSortBy] = useState('Newest');
    const [perPage, setPerPage] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
 

    // Mantem a lógica de ordenação
    const sortHandlerProducts = [...products].sort((a, b) => {
        if (sortBy === 'Newest') {
            return b.year - a.year; // Adiciona ordenação por ano
        } else if (sortBy === 'Alphabetically') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'Cheapest') {
            return a.price - b.price;
        }
        return 0;
    });

    // Nova função de paginação simplificada
    const getPaginatedProducts = () => {
        if (perPage === 'All') {
            return sortHandlerProducts;
        }

        const itemsPerPage = parseInt(perPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return sortHandlerProducts.slice(startIndex, endIndex);
    };

    const paginatedProducts = getPaginatedProducts();
    const totalPages = perPage === 'All' ? 1 : Math.ceil(products.length / parseInt(perPage));


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
    <div className="max-w-6xl mx-auto pt-6">
            <div className="flex items-center gap-2">
                <Link href="/">
                    <HomeOutlinedIcon />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 mt-8">
                {paginatedProducts.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>

            {perPage !== 'All' && (
                <PaginationCard
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(event, value) => setCurrentPage(value)}
                />
            )}
    </div>
    
    
    </>
  );
}

