import Link from "next/link";

const colorMap = {
    gold: '#FFD700',
    spaceBlack: '#161617',
    silver: '#C0C0C0',
    spacegray: '#535456',
    coral: '#FF7F50',
    red: '#FF0000',
    white: '#FFFFFF',
    yellow: '#FFFF00',
    midnight: '#1F202C',
    purple: '#800080',
    graphite: '#505150',
    sierrablue: '#A0B4C6',
    blue: '#0000FF',
    pink: '#FFC0CB',
    black: '#000000',
    midnightgreen: '#4E5851',
    green: '#008000',
    rosegold: '#B76E79',
    starlight: '#FAF7F2',
    skyblue: '#87CEEB'
}

type ColorsKey = keyof typeof colorMap;

type CardProps = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: ColorsKey[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}



export default function ColorOptions({ product } : {product: CardProps | null}) {
    return (
        <div className="flex flex-col w-full justify-start items-start">
            <div className="text-[#89939A] text-[12px] font-semibold">
                <p>Avaliable Colors</p>
            </div>
            <div className="flex flex-row mt-2">
                {product?.colorsAvailable.map(color => (
                <div key={color}
                className="flex text-2xl text-center justify-center"
                >
                    <Link href={'/'}
                    className="w-8 h-8 border-2 border-[#F0F0F0] rounded-full"
                    style={{ backgroundColor: colorMap[color] || color }}
                    >
                
                    </Link>
                </div>
            ))}
            </div>
            <hr className="w-full my-6 border-gray-400" />
        </div>
    )
}