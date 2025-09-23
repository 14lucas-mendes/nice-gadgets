import { getProductsByHotPrice } from "@/api/products";
import SpinLoader from "@/components/SpinLoader";
import CardHotPrice from "@/components/CardHotPrice";
import { Suspense } from "react";

export default async function Home() {
    const products = await getProductsByHotPrice();

    return (

        <Suspense fallback={<SpinLoader className="min-h-20 mb-16"/>}>
            <CardHotPrice products={products} /> 
        </Suspense>
    )
}
