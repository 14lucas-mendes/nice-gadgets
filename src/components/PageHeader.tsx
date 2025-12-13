import Link from "next/link";
import { House } from "lucide-react"; // Ícone padrão do shadcn

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type HeaderProps = {
  page: string;
  title: string;
  description: string;
};

export default function PageHeader({ page, title, description }: HeaderProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Área do Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          
          {/* Item 1: Home */}
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <House className="h-5 w-5" />
                {/* sr-only serve para leitores de tela saberem o que é o ícone */}
                <span className="sr-only">Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* Separador Automático (/) ou Chevron */}
          <BreadcrumbSeparator />

          {/* Item 2: Página Atual */}
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-[#89939A]">
              {page}
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>

      {/* Área de Título e Descrição */}
      <div>
        <h1>{title}</h1>
        <p className="font-semibold text-[14px] text-[#89939A] mt-2">
          {description}
        </p>
      </div>
    </div>
  );
}