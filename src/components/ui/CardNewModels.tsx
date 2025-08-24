'use client'

import { useEffect, useState } from "react";
import { CardNewModelsType } from "@/types/Product-type";
import Image from "next/image";


export default function CardNewModels() {
    const [dadosCard, setDadosCard] = useState<CardNewModelsType[]>([]);

    useEffect(() => {

        fetch('./api/products.json')
            .then(response => response.json())
            .then(data => {
                const fatiados = data.slice(0, 1)

                console.log("Quantidade de itens fatiados: ", fatiados.length)

                setDadosCard(fatiados)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div className="flex gap-4">
            {dadosCard.map((item) => (
                <div key={item.id}
                className="w-[212px] h-[439px] border-[1px] rounded-[8px] bg-white"
                >
                <Image
                    src={`/${item.image}`}
                    alt={item.name}
                    width={100}
                    height={100}
                     />
                     <p>{item.itemId}</p>
                     <p>{item.price}</p>
                     <p>{item.screen}</p>
                     <p>{item.capacity}</p>
                     <p>{item.ram}</p>
                     <button>Add to cart</button>
                </div>
            ))}
        </div>
    );
}