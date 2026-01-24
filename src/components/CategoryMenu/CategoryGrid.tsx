import type { CategoryWithCount } from '@/lib/categories';
import { CategoryCard } from './CategoryCard';

interface CategoryGridProps {
  categories: CategoryWithCount[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4 md:gap-6 lg:gap-8">
      {categories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          priority={index === 0} // Primeira imagem tem prioridade
        />
      ))}
    </div>
  );
}
