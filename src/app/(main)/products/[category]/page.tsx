import PageNavigation from '@/components/PageNavigation';
import { capitalize } from '@/lib/catalog-utils';
import { notFound } from 'next/navigation';
import {
  getAllAccessoriesProducts,
  getAllPhonesProducts,
  getAllTabletsProducts,
} from '@/lib/product-queries';
import type { Product } from '@/types/product';

const VALID_CATEGORIES = ['accessories', 'phones', 'tablets'] as const;
type ValidCategory = (typeof VALID_CATEGORIES)[number];

const categoryHandlers: Record<ValidCategory, () => Promise<Product[]>> = {
  accessories: getAllAccessoriesProducts,
  phones: getAllPhonesProducts,
  tablets: getAllTabletsProducts,
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Validate category
  if (!VALID_CATEGORIES.includes(category as ValidCategory)) {
    notFound();
  }

  const products = await categoryHandlers[category as ValidCategory]();
  const capitalizedCategory = capitalize(category);

  return (
    <PageNavigation
      products={products}
      page={capitalizedCategory}
      title={capitalizedCategory}
      description={`${products.length} models`}
    />
  );
}

// Generate static params for build time
export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({
    category,
  }));
}
