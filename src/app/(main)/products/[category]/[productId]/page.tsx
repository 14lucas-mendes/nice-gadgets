import CardItem from "@/components/CardItem";
import { getProductById } from "@/utils/products";

export default async function PhoneId({
  params,
}: {
  params: Promise<{ phoneId: string }>;
}) {

    const { phoneId } = await params;
    const productById = await getProductById(phoneId);
  

    return (
        <div>
             <CardItem product={productById} />
        </div> 
    )
}