import Slider from "@/components/Slider";
import Container from "@/components/Container";
import ShopyCategory from "@/components/ShopyCategory";
import Loading from "./loading";
import { Suspense } from "react";
import CardHotPrice from "@/components/CardHotPrice";
import { getTop10Products, getTopYearProducts } from "@/utils/products";
import CardNewModels from "@/components/CardNewModels";




export default async function Home() {
    const products = await getTop10Products()
    const productsModels = await getTopYearProducts()

    return (
        <Container>
            <Suspense fallback={<Loading />}>
                <Slider />
                <CardNewModels products={productsModels} />
                <ShopyCategory />
                <CardHotPrice products={products} />
            </Suspense>
        </Container>
         
    )
}
