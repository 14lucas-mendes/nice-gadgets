import { ProductDetails } from '@/types/ProductDetails';
import { Product } from '@/types/product';

import phonesData from '@/data/phones.json';
import tabletsData from '@/data/tablets.json';
import accessoriesData from '@/data/accessories.json';

const allProducts = [
  ...phonesData,
  ...tabletsData,
  ...accessoriesData,
] as unknown as ProductDetails[];

const mapDetailToSummary = (detail: ProductDetails): Product => {
  const detailData = detail as ProductDetails & { year?: number };

  return {
    ...detail,

    itemId: detail.id,
    fullPrice: detail.priceRegular,
    price: detail.priceDiscount,

    image: detail.images[0] || '',

    year: detailData.year || 2023,
  } as unknown as Product;
};

export async function getProductById(productId: string): Promise<ProductDetails | null> {
  const product = allProducts.find((p) => p.id === productId || p.namespaceId === productId);
  return product || null;
}

export async function getAllProducts(): Promise<Product[]> {
  return allProducts.map(mapDetailToSummary);
}

export async function getProductsByItemIds(itemIds: string[]): Promise<Product[]> {
  const filtered = allProducts.filter((product) => itemIds.includes(product.id));
  return filtered.map(mapDetailToSummary);
}

export async function getTop10Products(): Promise<Product[]> {
  const products = allProducts.map(mapDetailToSummary);
  return products.sort((a, b) => b.price - a.price).slice(0, 10);
}

export async function getTopYearProducts(): Promise<Product[]> {
  const products = allProducts.map(mapDetailToSummary);
  return products.sort((a, b) => b.year - a.year).slice(0, 10);
}

export async function getAllPhonesProducts(): Promise<Product[]> {
  return allProducts
    .filter((p) => p.category === 'phones')
    .map(mapDetailToSummary)
    .sort((a, b) => b.price - a.price)
    .slice(0, 120);
}

export async function getAllTabletsProducts(): Promise<Product[]> {
  return allProducts
    .filter((p) => p.category === 'tablets')
    .map(mapDetailToSummary)
    .sort((a, b) => b.price - a.price)
    .slice(0, 120);
}

export async function getAllAccessoriesProducts(): Promise<Product[]> {
  return allProducts
    .filter((p) => p.category === 'accessories')
    .map(mapDetailToSummary)
    .sort((a, b) => b.price - a.price)
    .slice(0, 120);
}
