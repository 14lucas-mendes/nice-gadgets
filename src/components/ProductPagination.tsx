import { Pagination } from "@mui/material"

type PaginationCardProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}


export default function ProductPagination({ currentPage, totalPages, onPageChange }: PaginationCardProps) {
    

  return (
    <div className="flex w-full justify-center items-center mt-10">
        <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={onPageChange} 
            color="primary" 
            shape="rounded"
            size="large"
        />
    </div>
  )
}