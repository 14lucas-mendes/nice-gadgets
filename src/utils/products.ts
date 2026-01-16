import { ProductDetails } from '@/types/ProductDetails';
import { Product } from '@/types/Product';

import phonesData from '@/data/phones.json';
import tabletsData from '@/data/tablets.json';
import accessoriesData from '@/data/accessories.json';

// 1. Carrega todos os dados detalhados
const allProducts = [
  ...phonesData,
  ...tabletsData,
  ...accessoriesData,
] as unknown as ProductDetails[];

// 2. FUNÇÃO ADAPTADORA (A Mágica acontece aqui)
// Transforma os detalhes do JSON no formato resumido que os Cards esperam
const mapDetailToSummary = (detail: ProductDetails): Product => {
  return {
    // Copia propriedades comuns (name, category, screen, etc.)
    ...detail,

    // Mapeia os campos com nomes diferentes
    itemId: detail.id, // Product usa itemId, JSON usa id
    fullPrice: detail.priceRegular, // Product usa fullPrice, JSON usa priceRegular
    price: detail.priceDiscount, // Product usa price, JSON usa priceDiscount

    // Transforma o array de imagens na string única que o Card espera
    image: detail.images[0] || '',

    // Resolve o problema do 'year' (caso não exista no JSON, define um padrão)
    year: (detail as any).year || 2023,
  } as unknown as Product;
};

// --- FUNÇÕES EXPORTADAS ---

export async function getProductById(productId: string): Promise<ProductDetails | null> {
  const product = allProducts.find((p) => p.id === productId || p.namespaceId === productId);
  return product || null;
}

// Agora usamos o .map(mapDetailToSummary) para corrigir o tipo de retorno

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

// Para as categorias, filtramos primeiro e convertemos depois
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
