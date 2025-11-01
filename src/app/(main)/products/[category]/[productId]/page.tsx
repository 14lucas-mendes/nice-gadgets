import CardProductId from "@/components/CardProductById";
import ContentProductById from "@/components/ContentProductById";
import { getProductById } from "@/utils/products";

export default async function ProductId({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {

    const { productId } = await params;
    const productById = await getProductById(productId);


    return (
        <div>
             <ContentProductById product={productById} />
             <CardProductId product={productById} />
        </div> 
    )
}