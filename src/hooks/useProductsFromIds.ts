'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/types/product-temp';
import { getProductsByItemIds } from '@/lib/product-queries';

export function useProductsFromIds(itemIds: string[]) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      if (itemIds.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const fetchedProducts = await getProductsByItemIds(itemIds);
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [itemIds.join(',')]); // Dependency array com string para evitar re-renders

  return { products, isLoading, error };
}
