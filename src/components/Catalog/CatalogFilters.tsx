'use client';

import FilterBar from '@/components/FilterBar/index';
import { SORT_OPTIONS, PER_PAGE_OPTIONS } from '@/constants/catalog';
import type { SortOption, PerPageOption } from '@/types/catalog';

interface CatalogFiltersProps {
  sortBy: SortOption;
  perPage: PerPageOption;
  onSortChange: (value: SortOption) => void;
  onPerPageChange: (value: PerPageOption) => void;
}

export function CatalogFilters({
  sortBy,
  perPage,
  onSortChange,
  onPerPageChange,
}: CatalogFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
      <FilterBar
        label="Sort By"
        title="Sort By"
        items={SORT_OPTIONS}
        value={sortBy}
        setValue={onSortChange as (value: string) => void}
      />
      <FilterBar
        label="Items on page"
        title="Items on page"
        items={PER_PAGE_OPTIONS}
        value={perPage}
        setValue={onPerPageChange as (value: string) => void}
      />
    </div>
  );
}
