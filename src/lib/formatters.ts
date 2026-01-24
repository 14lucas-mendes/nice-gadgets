export const formatCurrency = (value: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
};

export const formatProductUrl = (category: string, itemId: string): string => {
  return `/products/${category}/${itemId}`;
};

export const calculateDiscount = (price: number, fullPrice: number): number => {
  if (fullPrice <= 0) return 0;
  return Math.round(((fullPrice - price) / fullPrice) * 100);
};
