import NavPage from "@/components/NavPage";
import { getAllPhonesProducts } from "@/utils/products";

export default async function PhonesPage() {

    const products = await getAllPhonesProducts()
    

    return (
        <div className="max-w-6xl mx-auto pb-14">
            <NavPage
            products={products}
            page="Phones"
            title="Mobile Phones"
            description={`${products.length} Models`}
            />
        </div> 
    );
}