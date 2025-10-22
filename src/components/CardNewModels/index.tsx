import { getTopYearProducts } from "@/utils/products"
import CardSlicer from "../CardSlicer";


export default async function CardNewModels() {

    const products = await getTopYearProducts();

    return (
        <div className="py-20">
            <CardSlicer products={products} title={'Brand new Models'} />
        </div>
    )
}