'use client';

import { useMemo } from 'react';
import { useCartFavorite } from '@/context/CartFavoriteContext';
import { useProductsFromIds } from '@/hooks/useProductsFromIds';
import PageNavigation from '@/components/PageNavigation';
import { EmptyState } from '@/components/EmptyState/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';

export default function FavoritesPage() {
  const { favoriteItems, favoriteCount } = useCartFavorite();

  // Get product IDs from favorites
  const itemIds = useMemo(() => Array.from(favoriteItems), [favoriteItems]);

  // Fetch products
  const { products: favoriteProducts, isLoading, error } = useProductsFromIds(itemIds);

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Skeleton className="h-10 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">Error loading favorites: {error.message}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (favoriteCount === 0 || favoriteProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EmptyState
          imageSrc="/img/layout/favorites-is-empty.png"
          imageAlt="No favorites yet"
          title="No favorites yet"
          description="Start adding products to your favorites to see them here!"
          action={{
            label: 'Explore Products',
            href: '/products/phones',
          }}
        />
      </div>
    );
  }

  // Favorites Grid
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <PageNavigation
        products={favoriteProducts}
        page="Favorites"
        title="Your Favorites"
        description={`${favoriteCount} ${favoriteCount === 1 ? 'item' : 'items'}`}
      />
    </div>
  );
}
