'use client';

import type { Product } from '@/types/product-temp';
import { useEffect, useMemo } from 'react';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import { normalizePage } from '@/lib/catalog-filters';
import { paginateProducts, calculateTotalPages, sortProducts } from '@/lib/catalog-utils';
import PageHeader from '@/components/PageHeader/index';
import { CatalogFilters } from '@/components/Catalog/CatalogFilters';
import { CatalogGrid } from '@/components/Catalog/CatalogGrid';
import ProductPagination from '@/components/ProductPagination/index';

interface PageNavigationProps {
  products: Product[];
  page: string;
  title: string;
  description: string;
}

export default function PageNavigation({
  products,
  page,
  title,
  description,
}: PageNavigationProps) {
  const {
    sortBy,
    perPage,
    currentPage,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    replacePage,
  } = useCatalogFilters();

  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  const totalPages = useMemo(
    () => calculateTotalPages(sortedProducts.length, perPage),
    [sortedProducts.length, perPage],
  );
  const safeCurrentPage = normalizePage(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      replacePage(safeCurrentPage);
    }
  }, [currentPage, replacePage, safeCurrentPage]);

  const paginatedProducts = useMemo(
    () => paginateProducts(sortedProducts, safeCurrentPage, perPage),
    [sortedProducts, safeCurrentPage, perPage],
  );

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-14">
      <PageHeader page={page} title={title} description={description} />

      <CatalogFilters
        sortBy={sortBy}
        perPage={perPage}
        onSortChange={handleSortChange}
        onPerPageChange={handlePerPageChange}
      />

      <CatalogGrid products={paginatedProducts} />

      {perPage !== 'all' && totalPages > 1 && (
        <ProductPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
