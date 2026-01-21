export interface Route {
  href: string;
  label: string;
  isActive: (path: string) => boolean;
}

export const NAVIGATION_ROUTES: Route[] = [
  {
    href: '/',
    label: 'Home',
    isActive: (path: string) => path === '/',
  },
  {
    href: '/products/phones',
    label: 'Phones',
    isActive: (path: string) => path.includes('/phones'),
  },
  {
    href: '/products/accessories',
    label: 'Accessories',
    isActive: (path: string) => path.includes('/accessories'),
  },
  {
    href: '/products/tablets',
    label: 'Tablets',
    isActive: (path: string) => path.includes('/tablets'),
  },
];
