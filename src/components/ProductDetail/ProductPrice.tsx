import type { ProductDetail } from '@/types/product-details';
import { formatCurrency, calculateDiscount } from '@/lib/formatters';

interface ProductPriceProps {
  product: ProductDetail;
}

export default function ProductPrice({ product }: ProductPriceProps) {
  const discount = calculateDiscount(product.priceDiscount, product.priceRegular);

  return (
    <div className="flex flex-col w-full py-2">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)]">
          {formatCurrency(product.priceDiscount)}
        </span>

        {discount > 0 && (
          <>
            <span className="font-medium text-lg sm:text-xl text-[var(--text-muted)] line-through">
              {formatCurrency(product.priceRegular)}
            </span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 px-2 py-1 rounded">
              -{discount}% OFF
            </span>
          </>
        )}
      </div>
    </div>
  );
}
