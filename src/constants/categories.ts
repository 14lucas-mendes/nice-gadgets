import type { Category } from '@/types/category';

export const CATEGORIES: Omit<Category, 'count'>[] = [
  {
    id: 'phones',
    name: 'Mobile Phones',
    slug: 'phones',
    image: '/img/layout/banners_phones.png',
    href: '/products/phones',
    description: 'Latest smartphones and mobile devices',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    image: '/img/layout/banners_accessories.png',
    href: '/products/accessories',
    description: 'Cases, chargers, and more',
  },
  {
    id: 'tablets',
    name: 'Tablets',
    slug: 'tablets',
    image: '/img/layout/banners_tablets.png',
    href: '/products/tablets',
    description: 'iPads and Android tablets',
  },
];
