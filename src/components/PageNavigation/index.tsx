'use client';

import type { Product } from '@/types/product';
import { useMemo } from 'react';
import { useCatalogFilters } from '@/hooks/useCatalogFilters';
import { sortProducts, paginateProducts, calculateTotalPages } from '@/lib/catalog-utils';
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
  const { sortBy, perPage, currentPage, handleSortChange, handlePerPageChange, handlePageChange } =
    useCatalogFilters();

  // Memoize sorted products
  const sortedProducts = useMemo(() => sortProducts(products, sortBy), [products, sortBy]);

  // Memoize paginated products
  const paginatedProducts = useMemo(
    () => paginateProducts(sortedProducts, currentPage, perPage),
    [sortedProducts, currentPage, perPage],
  );

  // Calculate total pages
  const totalPages = useMemo(
    () => calculateTotalPages(sortedProducts.length, perPage),
    [sortedProducts.length, perPage],
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(_, page) => handlePageChange(page)}
        />
      )}
    </div>
  );
}
