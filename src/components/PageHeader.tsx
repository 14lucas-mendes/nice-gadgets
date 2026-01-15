import Link from 'next/link';
import { House } from 'lucide-react'; // Ícone padrão do shadcn

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type HeaderProps = {
  page: string;
  title: string;
  description: string;
};

export default function PageHeader({ page, title, description }: HeaderProps) {
  return (
    <div className="flex flex-col gap-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <House className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-[var(--text-muted)]">
              {page}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">{title}</h1>
        <p className="font-semibold text-xs sm:text-sm md:text-[14px] text-[var(--text-muted)] mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}
