'use client';

import { CircleX, Menu } from 'lucide-react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-2 sm:hidden"
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <CircleX className="w-6 h-6" aria-hidden="true" />
      ) : (
        <Menu className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}
