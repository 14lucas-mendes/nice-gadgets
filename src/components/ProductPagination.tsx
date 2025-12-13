'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationCardProps = {
  currentPage: number;
  totalPages: number;
  // Mantendo a assinatura original para não quebrar seu código pai,
  // mas o ideal seria simplificar para (page: number) => void futuramente.
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationCardProps) {
  
  // Função auxiliar para adaptar o clique do shadcn ao formato do MUI
  const handlePageChange = (page: number) => {
    // O MUI espera um evento como primeiro argumento. Passamos null ou um mock.
    // O cast 'as any' é usado aqui apenas para satisfazer a tipagem estrita do MUI durante a migração.
    onPageChange({} as React.ChangeEvent<unknown>, page);
  };

  // Lógica para gerar os números das páginas (substitui a "mágica" do MUI)
  const generatePaginationItems = () => {
    // Se tiver poucas páginas, mostre todas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Se tiver muitas páginas, calculamos o intervalo ao redor da página atual
    const items: (number | string)[] = [1];

    if (currentPage > 3) {
      items.push('ellipsis-start');
    }

    // Páginas ao redor da atual
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < totalPages - 2) {
      items.push('ellipsis-end');
    }

    items.push(totalPages);

    return items;
  };

  return (
    <div className="flex w-full justify-center items-center mt-10">
      <Pagination>
        <PaginationContent>
          {/* Botão Anterior */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              // Classes condicionais para desabilitar visualmente se for a primeira página
              className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {/* Renderização dos Números e Elipses */}
          {generatePaginationItems().map((item, index) => {
            if (typeof item === 'string') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === item}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(item);
                  }}
                  className="cursor-pointer"
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Botão Próximo */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}