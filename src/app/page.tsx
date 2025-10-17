import Slider from "@/components/Slider";
import Container from "@/components/Container";
import ShopyCategory from "@/components/ShopyCategory";
import Loading from "./loading";
import { Suspense } from "react";
import CardHotPrice from "@/components/CardHotPrice";
import CardNewModels from "@/components/CardNewModels";




export default async function Home() {

    return (
        <Container>
            <Suspense fallback={<Loading />}>
                <Slider />
                <CardNewModels />
                <ShopyCategory />
                <CardHotPrice />
            </Suspense>
        </Container>
         
    )
}
