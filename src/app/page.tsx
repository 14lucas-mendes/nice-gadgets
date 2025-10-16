import Slider from "@/components/Slider";
import Container from "@/components/Container";
import ShopyCategory from "@/components/ShopyCategory";
import Loading from "./loading";
import { Suspense } from "react";
import CardHotPrice from "@/components/CardHotPrice";
import { getTopYearProducts } from "@/utils/products";
import CardNewModels from "@/components/CardNewModels";




export default async function Home() {
    
    const productsModels = await getTopYearProducts()

    return (
        <Container>
            <Suspense fallback={<Loading />}>
                <Slider />
                <CardNewModels products={productsModels} />
                <ShopyCategory />
                <CardHotPrice />
            </Suspense>
        </Container>
         
    )
}
