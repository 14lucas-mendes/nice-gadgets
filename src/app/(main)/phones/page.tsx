'use client'

import { CardNewModelsType } from "@/types/Product-type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PhonesPage() {

    const [dadosPhones, setDadosPhones] = useState<CardNewModelsType[]>([]);

    useEffect(() => {
        fetch('./api/products.json')
            .then(response => response.json())
            .then(data => {
                const fatiados = data.slice(0, 120)
                setDadosPhones(fatiados)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div>
            <div className="flex items-center gap-2 ml-4 mt-6">
                <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </Link>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#B4BDC3]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <h3 className="font-semibold text-[12px] text-[#B4BDC3]">Phones</h3>
                </div>
            </div>
            <div>
                <h1 className="font-extrabold text-[32px] mt-6 ml-4">Mobile Phones</h1>
                <p className="font-semibold text-[14px] text-[#89939A] mt-2 ml-4">95 Models</p>
            </div>
            <div className="flex items-center gap-4 mt-6 ml-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="sort" className="font-bold text-[12px] text-[#89939A]">Sort by</label>
                    <select name="sort" id="sort" className="bg-[#FAFBFC] w-[136px] h-[40px] rounded-[8px] border-[1px] border-[#B4BDC3]">
                        <option value="newest" className="font-bold text-[12px] text-[#89939A]">Newest</option>
                        <option value="alphabetically" className="font-bold text-[12px] text-[#89939A]">Alphabetically</option>
                        <option value="cheapest" className="font-bold text-[12px] text-[#89939A]">Cheapest</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="view" className="font-bold text-[12px] text-[#89939A]">Itens on page</label>
                    <select name="view" id="view" className="bg-[#FAFBFC] w-[136px] h-[40px] rounded-[8px] border-[1px] border-[#B4BDC3]">
                        <option value="4" className="font-bold text-[12px] text-[#89939A]">4</option>
                        <option value="8" className="font-bold text-[12px] text-[#89939A]">8</option>
                        <option value="16" className="font-bold text-[12px] text-[#89939A]">16</option>
                        <option value="All" className="font-bold text-[12px] text-[#89939A]">All</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-10">
                    {dadosPhones.map(item => (
                        <div key={item.id} className="border border-[#B4BDC3] rounded-lg p-8 m-2 w-[300px] flex flex-col items-center">
                            <Image
                                src={`/${item.image}`}
                                alt={item.itemId}
                                width={100}
                                height={100}
                                className="object-contain transition transform hover:scale-110 duration-300 ease-in-out"
                            />
                            <p className="font-semibold text-[12px] mt-2 break-normal uppercase text-center w-[200px]">{item.name}</p>
                            <div className="flex gap-1 mt-4 mr-32">
                                <p className="font-bold text-[22px]">{`$${item.price}`}</p>
                                <p className="text-[22px] text-[#89939A] line-through">{`$${item.fullPrice}`}</p>
                            </div>
                            <div className="border-t border-[#E2E6E9] w-full mt-2"/>
                            <div className="flex justify-between w-full font-bold text-[12px] mt-2">
                                <p className="text-[#89939A]">Screen</p>
                                <p>{item.screen}</p>
                            </div>
                            <div className="flex justify-between w-full font-bold text-[12px]">
                                <p className="text-[#89939A]">Capacity</p>
                                <p>{item.capacity}</p>
                            </div>
                            <div className="flex justify-between w-full font-bold text-[12px]">
                                <p className="text-[#89939A]">RAM</p>
                                <p>{item.ram}</p>
                            </div>
                            <div className="flex justify-center w-full gap-2 mt-3.5">
                                <button className="bg-orange-500 h-10 w-[200px] rounded-[8px] text-white text-[14px] font-semibold">Add to cart</button>
                                <Link href={`/product/${item.id}`} className="flex justify-center items-center rounded-full border border-gray-400 w-10 h-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#0F0F11]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}