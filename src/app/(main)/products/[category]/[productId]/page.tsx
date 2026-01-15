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
    <div className="max-w-6xl mx-auto px-4 overflow-x-hidden">
      <ProductHeader product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6">
        <div className="lg:col-span-7 order-1">
          <ProductDetailPage product={product} />
        </div>

        <div className="lg:col-span-5 order-2">
          <ProductIdDisplay params={{ productId: productId }} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-2 gap-10 mt-12 lg:mt-20">
        <div className="w-full">
          <ProductDescription product={product} />
        </div>
        <div className="w-full">
          <ProductSpecifications product={product} />
        </div>
      </div>

      <div className="mt-12 lg:mt-20 -mx-4 sm:-mx-12 md:mx-auto md:max-w-6xl">
        <NewBadge />
      </div>
    </div>
  );
}
