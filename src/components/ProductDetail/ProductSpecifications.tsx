import type { ProductDetail } from '@/types/product-details';
import { getProductSpecs } from '@/lib/product-detail-utils';

interface ProductSpecificationsProps {
  product: ProductDetail;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specs = getProductSpecs(product);

  return (
    <section className="w-full">
      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-6 sm:mb-8">
        Tech Specs
      </h2>

      <dl className="space-y-3 sm:space-y-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between items-start gap-4 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
          >
            <dt className="text-sm sm:text-base text-[var(--text-muted)] flex-shrink-0">
              {spec.label}
            </dt>
            <dd className="text-sm sm:text-base font-semibold text-[var(--text-primary)] text-right">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
