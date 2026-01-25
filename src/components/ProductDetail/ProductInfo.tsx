import type { ProductDetail } from '@/types/product-details';

interface ProductInfoProps {
  product: ProductDetail;
}

interface QuickSpec {
  label: string;
  value: string;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const quickSpecs: QuickSpec[] = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
  ];

  return (
    <div className="w-full mt-6 sm:mt-8">
      <dl className="space-y-2 sm:space-y-3">
        {quickSpecs.map((spec) => (
          <div key={spec.label} className="flex justify-between items-center py-1">
            <dt className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">
              {spec.label}
            </dt>
            <dd className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
