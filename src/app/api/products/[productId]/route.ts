import { NextRequest, NextResponse } from 'next/server';

import phonesData from '../../../../../public/api/phones.json';
import accessoriesData from '../../../../../public/api/accessories.json';
import tabletsData from '../../../../../public/api/tablets.json';

type ProductDetails = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorsKey[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
};

type ColorMapType = {
  gold: string;
  spaceBlack: string;
  silver: string;
  spacegray: string;
  coral: string;
  red: string;
  white: string;
  yellow: string;
  midnight: string;
  purple: string;
  graphite: string;
  sierrablue: string;
  blue: string;
  pink: string;
  black: string;
  midnightgreen: string;
  green: string;
  rosegold: string;
  starlight: string;
  skyblue: string;
};

type ColorsKey = keyof ColorMapType;

// Mapea a categoria para o json correspondente
const categoryDataMap: Record<string, ProductDetails[]> = {
  phones: phonesData as ProductDetails[],
  accessories: accessoriesData as ProductDetails[],
  tablets: tabletsData as ProductDetails[],
};

// Função GET para buscar os detalhes do item pelo itemId
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  const { productId } = await params;

  let productDetails: ProductDetails | null = null;
  let foundCategory = '';

  for (const [category, dataArray] of Object.entries(categoryDataMap)) {
    const found = dataArray.find((item: ProductDetails) => item.id === productId);

    if (found) {
      productDetails = found;
      foundCategory = category;
      break;
    }
  }

  if (!productDetails) {
    return NextResponse.json({ error: 'Product not found', productId }, { status: 404 });
  }

  return NextResponse.json({
    product: productDetails,
    category: foundCategory,
  });
}
