import Image from 'next/image';

interface EmptyStateProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ imageSrc, imageAlt, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-6">
        <Image src={imageSrc} alt={imageAlt} fill className="object-contain" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] text-center mb-2">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-[var(--text-muted)] text-center max-w-md mb-6">
          {description}
        </p>
      )}

      {action && (
        <a
          href={action.href}
          className="px-6 py-3 bg-orange-500 dark:bg-purple-500 text-white font-bold rounded-lg hover:bg-orange-600 dark:hover:bg-purple-600 transition-colors"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
