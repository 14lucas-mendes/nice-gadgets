import type { ProductDetail } from '@/types/product-details';

interface ProductDescriptionProps {
  product: ProductDetail;
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <section className="w-full">
      <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">About</h2>

      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        {product.description.map((item, index) => (
          <article key={index} className="space-y-3">
            <h3 className="font-bold text-base sm:text-lg text-[var(--text-primary)]">
              {item.title}
            </h3>
            <div className="space-y-2">
              {item.text.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
