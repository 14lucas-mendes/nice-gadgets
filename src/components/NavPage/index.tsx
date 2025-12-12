'use client';

import Link from "next/link";
import ItemSelect from "../Select";
import { Product } from "@/types/Product";
import ProductCard from "../productCard";
import { useState, useEffect, useRef } from "react";
import PaginationCard from "../Pagination";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type NavPageProps = {
    products: Product[]
    page: string;
    title: string;
    description: string;
}

export default function NavPage({products, page, title, description }: NavPageProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Ref para controlar se devemos prevenir scroll
    const shouldPreventScroll = useRef(false);
    const scrollPosition = useRef(0);

    // Função para atualizar a URL com os parâmetros
    const updateURL = (params: { sort?: string | null; perPage?: string | null; page?: string | null }, preventScroll: boolean = false) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        
        // Atualizar ou remover sort
        if (params.sort !== undefined) {
            if (params.sort && params.sort !== '') {
                current.set('sort', params.sort);
            } else {
                current.delete('sort');
            }
        }
        
        // Atualizar ou remover perPage
        if (params.perPage !== undefined) {
            if (params.perPage && params.perPage !== '') {
                current.set('perPage', params.perPage);
            } else {
                current.delete('perPage');
            }
        }
        
        // Atualizar ou remover page
        if (params.page !== undefined) {
            if (params.page && params.page !== '') {
                current.set('page', params.page);
            } else {
                current.delete('page');
            }
        }
        
        const search = current.toString();
        const query = search ? `?${search}` : '';
        const newUrl = `${pathname}${query}`;
        
        if (preventScroll) {
            // Salvar a posição do scroll e marcar para prevenir scroll
            scrollPosition.current = window.scrollY;
            shouldPreventScroll.current = true;
        }
        
        router.push(newUrl);
    };

    // Função para mapear valores da URL para os valores do select
    const getSortByFromURL = (sortParam: string | null): string => {
        if (sortParam === 'name') return 'Alphabetically';
        if (sortParam === 'price') return 'Cheapest';
        return 'Newest';
    };

    // Função para mapear valores do select para a URL
    const getSortURLFromValue = (value: string): string => {
        if (value === 'Alphabetically') return 'name';
        if (value === 'Cheapest') return 'price';
        return '';
    };

    // Ler valores iniciais da URL
    const sortParam = searchParams.get('sort');
    const perPageParam = searchParams.get('perPage');
    const pageParam = searchParams.get('page');

    const [sortBy, setSortBy] = useState(() => getSortByFromURL(sortParam));
    const [perPage, setPerPage] = useState(() => perPageParam || 'All');
    const [currentPage, setCurrentPage] = useState(() => {
        const page = pageParam ? parseInt(pageParam) : 1;
        return isNaN(page) || page < 1 ? 1 : page;
    });

    // Sincronizar estados com a URL quando ela mudar (navegação do navegador)
    useEffect(() => {
        const sortParam = searchParams.get('sort');
        const perPageParam = searchParams.get('perPage');
        const pageParam = searchParams.get('page');
        
        setSortBy(getSortByFromURL(sortParam));
        setPerPage(perPageParam || 'All');
        const page = pageParam ? parseInt(pageParam) : 1;
        setCurrentPage(isNaN(page) || page < 1 ? 1 : page);
        
        // Se devemos prevenir scroll, restaurar a posição após a renderização
        if (shouldPreventScroll.current) {
            const targetScroll = scrollPosition.current;
            shouldPreventScroll.current = false;
            
            // Restaurar a posição do scroll em múltiplos momentos para garantir
            // que seja mantida mesmo se o Next.js tentar fazer scroll automático
            const restoreScroll = () => {
                window.scrollTo({
                    top: targetScroll,
                    behavior: 'auto'
                });
            };
            
            // Restaurar imediatamente e em múltiplos frames
            restoreScroll();
            requestAnimationFrame(restoreScroll);
            requestAnimationFrame(() => {
                requestAnimationFrame(restoreScroll);
            });
            
            // Também restaurar após um pequeno delay para garantir
            setTimeout(restoreScroll, 0);
            setTimeout(restoreScroll, 10);
            setTimeout(restoreScroll, 50);
        }
    }, [searchParams]);
 

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
    const totalPages = perPage === 'All' ? 1 : Math.ceil(sortHandlerProducts.length / parseInt(perPage));


    // Handlers para atualizar estado e URL
    const handleSortChange = (value: string) => {
        const sortURL = getSortURLFromValue(value);
        // Resetar página para 1 quando mudar sort (remover page da URL se for 1)
        updateURL({ sort: sortURL || null, page: null });
    };

    const handlePerPageChange = (value: string) => {
        const perPageValue = value === 'All' ? null : value;
        // Resetar página para 1 quando mudar perPage (remover page da URL se for 1)
        updateURL({ perPage: perPageValue, page: null });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // Se a página for 1, remover o parâmetro page da URL
        // Usar preventScroll=true para evitar que a página role para baixo
        updateURL({ page: value === 1 ? null : value.toString() }, true);
    };

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
                <h1>{title}</h1>
                <p className="font-semibold text-[14px] text-[#89939A] mt-2">{description}</p>
            </div>
            <div className="flex items-center gap-4 mt-10">
                <div>
                    <ItemSelect
                    items={sortItems}
                    title="Sort By"
                    value={sortBy}
                    setValue={handleSortChange}
                    />
                </div>
                <div>
                   <ItemSelect 
                    items={perPageItems}
                    title="Items on page"
                    value={perPage}
                    setValue={handlePerPageChange}
                   />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 mt-8">
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {perPage !== 'All' && (
                <PaginationCard
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
    </div>
    
    
    </>
  );
}

