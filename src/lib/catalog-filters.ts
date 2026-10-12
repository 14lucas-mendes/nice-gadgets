export const SORT_VALUES = ['newest', 'alphabetically', 'cheapest'] as const;
export type SortOption = (typeof SORT_VALUES)[number];

export const PER_PAGE_VALUES = ['4', '8', '16', 'all'] as const;
export type PerPageOption = (typeof PER_PAGE_VALUES)[number];

function isAllowedValue<T extends string>(
  value: string | null | undefined,
  allowedValues: readonly T[],
): value is T {
  return value !== null && value !== undefined && allowedValues.includes(value as T);
}

function parsePositiveInteger(value: string | null | undefined): number | null {
  if (value === null || value === undefined || !/^\d+$/.test(value)) {
    return null;
  }

  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}

export function parseSortOption(value: string | null | undefined): SortOption {
  return isAllowedValue(value, SORT_VALUES) ? value : 'newest';
}

export function parsePerPageOption(value: string | null | undefined): PerPageOption {
  return isAllowedValue(value, PER_PAGE_VALUES) ? value : 'all';
}

export function parsePage(value: string | null | undefined): number {
  return parsePositiveInteger(value) ?? 1;
}

export function parsePageSize(
  value: string | null | undefined,
  fallback = 10,
  max = 100,
): number {
  return Math.min(parsePositiveInteger(value) ?? fallback, max);
}

export function normalizePage(page: number, totalPages: number): number {
  const lastPage = Math.max(1, Math.floor(totalPages));
  return Math.min(Math.max(1, Math.floor(page)), lastPage);
}
