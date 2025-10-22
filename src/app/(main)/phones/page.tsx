import NavPage from "@/components/NavPage";
import PaginationCard from "@/components/Pagination";
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
            <div className={`${products.length > 0 ? 'flex justify-center items-center mt-10' : 'hidden'}`}>
                <PaginationCard />
            </div>
        </div> 
    );
}