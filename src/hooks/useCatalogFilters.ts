'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { DEFAULT_FILTERS } from '@/constants/catalog';
import {
  parsePage,
  parsePerPageOption,
  parseSortOption,
} from '@/lib/catalog-filters';
import type { CatalogState, PerPageOption, SortOption } from '@/types/catalog';

export function useCatalogFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const search = searchParams.toString();

  const state = useMemo<CatalogState>(
    () => ({
      sortBy: parseSortOption(searchParams.get('sort')),
      perPage: parsePerPageOption(searchParams.get('perPage')),
      currentPage: parsePage(searchParams.get('page')),
    }),
    [searchParams],
  );

  const updateURL = useCallback(
    (
      updates: Partial<CatalogState>,
      options?: { replace?: boolean; scroll?: boolean },
    ) => {
      const current = new URLSearchParams(search);

      if (updates.sortBy !== undefined) {
        if (updates.sortBy === DEFAULT_FILTERS.sort) {
          current.delete('sort');
        } else {
          current.set('sort', updates.sortBy);
        }
      }

      if (updates.perPage !== undefined) {
        if (updates.perPage === DEFAULT_FILTERS.perPage) {
          current.delete('perPage');
        } else {
          current.set('perPage', updates.perPage);
        }
      }

      if (updates.currentPage !== undefined) {
        if (updates.currentPage === 1) {
          current.delete('page');
        } else {
          current.set('page', updates.currentPage.toString());
        }
      }

      const query = current.toString();
      const destination = pathname + (query ? '?' + query : '');
      const navigation = options?.replace ? router.replace : router.push;

      navigation(destination, {
        scroll: options?.scroll ?? true,
      });
    },
    [pathname, router, search],
  );

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

  const replacePage = useCallback(
    (page: number) => {
      updateURL({ currentPage: page }, { replace: true, scroll: false });
    },
    [updateURL],
  );

  return {
    ...state,
    handleSortChange,
    handlePerPageChange,
    handlePageChange,
    replacePage,
  };
}
