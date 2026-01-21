export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export const FOOTER_LINKS: FooterLink[] = [
  {
    href: 'https://github.com/14lucas-mendes',
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/lucas-silva-mendes-5318101a7/',
    label: 'Contacts',
    external: true,
  },
  {
    href: '/rights', // Melhor usar rota interna para "Rights"
    label: 'Rights',
    external: false,
  },
];
