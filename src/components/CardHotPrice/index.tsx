import { getTop10Products } from "@/utils/products";
import CardSlicer from "../CardSlicer";


export default async function CardHotPrice() {

    const products = await getTop10Products()

    return (
        <CardSlicer products={products} />
    );
}