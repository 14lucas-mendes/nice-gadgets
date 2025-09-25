import Card from "@/components/Card";
import { getAllProducts } from "@/utils/products";



export default async function Home() {
    const products = await getAllProducts();

    return (
        <div className="py-20">  
            <Card products={products} />
        </div>
         
    )
}
