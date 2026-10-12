export const PRODUCT_LIMITS = {
  TOP_PRODUCTS: 10,
  DEFAULT_PAGE_SIZE: 10,
} as const;

export const CATEGORIES = ['phones', 'tablets', 'accessories'] as const;
export type ProductCategory = (typeof CATEGORIES)[number];
