export interface CarouselSlide {
  src: string;
  alt: string;
  link: string;
  title?: string;
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    src: '/img/layout/phones.png',
    alt: 'Smartphones e telefones móveis',
    link: '/products/phones',
    title: 'Phones',
  },
  {
    src: '/img/layout/tablets.png',
    alt: 'Tablets e iPads',
    link: '/products/tablets',
    title: 'Tablets',
  },
  {
    src: '/img/layout/accessories.png',
    alt: 'Acessórios para dispositivos',
    link: '/products/accessories',
    title: 'Accessories',
  },
];
