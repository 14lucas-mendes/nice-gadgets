import ColorOptions from "@/components/ColorOptions";
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
             <ColorOptions product={productById} />
        </div> 
    )
}