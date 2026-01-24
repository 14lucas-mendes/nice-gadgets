'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_FILTERS } from '@/constants/catalog';
import type { SortOption, PerPageOption, CatalogState } from '@/types/catalog';

export function useCatalogFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse initial state from URL
  const getInitialState = useCallback((): CatalogState => {
    const sort = (searchParams.get('sort') as SortOption) || DEFAULT_FILTERS.sort;
    const perPage = (searchParams.get('perPage') as PerPageOption) || DEFAULT_FILTERS.perPage;
    const page = parseInt(searchParams.get('page') || '1');

    return {
      sortBy: sort,
      perPage,
      currentPage: isNaN(page) || page < 1 ? 1 : page,
    };
  }, [searchParams]);

  const [state, setState] = useState<CatalogState>(getInitialState);

  // Sync state with URL
  useEffect(() => {
    setState(getInitialState());
  }, [searchParams, getInitialState]);

  // Update URL
  const updateURL = useCallback(
    (updates: Partial<CatalogState>, options?: { scroll?: boolean }) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // Update sort
      if (updates.sortBy !== undefined) {
        if (updates.sortBy === DEFAULT_FILTERS.sort) {
          current.delete('sort');
        } else {
          current.set('sort', updates.sortBy);
        }
      }

      // Update perPage
      if (updates.perPage !== undefined) {
        if (updates.perPage === DEFAULT_FILTERS.perPage) {
          current.delete('perPage');
        } else {
          current.set('perPage', updates.perPage);
        }
      }

      // Update page
      if (updates.currentPage !== undefined) {
        if (updates.currentPage === 1) {
          current.delete('page');
        } else {
          current.set('page', updates.currentPage.toString());
        }
      }

      const search = current.toString();
      const query = search ? `?${search}` : '';
      const newUrl = `${pathname}${query}`;

      router.push(newUrl, { scroll: options?.scroll ?? true });
    },
    [searchParams, pathname, router],
  );

  // Handlers
  const handleSortChange = useCallback(
    (sortBy: SortOption) => {
      updateURL({ sortBy, currentPage: 1 }, { scroll: false });
    },
    [updateURL],
  );

  const handlePerPageChange = useCallback(
    (perPage: PerPageOption) => {
      updateURL({ perPage, currentPage: 1 }, { scroll: false });
    },
    [updateURL],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ currentPage: page }, { scroll: true });
    },
    [updateURL],
  );

  return {
    ...state,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
  };
}
