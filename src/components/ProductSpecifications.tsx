type CardSpecsProps = {
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

export default function ProductSpecifications({ product }: { product: CardSpecsProps }) {
  return (
    <div className="w-full h-full flex flex-col gap-2 mt-20">
      <p className="font-bold text-[22px]">Tech Specs</p>
      <div className="flex justify-between mt-10">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Screen</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">
          {product.screen}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Resolution</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">
          {product.resolution}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Processor</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">
          {product.processor}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">RAM</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">{product.ram}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Built in memory</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">
          {product.capacity}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Camera</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">
          {product.camera}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Zoom</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">{product.zoom}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium text-[14px] text-[var(--text-muted)]">Cell</span>
        <span className="font-semibold text-[14px] text-[var(--text-primary)]">
          {product.cell.join(', ')}
        </span>
      </div>
    </div>
  );
}
