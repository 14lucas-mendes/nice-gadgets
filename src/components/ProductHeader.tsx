import Link from 'next/link';
import PageHeader from './PageHeader';

type CategoryItemProps = {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
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
};

export default function ProductHeader({ product }: { product: CategoryItemProps }) {
  return (
    <div className="w-full mx-auto flex flex-col py-6">
      <PageHeader page={product.category} title={product.name} description={''} />
    </div>
  );
}
