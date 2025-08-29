import Image from "next/image";

export default function ShopyCategory() {
    return (
        <div>
            <section>
                <div>
                    <Image src="/img/layout/category-phones.png" alt="category-accessories" width={100} height={100}/>
                </div>
                <div>
                    <Image src="/img/layout/category-accessories.png" alt="category-accessories" width={100} height={100} />
                </div>
                <div>
                    <Image src="/img/layout/category-tablets.png" alt="category-accessories" width={100} height={100} />
                </div>
            </section>
        </div>
    )
}