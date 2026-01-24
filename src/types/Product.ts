export interface Product {
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  itemId: string;
  category: string;
}

export type ProductCardVariant = 'default' | 'compact' | 'grid';
