import { NextRequest, NextResponse } from 'next/server';


// importando os json de phones, accessories e tablets
import phonesData from '../../../../public/api/phones.json';
import accessoriesData from '../../../../public/api/accessories.json';
import tabletsData from '../../../../public/api/tablets.json';


// tipo com os detalhes de um item

type ProductDetails = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
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
}

// Mapea a categoria para o json correspondente
const categoryDataMap: Record<string, ProductDetails[]> = {
  phones: phonesData as ProductDetails[],
  accessories: accessoriesData as ProductDetails[],
  tablets: tabletsData as ProductDetails[],
};


// Função GET para buscar os detalhes do item pelo itemId
export async function GET(req: NextRequest, { params }: { params: { itemId: string } }) {
    const { itemId } = params;

    let productDetails: ProductDetails | null = null;
    let foundCategory = '';

    for (const [category, dataArray] of Object.entries(categoryDataMap)) {
        const found = dataArray.find((item: ProductDetails) => item.id === itemId);

        if (found) {
            productDetails = found;
            foundCategory = category;
            break;
        }
    }

    if (!productDetails) {
        return NextResponse.json(
            { error: 'Product not found', itemId },
            { status: 404 }
        );
    }

    return NextResponse.json({
        product: productDetails,
        category: foundCategory,
    });
}