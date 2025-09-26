import { Product } from "@/types/Product";
import Card from "../Card";
import { HeadingCard } from "../HeadingCard";



export default function CardNewModels({products}: {products: Product[]}) {

    return (
        <div>
            <HeadingCard as="h2">Brand New Models</HeadingCard>
            <div className="mt-6">
                <Card products={products} />
            </div>
        </div>
    );
}