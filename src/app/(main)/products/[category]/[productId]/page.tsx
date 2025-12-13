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
      <ProductHeader product={product} />
      <div>
        <h2>{product?.name}</h2>
      </div>
      <div className="flex flex-row max-w-4xl items-center justify-center">
        <ProductDetailPage product={product} />
        <ProductIdDisplay params={{ productId: productId }} />
      </div>
      <div className="flex gap-8">
        <div className="w-full">
          <ProductDescription product={product} />
        </div>
        <div className="w-full">
          <ProductSpecifications product={product} />
        </div>
      </div>
      <div className="w-full">
        <NewBadge />
      </div>
    </div>
  );
}
