import { getProductById } from "@/utils/products";
import ColorOptions from "../ColorOptions";
import CardDetails from "../CardDetails";
import PriceDisplay from "../PriceDisplay";
import AddCardButton from "../AddCardButton";
import ProductInfo from "../ProductInfo";

export default async function IdCard({ params }: { params: { productId: string } }) {
    const {productId} = await params;
    const product = await getProductById(productId);


    return (
        <div className="w-[620px] flex flex-col">
            <ColorOptions product={product} />
            <CardDetails product={product} />
            <PriceDisplay product={product} />
            <AddCardButton />
            <ProductInfo product={product} />
        </div>
    )
}