import { ProductDetails } from "@/types/ProductDetails";

type CardItemProps = {
    product: ProductDetails
}


export default function CardItem({product}: CardItemProps) {
    

  return (
    <div className="text-2xl">
      {product.capacityAvailable.map((capacity) => (
        <div key={capacity} className="mb-4 p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-2">{product.name} - {capacity}</h2>
          <p className="mb-1">Price: ${product.priceDiscount}</p>
          <p className="mb-1">Color: {product.color}</p>
          <p className="mb-1">Screen: {product.screen}</p>
          <p className="mb-1">Processor: {product.processor}</p>
          <p className="mb-1">RAM: {product.ram}</p>
          <div className="mt-2">
            <h3 className="font-semibold">Description:</h3>
            {product.description.map((desc, index) => (
              <div key={index} className="mb-2">
                <h4 className="font-medium">{desc.title}</h4>
                <ul className="list-disc list-inside">
                  {desc.text.map((textItem, textIndex) => (
                    <li key={textIndex}>{textItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}