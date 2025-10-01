import CardNewModels from "@/components/CardNewModels";
import Slider from "@/components/Slider";
import Container from "@/components/Container";
import ShopyCategory from "@/components/ShopyCategory";
import { getTop10Products, getTopYearProducts } from "@/utils/products";
import CardHotPrice from "@/components/CardHotPrice";




export default async function Home() {
    const products = await getTop10Products();
    const productsByYear = await getTopYearProducts();

    return (
        <Container> 
            <Slider />
            <CardNewModels products={productsByYear} />
            <ShopyCategory />
            <CardHotPrice products={products} />
        </Container>
         
    )
}
