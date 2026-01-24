'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CategoryWithCount } from '@/lib/categories';

interface CategoryCardProps {
  category: CategoryWithCount;
  priority?: boolean;
}

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  const { name, image, href, count, description } = category;

  return (
    <article className="w-full">
      {/* Image Container - Dinâmico com limites */}
      <Link
        href={href}
        className="block w-full min-h-[288px] max-h-[288px] sm:min-h-0 sm:max-h-[368px] aspect-video rounded-lg relative overflow-hidden group"
        aria-label={`Ver todos os produtos em ${name}`}
      >
        <Image
          src={image}
          alt={`Categoria ${name}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 33vw"
          priority={priority}
        />

        {/* Overlay para melhor contraste no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Info */}
      <Link href={href} className="block mt-4 sm:mt-5 md:mt-6 group">
        <h3 className="font-bold text-base sm:text-lg md:text-xl text-[var(--text-primary)] group-hover:text-orange-500 dark:group-hover:text-purple-500 transition-colors">
          {name}
        </h3>
        <p className="font-semibold text-xs sm:text-sm text-[var(--text-muted)] mt-1">
          {count} {count === 1 ? 'model' : 'models'}
        </p>
        {description && (
          <p className="text-xs text-[var(--text-muted)] mt-1 hidden sm:block">{description}</p>
        )}
      </Link>
    </article>
  );
}
