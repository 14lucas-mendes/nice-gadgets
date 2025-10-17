import { getTop10Products } from "@/utils/products";
import CardSlicer from "../CardSlicer";


export default async function CardHotPrice() {

    const products = await getTop10Products()

    return (
        <div className="mt-8">
            <CardSlicer products={products} title={'Hot prices'} />
        </div>
    );
}