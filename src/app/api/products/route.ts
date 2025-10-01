// src/app/api/products/route.ts
import jsonProducts from '../../../../public/api/products.json';
import { NextResponse, NextRequest } from 'next/server';

enum Sorting {
  PRICE_ASC = "priceAsc",
  PRICE_DESC = "priceDesc",
  YEAR_ASC = "yearAsc",    // Ordenar por ano crescente (mais antigo → mais novo)
  YEAR_DESC = "yearDesc",  // Ordenar por ano decrescente (mais novo → mais antigo)
}

type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

const sortHandlers: Record<Sorting, (a: Product, b: Product) => number> = {
  [Sorting.PRICE_ASC]: (a: Product, b: Product) => (a.fullPrice - a.price - b.fullPrice - b.price),
  [Sorting.PRICE_DESC]: (a: Product, b: Product) => (b.fullPrice -b.price - a.fullPrice - a.price),
  [Sorting.YEAR_ASC]: (a: Product, b: Product) => (a.year - b.year),   // 2020, 2021, 2022...
  [Sorting.YEAR_DESC]: (a: Product, b: Product) => (b.year - a.year),  // 2024, 2023, 2022...
};

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  
  // Parâmetros de paginação
  const limit = Number(searchParams.get('limit')) || 10;
  const skip = Number(searchParams.get('skip')) || 0;
  
  // Parâmetro de ordenação (agora inclui year)
  const sortBy = searchParams.get('sortBy') as Sorting ?? Sorting.PRICE_ASC;
  
  // Ordenar os produtos
  const sortedProducts = [...jsonProducts].sort(sortHandlers[sortBy]);
  
  // Aplicar paginação
  const products = sortedProducts.slice(skip, skip + limit);
  
  // Retornar resultados
  return NextResponse.json({
    products,
    total: sortedProducts.length,
    limit,
    skip,
    hasMore: skip + limit < sortedProducts.length
  });
}