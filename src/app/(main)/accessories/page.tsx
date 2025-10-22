
import NavPage from "@/components/NavPage";
import { getAllAccessoriesProducts } from "@/utils/products";

export default async function AccessoriesPage() {
    
   const products = await getAllAccessoriesProducts()
   

    return (
        <div className="max-w-6xl mx-auto pb-14">
            <NavPage
                products={products}
                page="Accessories"
                title="Accessories"
                description={`${products.length} Models.`}
            />
        </div>
    );
}