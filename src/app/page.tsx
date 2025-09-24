import { getAllProductsSlider, getProductsByHotPrice } from "@/utils/products";
import Slider from "@/components/Slider";
import CardHotPrice from "@/components/CardHotPrice";

export default async function Home() {
    const products = await getProductsByHotPrice();
    console.log('Podutos Carregados', products);
    const slider = await getAllProductsSlider();
    console.log('Slider Carregado', slider);

    return (
        <>  
            <CardHotPrice products={products} />
            <Slider slider={slider} />
        </>
         
    )
}
