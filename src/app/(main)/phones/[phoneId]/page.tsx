import CardItem from "@/components/CardItem";
import { getProductById } from "@/utils/products";

export default async function PhoneId({
  params,
}: {
  params: { productId: string };
}) {

    const productById = await getProductById(params.productId);
  

    return (
        <div>
             <CardItem product={productById} />
        </div> 
    )
}