import type { Product } from '@/types/product-temp';
import type { ProductDetail } from '@/types/product-details';

// Campos que precisam de default se não existirem
interface ProductDetailWithYear extends ProductDetail {
  year?: number;
}

export function mapDetailToSummary(detail: ProductDetail): Product {
  const detailWithYear = detail as ProductDetailWithYear;

  return {
    // IDs
    id: parseInt(detail.id) || 0, // Se id não for número, usa 0
    itemId: detail.id,
    category: detail.category,

    // Preços
    fullPrice: detail.priceRegular,
    price: detail.priceDiscount,

    // Básico
    name: detail.name,
    color: detail.color,
    capacity: detail.capacity,
    screen: detail.screen,
    ram: detail.ram,

    // Imagem principal
    image: detail.images[0] || '',

    // Year com fallback
    year: detailWithYear.year || 2023,
  };
}

export function mapDetailsToSummaries(details: ProductDetail[]): Product[] {
  return details.map(mapDetailToSummary);
}
