import CategoryItem from "@/components/CategoryItem";
import { getProductById } from "@/utils/products";

export default async function PhoneId({
  params,
}: {
  params: { itemId: string };
}) {

    const productById = await getProductById(params.itemId);

    return (
        <div>
             <CategoryItem productsById={productById} />
        </div> 
    )
}