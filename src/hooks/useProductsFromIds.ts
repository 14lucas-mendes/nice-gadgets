'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/types/product-temp';

interface ProductsResponse {
  products: Product[];
  total: number;
}

export function useProductsFromIds(itemIds: string[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const itemIdsKey = itemIds.join(',');

  useEffect(() => {
    const controller = new AbortController();

    if (itemIdsKey === '') {
      setProducts([]);
      setError(null);
      setIsLoading(false);
      return () => controller.abort();
    }

    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const pageSize = 100;
        let page = 1;
        let total = 0;
        const allProducts: Product[] = [];

        do {
          const response = await fetch(
            `/api/products?ids=${encodeURIComponent(itemIdsKey)}&page=${page}&pageSize=${pageSize}`,
            { signal: controller.signal },
          );

          if (!response.ok) {
            throw new Error(`Failed to load products (${response.status})`);
          }

          const data = (await response.json()) as ProductsResponse;
          allProducts.push(...data.products);
          total = data.total;

          if (data.products.length === 0 && allProducts.length < total) {
            throw new Error('Product pagination returned no progress');
          }

          page += 1;
        } while (allProducts.length < total);

        setProducts(allProducts);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        setError(err instanceof Error ? err : new Error('Failed to load products'));
        setProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, [itemIdsKey]);

  return { products, isLoading, error };
}
