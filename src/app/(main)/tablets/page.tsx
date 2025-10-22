import NavPage from "@/components/NavPage";
import { getAllTabletsProducts } from "@/utils/products";

export default async function TabletsPage() {

    const products = await getAllTabletsProducts()

    return (
        <div className="max-w-6xl mx-auto pb-14">
            <NavPage
                products={products}
                page="Tablets"
                title="Tablets"
                description={`${products.length} Models.`}
            />
        </div>       
    );
}