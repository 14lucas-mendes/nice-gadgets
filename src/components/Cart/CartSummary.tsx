import { formatCurrency } from '@/lib/formatters';

interface CartSummaryProps {
  totalPrice: number;
  itemCount: number;
  onCheckout: () => void;
}

export function CartSummary({ totalPrice, itemCount, onCheckout }: CartSummaryProps) {
  return (
    <aside className="lg:w-96 flex-shrink-0">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 sticky top-6">
        <div className="flex flex-col items-center">
          <p className="font-extrabold text-3xl sm:text-4xl text-[var(--text-primary)]">
            {formatCurrency(totalPrice)}
          </p>
          <p className="text-[var(--text-muted)] mt-2 text-sm sm:text-base">
            Total for {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>

          <hr className="w-full my-6 border-gray-200 dark:border-gray-700" />

          <button
            className="w-full h-12 sm:h-14 bg-orange-500 dark:bg-purple-500 text-white font-bold rounded-lg hover:bg-orange-600 dark:hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onCheckout}
            disabled={itemCount === 0}
          >
            Proceed to Checkout
          </button>

          <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
            Taxes and shipping calculated at checkout
          </p>
        </div>
      </div>
    </aside>
  );
}
