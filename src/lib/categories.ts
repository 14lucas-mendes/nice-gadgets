import {
  getAllPhonesProducts,
  getAllAccessoriesProducts,
  getAllTabletsProducts,
} from '@/utils/products';
import { CATEGORIES } from '@/constants/categories';

export interface CategoryWithCount {
  id: string;
  name: string;
  slug: string;
  image: string;
  href: string;
  count: number;
  description?: string;
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
  try {
    // Busca todos os produtos em paralelo (mais rápido!)
    const [phones, accessories, tablets] = await Promise.all([
      getAllPhonesProducts(),
      getAllAccessoriesProducts(),
      getAllTabletsProducts(),
    ]);

    // Mapeia categorias com contagem
    const categoryCounts: Record<string, number> = {
      phones: phones.length,
      accessories: accessories.length,
      tablets: tablets.length,
    };

    // Retorna categorias com contagem
    return CATEGORIES.map((category) => ({
      ...category,
      count: categoryCounts[category.id] || 0,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Retorna categorias sem contagem em caso de erro
    return CATEGORIES.map((category) => ({
      ...category,
      count: 0,
    }));
  }
}
