'use client';

import { Pagination } from "@mui/material"
import { useState } from "react";



export default function PaginationCard() {
    const [page, setPage] = useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

  return (
    <div>
        <Pagination 
            count={10} 
            page={page} 
            onChange={handleChange} 
            color="primary" 
            shape="rounded"
            size="large"
        />
    </div>
  )
}