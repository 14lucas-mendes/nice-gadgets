import { getProductById } from '@/lib/product-queries';
import { notFound } from 'next/navigation';
import { ProductHeader } from '@/components/ProductDetail/ProductHeader';
import { ProductImageGallery } from '@/components/ProductDetail/ProductImageGallery';
import { ProductActions } from '@/components/ProductDetail/ProductActions';
import { ProductDescription } from '@/components/ProductDetail/ProductDescription';
import { ProductSpecifications } from '@/components/ProductDetail/ProductSpecifications';
import { RelatedProducts } from '@/components/ProductDetail/RelatedProducts';

interface ProductPageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 md:pb-20 overflow-x-hidden">
      {/* Breadcrumb + Title */}
      <ProductHeader product={product} />

      {/* Grid Principal - Mobile: Stack, Desktop: 7/5 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mt-4 sm:mt-6 w-full">
        {/* Galeria de Imagens - 58% width desktop */}
        <div className="lg:col-span-7">
          <ProductImageGallery product={product} />
        </div>

        {/* Seletor + Preço + Ações - 42% width desktop */}
        <div className="lg:col-span-5">
          <ProductActions product={product} productId={productId} />
        </div>
      </div>

      {/* Descrição + Especificações - 50/50 desktop, stack mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mt-12 sm:mt-16 lg:mt-20">
        <ProductDescription product={product} />
        <ProductSpecifications product={product} />
      </div>

      {/* Produtos Relacionados */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <RelatedProducts />
      </div>
    </main>
  );
}
