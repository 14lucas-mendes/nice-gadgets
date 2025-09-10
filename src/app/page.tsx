import CardHotPrice from "@/components/ui/CardHotPrice";
import CardNewModels from "@/components/ui/CardNewModels";
import Container from "@/components/ui/Container";
import ShopyCategory from "@/components/ui/ShopyCategory";
import Slider from "@/components/ui/Slider";

export default function Home() {
    return (
        <Container>
            <section className="grid grid-col-4 sm:grid-cols-12">
                <Slider />
            </section>
            <section className="mt-14">
                <div className="w-full overflow-hidden">
                    <div className="mt-6">
                        <CardNewModels /> 
                    </div>
                    <div>
                        <ShopyCategory />
                    </div>
                    <div className="mt-14 mb-16">
                        <CardHotPrice />
                    </div>
                </div>
            </section>
        </Container>
    )
}
