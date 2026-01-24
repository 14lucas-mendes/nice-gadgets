'use client';

import { type ReactNode } from 'react';

interface GridViewProps {
  children: ReactNode;
}

export function GridView({ children }: GridViewProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
    >
      {children}
    </div>
  );
}
