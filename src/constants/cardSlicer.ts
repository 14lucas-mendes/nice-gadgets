export const CARD_CAROUSEL_CONFIG = {
  cardWidth: {
    mobile: 260,
    tablet: 'calc(50% - 12px)',
    desktop: 'calc(25% - 18px)',
  },
  gap: {
    mobile: 16, // 4 * 4px (gap-4)
    desktop: 24, // 6 * 4px (gap-6)
  },
  scrollBehavior: 'smooth' as ScrollBehavior,
} as const;
