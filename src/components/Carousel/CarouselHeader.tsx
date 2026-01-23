interface CarouselHeaderProps {
  title?: string;
  subtitle?: string;
}

export function CarouselHeader({
  title = 'Welcome to Nice Gadgets store!',
  subtitle,
}: CarouselHeaderProps) {
  return (
    <div className="py-6 px-4 sm:py-8 md:py-14">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F0F11]">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
}
