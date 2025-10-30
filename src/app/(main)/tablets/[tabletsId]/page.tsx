import CardItem from "@/components/CardItem";
import { getProductById } from "@/utils/products";

export default async function TabletsId({
    params,
}: {
  params: { itemId: string };
}) {

    const productById = await getProductById(params.itemId);

    return (
       <div>
            <CardItem product={productById} />
        </div> 
    )
}