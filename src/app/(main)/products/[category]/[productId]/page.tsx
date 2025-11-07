import { getProductById } from "@/utils/products";
import ContentProductById from "@/components/ContentProductById";
import IdCard from "@/components/IdCard";
import HeaderProduct from "@/components/HeaderProduct";
import { HeadingCard } from "@/components/HeadingCard";
import CardDescription from "@/components/CardDescription";
import CardSpecs from "@/components/CardSpecs";
import CardNewModels from "@/components/CardNewModels";


export default async function ProductId({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const product = await getProductById(productId);

  return (
    <div className="max-w-6xl mx-auto">
      <HeaderProduct product={product} />
      <div>
      <HeadingCard as="h2">{product?.name}</HeadingCard>
      </div>
      <div className="flex flex-row items-center justify-center">
        <ContentProductById product={product} />
        <IdCard params={{ productId: productId }} />
      </div>
      <div className="flex gap-8">
        <div className="w-full">
          <CardDescription product={product} />
        </div>
        <div className="w-full">
          <CardSpecs product={product} />
        </div>
      </div>
      <div className="w-full">
          <CardNewModels />
      </div>
    </div>
  );
}





// <IdCard params={{ productId: productId }} /> 
// 1.phones
// 2.tablets
// 3.accessories

// paginas de cada produto
// 1.phones
// 2.tablets
// 3.accessories

// pagina de detalhes de cada produto