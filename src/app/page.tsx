import CardNewModels from "@/components/CardNewModels";
import Slider from "@/components/Slider";
import Container from "@/components/Container";
import ShopyCategory from "@/components/ShopyCategory";
import { getTop10Products, getTopYearProducts } from "@/utils/products";
import CardHotPrice from "@/components/CardHotPrice";
import Loading from "./loading";
import { Suspense } from "react";




export default async function Home() {
    const products = await getTop10Products();
    const productsByYear = await getTopYearProducts();

    return (
        <Container>
            <Suspense fallback={<Loading />}>
            <Slider />
            <CardNewModels products={productsByYear} />
            <ShopyCategory />
            <CardHotPrice products={products} />
            </Suspense>
        </Container>
         
    )
}
