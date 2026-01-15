import { getProductById } from "@/utils/products";
import ColorSelector from "./ColorSelector";
import AddToCartButton from "./AddToCartButton";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import StorageSelector from "./StorageSelector";


export default async function ProductIdDisplay({ params }: { params: { productId: string } }) {
    const {productId} = await params;
    const product = await getProductById(productId);


    return (
        <div className="w-full flex flex-col">
            <ColorSelector product={product} />
            <StorageSelector product={product} />
            <ProductPrice product={product} />
            <AddToCartButton productId={productId} />
            <ProductInfo product={product} />
        </div>
    )
}