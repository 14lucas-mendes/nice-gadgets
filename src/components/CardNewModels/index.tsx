import { getTopYearProducts } from "@/utils/products"
import CardSlicer from "../CardSlicer";


export default async function CardNewModels() {

    const products = await getTopYearProducts();
    console.log('📦 Products loaded:', products.length);
    console.log('📦 First product:', products[0]);

    return (
        <div className="py-20">
            <CardSlicer products={products} title={'Brand new Models'} />
        </div>
    )
}