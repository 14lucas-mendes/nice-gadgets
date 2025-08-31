import CardHotPrice from "@/components/ui/CardHotPrice";
import CardNewModels from "@/components/ui/CardNewModels";
import ShopyCategory from "@/components/ui/ShopyCategory";
import Slider from "@/components/ui/Slider";

export default function Home() {
    return (
        <div>
            <h1 className="font-extrabold text-[32px] mt-6 ml-4">Welcome to Nice Gadgets store!</h1>
            <Slider />

            <section className="mt-14">
                <div className="w-full overflow-hidden">
                    <div className="mt-6 ml-4">
                        <CardNewModels /> 
                    </div>
                    <div>
                        <ShopyCategory />
                    </div>
                    <div className="mt-14 ml-4 mb-16">
                        <CardHotPrice />
                    </div>
                </div>
            </section>
        </div>
    )
}
