'use client'

import CardNewModels from "@/components/ui/CardNewModels";
import Slider from "@/components/ui/Slider";

export default function Home() {
    return (
        <div>
            <h1 className="font-extrabold text-[32px] mt-6 ml-4">Welcome to Nice Gadgets store!</h1>
            <Slider />

            <section className="mt-14">
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-[22px] ml-4">Brand new models</h1>
                <div>
                    <button className="gap-4 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <button className="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                </div>
                <div className="mt-6 ml-4">
                <CardNewModels /> 
                </div>
            </section>
        </div>
    )
}
