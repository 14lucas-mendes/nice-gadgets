

import PageNavigation from "@/components/PageNavigation";
import { getAllAccessoriesProducts, getAllPhonesProducts, getAllTabletsProducts } from "@/utils/products";

enum Categories {
    Accessories = "accessories",
    Phones = "phones",
    Tablets = "tablets"
}

type CategoryHandlers =  Record<Categories, () => Promise<import('@/types/Product').Product[]>>;

const categoryHandlers: CategoryHandlers = {
    [Categories.Accessories]: getAllAccessoriesProducts,
    [Categories.Phones]: getAllPhonesProducts,
    [Categories.Tablets]: getAllTabletsProducts,
};

export default async function CategoryPages({params}: {params: Promise<{category: Categories}>}) {

    const { category } = await params;
    const products = await categoryHandlers[category]()
   
    return (
        <div className="max-w-6xl mx-auto pb-14">
            <PageNavigation
                products={products}
                page={category.charAt(0).toUpperCase() + category.slice(1)}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
                description={`${products.length} Models.`}
            />
        </div>
    );
}