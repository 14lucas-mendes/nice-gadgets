'use client';

import { Product } from '@/types/Product';

import { useState, useEffect, useRef } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from './ProductCard_TEMP';
import FilterBar from './FilterBar';
import ProductPagination from './ProductPagination';
import PageHeader from './PageHeader';

type NavPageProps = {
  products: Product[];
  page: string;
  title: string;
  description: string;
};

export default function PageNavigation({ products, page, title, description }: NavPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const shouldPreventScroll = useRef(false);
  const scrollPosition = useRef(0);

  // Função para atualizar a URL com os parâmetros
  const updateURL = (
    params: { sort?: string | null; perPage?: string | null; page?: string | null },
    preventScroll: boolean = false,
  ) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

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

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = searchParams.get('page');

  const [sortBy, setSortBy] = useState(() => getSortByFromURL(sortParam));
  const [perPage, setPerPage] = useState(() => perPageParam || 'All');
  const [currentPage, setCurrentPage] = useState(() => {
    const page = pageParam ? parseInt(pageParam) : 1;
    return isNaN(page) || page < 1 ? 1 : page;
  });

  useEffect(() => {
    const sortParam = searchParams.get('sort');
    const perPageParam = searchParams.get('perPage');
    const pageParam = searchParams.get('page');

    setSortBy(getSortByFromURL(sortParam));
    setPerPage(perPageParam || 'All');
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(isNaN(page) || page < 1 ? 1 : page);

    if (shouldPreventScroll.current) {
      const targetScroll = scrollPosition.current;
      shouldPreventScroll.current = false;

      const restoreScroll = () => {
        window.scrollTo({
          top: targetScroll,
          behavior: 'auto',
        });
      };

      restoreScroll();
      requestAnimationFrame(restoreScroll);
      requestAnimationFrame(() => {
        requestAnimationFrame(restoreScroll);
      });

      setTimeout(restoreScroll, 0);
      setTimeout(restoreScroll, 10);
      setTimeout(restoreScroll, 50);
    }
  }, [searchParams]);

  const sortHandlerProducts = [...products].sort((a, b) => {
    if (sortBy === 'Newest') {
      return b.year - a.year;
    } else if (sortBy === 'Alphabetically') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'Cheapest') {
      return a.price - b.price;
    }
    return 0;
  });

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
  const totalPages =
    perPage === 'All' ? 1 : Math.ceil(sortHandlerProducts.length / parseInt(perPage));

  const handleSortChange = (value: string) => {
    const sortURL = getSortURLFromValue(value);
    updateURL({ sort: sortURL || null, page: null });
  };

  const handlePerPageChange = (value: string) => {
    const perPageValue = value === 'All' ? null : value;
    updateURL({ perPage: perPageValue, page: null });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    updateURL({ page: value === 1 ? null : value.toString() }, true);
  };

  const sortItems = [
    {
      label: 'Newest',
      value: 'Newest',
    },
    {
      label: 'Alphabetically',
      value: 'Alphabetically',
    },
    {
      label: 'Cheapest',
      value: 'Cheapest',
    },
  ];

  const perPageItems = [
    {
      label: '4',
      value: '4',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '16',
      value: '16',
    },
    {
      label: 'All',
      value: 'All',
    },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto pt-6">
        <PageHeader page={page} title={title} description={description} />
        <div className="flex items-center gap-4 mt-10">
          <div>
            <FilterBar
              label="Sort By"
              items={sortItems}
              title="Sort By"
              value={sortBy}
              setValue={handleSortChange}
            />
          </div>
          <div>
            <FilterBar
              label="Items Select"
              items={perPageItems}
              title="Items on page"
              value={perPage}
              setValue={handlePerPageChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-10 mt-8">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="grid" />
          ))}
        </div>

        {perPage !== 'All' && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
