import { formatCurrency, calculateDiscount } from '@/lib/formatters';

interface ProductPriceProps {
  price: number;
  fullPrice: number;
  currency?: string;
}

export function ProductPrice({ price, fullPrice, currency = 'BRL' }: ProductPriceProps) {
  const discount = calculateDiscount(price, fullPrice);
  const hasDiscount = discount > 0;

  return (
    <div className="flex flex-row gap-2 items-baseline">
      <p className="font-extrabold text-lg text-[var(--text-primary)]">
        {formatCurrency(price, currency)}
      </p>

      {hasDiscount && (
        <>
          <p className="font-medium text-sm text-[var(--text-muted)] line-through">
            {formatCurrency(fullPrice, currency)}
          </p>
          <span className="text-xs font-bold text-green-600 dark:text-green-400">-{discount}%</span>
        </>
      )}
    </div>
  );
}
