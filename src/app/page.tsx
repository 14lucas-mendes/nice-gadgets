import CardNewModels from "@/components/CardNewModels";
import Container from "@/components/Container";
import ShopyCategory from "@/components/ShopyCategory";
import { getTop10Products } from "@/utils/products";



export default async function Home() {
    const products = await getTop10Products();
    console.log('meus produtos', products);

    return (
        <Container> 
            <CardNewModels products={products} />
            <ShopyCategory />
        </Container>
         
    )
}
