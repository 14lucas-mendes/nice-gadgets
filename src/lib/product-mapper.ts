import type { Product } from '@/types/product-temp';
import type { ProductDetail } from '@/types/product-details';

function getCatalogMetadata(detail: ProductDetail): { id: number; year: number } {
  const { catalogId, year } = detail;

  if (
    typeof catalogId !== 'number' ||
    !Number.isInteger(catalogId) ||
    typeof year !== 'number' ||
    !Number.isInteger(year)
  ) {
    throw new Error(`Product "${detail.id}" is missing validated catalog metadata`);
  }

  return { id: catalogId, year };
}

export function mapDetailToSummary(detail: ProductDetail): Product {
  const metadata = getCatalogMetadata(detail);

  return {
    id: metadata.id,
    itemId: detail.id,
    category: detail.category,
    fullPrice: detail.priceRegular,
    price: detail.priceDiscount,
    name: detail.name,
    color: detail.color,
    capacity: detail.capacity,
    screen: detail.screen,
    ram: detail.ram,
    image: detail.images[0] || '',
    year: metadata.year,
  };
}

export function mapDetailsToSummaries(details: ProductDetail[]): Product[] {
  return details.map(mapDetailToSummary);
}
