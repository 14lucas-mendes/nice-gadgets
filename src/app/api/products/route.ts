import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/types/product-temp';
import { PRODUCT_LIMITS } from '@/constants/products';
import { getAllProducts } from '@/lib/product-queries';
import { parsePage, parsePageSize } from '@/lib/catalog-filters';
import { sortProducts, SortOption } from '@/lib/product-sorting';

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

function parseApiSortOption(value: string | null): SortOption {
  return value && Object.values(SortOption).includes(value as SortOption)
    ? (value as SortOption)
    : SortOption.YEAR_DESC;
}

export async function GET(req: NextRequest): Promise<NextResponse<ProductsResponse>> {
  const searchParams = req.nextUrl.searchParams;
  const page = parsePage(searchParams.get('page'));
  const pageSize = parsePageSize(
    searchParams.get('pageSize'),
    PRODUCT_LIMITS.DEFAULT_PAGE_SIZE,
    100,
  );
  const category = searchParams.get('category');
  const idsParam = searchParams.get('ids');
  const itemIds = idsParam === null ? null : new Set(idsParam.split(',').filter(Boolean));
  const sortBy = parseApiSortOption(searchParams.get('sortBy'));

  const allProducts = await getAllProducts();
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      !category || product.category.toLowerCase() === category.toLowerCase();
    const matchesIds = itemIds === null || itemIds.has(product.itemId);
    return matchesCategory && matchesIds;
  });
  const sortedProducts = sortProducts(filteredProducts, sortBy);
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);
  const total = sortedProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return NextResponse.json({
    products: paginatedProducts,
    total,
    page,
    pageSize,
    totalPages,
    hasMore: page < totalPages,
  });
}
