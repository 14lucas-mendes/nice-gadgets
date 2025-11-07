import { getProductById } from "@/utils/products";
import ColorOptions from "../ColorOptions";
import StorageOptions from "../StorageOptions";
import PriceDisplay from "../PriceDisplay";
import AddCardButton from "../AddCardButton";
import ProductInfo from "../ProductInfo";

export default async function IdCard({ params }: { params: { productId: string } }) {
    const {productId} = await params;
    const product = await getProductById(productId);


    return (
        <div className="w-[320px] flex flex-col">
            <ColorOptions product={product} />
            <StorageOptions product={product} />
            <PriceDisplay product={product} />
            <AddCardButton productId={productId} />
            <ProductInfo product={product} />
        </div>
    )
}