import jsonProducts from '../../../../public/api/products.json';
import { NextResponse, NextRequest } from 'next/server';

enum Sorting {
    PRICE_ASC = "priceAsc",
    PRICE_DESC = "priceDesc",
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
    [Sorting.PRICE_ASC]: (a: Product, b: Product) => (a.fullPrice - a.price) - (b.fullPrice - b.price),
    [Sorting.PRICE_DESC]: (a: Product, b: Product) => (b.fullPrice - b.price) - (a.fullPrice - a.price),
};

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const limit = Number(searchParams.get('limit')) || 10;
    const skip = Number(searchParams.get("skip")) || 0;
    const sortBy = searchParams.get('sortBy') as Sorting ?? Sorting.PRICE_ASC;
    const sortedProducts = [...jsonProducts].sort(sortHandlers[sortBy]);
    const products = sortedProducts.slice(skip, skip + limit);

    return NextResponse.json({
    products
    });
}