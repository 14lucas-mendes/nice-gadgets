import { getCategoriesWithCounts } from '@/lib/categories';
import { CategoryGrid } from './CategoryGrid';

export default async function CategoryMenu() {
  const categories = await getCategoriesWithCounts();

  return (
    <section className="w-full max-w-full px-4 overflow-hidden sm:px-12 md:max-w-6xl md:mx-auto pb-14 sm:pb-16 md:pb-20">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl md:text-4xl text-[var(--text-primary)]">
          Sort By Category
        </h2>
      </div>

      {/* Grid */}
      <CategoryGrid categories={categories} />
    </section>
  );
}
