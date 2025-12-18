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
    <div className="max-w-6xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <ProductHeader product={product} />
        <div className="flex flex-row items-center justify-center">
          <ProductDetailPage product={product} />
          <ProductIdDisplay params={{ productId: productId }} />
        </div>
        <div className="flex gap-8">
          <div className="flex w-full justify-center">
            <ProductDescription product={product} />
          </div>
          <div className="flex w-full justify-center">
            <ProductSpecifications product={product} />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <NewBadge />
        </div>
      </div>
    </div>
  );
}
