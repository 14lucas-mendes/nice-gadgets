import { NextRequest, NextResponse } from 'next/server';
import type { Product } from '@/types/product';
import { getAllProducts } from '@/lib/product-queries';
import { sortProducts, SortOption } from '@/lib/product-sorting';

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export async function GET(req: NextRequest): Promise<NextResponse<ProductsResponse>> {
  const searchParams = req.nextUrl.searchParams;

  // Paginação
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const pageSize = Math.max(1, Math.min(100, Number(searchParams.get('pageSize')) || 10));

  // Filtros
  const category = searchParams.get('category');
  const sortBy = (searchParams.get('sortBy') as SortOption) || SortOption.YEAR_DESC;

  // Buscar produtos
  const allProducts = await getAllProducts();

  // Filtrar por categoria
  const filteredProducts = category
    ? allProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    : allProducts;

  // Ordenar
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  // Paginar
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Metadata
  const total = sortedProducts.length;
  const totalPages = Math.ceil(total / pageSize);

  return NextResponse.json({
    products: paginatedProducts,
    total,
    page,
    pageSize,
    totalPages,
    hasMore: page < totalPages,
  });
}
