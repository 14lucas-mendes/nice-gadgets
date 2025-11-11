type HeadingCardProps = {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4';
};

export function HeadingCard({ children, as: Tag }: HeadingCardProps) {
  const headingClass = {
    h1: 'text-3xl px-4 py-6 tracking-tighter font-extrabold sm:text-4xl sm:px-6 sm:max-w-[600px] md:text-5xl md:max-w-5xl md:py-14 md:px-8',
    h2: 'sm:text-2xl sm:font-extrabold sm:tracking-tight sm:font-extrabold md:text-3xl md:font-extrabold md:tracking-tight lg:text-4xl lg:tracking-tight lg:font-extrabold',
    h3: 'text-3xl font-medium',
    h4: 'text-2xl font-normal',
  };

  return <Tag className={`${headingClass[Tag]} text-[#0F0F11]`}>{children}</Tag>;
}
