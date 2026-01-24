'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ProductPaginationProps) {
  const handlePageChange = (page: number) => {
    onPageChange({} as React.ChangeEvent<unknown>, page);
  };

  const generatePaginationItems = (): (number | string)[] => {
    // Sempre mostra até 7 páginas
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: (number | string)[] = [1];

    if (currentPage > 3) {
      items.push('ellipsis-start');
    }

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

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex w-full justify-center items-center mt-10">
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (canGoPrevious) handlePageChange(currentPage - 1);
              }}
              className={!canGoPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              aria-disabled={!canGoPrevious}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {generatePaginationItems().map((item, index) => {
            if (typeof item === 'string') {
              return (
                <PaginationItem key={`${item}-${index}`}>
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
                  aria-label={`Ir para página ${item}`}
                  aria-current={currentPage === item ? 'page' : undefined}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (canGoNext) handlePageChange(currentPage + 1);
              }}
              className={!canGoNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              aria-disabled={!canGoNext}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
