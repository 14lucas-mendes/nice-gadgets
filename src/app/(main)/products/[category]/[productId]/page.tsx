import NewBadge from '@/components/NewBadge';
import ProductDescription from '@/components/ProductDescription';
import ProductDetailPage from '@/components/ProductDetailPage';
import ProductHeader from '@/components/ProductHeader';
import ProductIdDisplay from '@/components/ProductIdDisplay';
import ProductSpecifications from '@/components/ProductSpecifications';
import { getProductById } from '@/utils/products';

export default async function ProductId({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProductById(productId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden pb-10">
      <ProductHeader product={product!} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        <div className="lg:col-span-7">
          <ProductDetailPage product={product} />
        </div>

        <div className="lg:col-span-5">
          <ProductIdDisplay params={{ productId: productId }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16 lg:mt-24 items-start">
        <div className="w-full">
          <ProductDescription product={product!} />
        </div>
        <div className="w-full">
          <ProductSpecifications product={product!} />
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <NewBadge />
      </div>
    </div>
  );
}
