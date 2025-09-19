import { getProductsByHotPrice } from "@/api/products";
import CardHotPrice from "@/components/CardHotPrice";
import Container from "@/components/Container";

export default async function Home() {
    const products = await getProductsByHotPrice();

    return (
        <Container>
           <CardHotPrice products={products} /> 
        </Container>
    )
}
