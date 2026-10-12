'use client';

import { CircleX, Menu } from 'lucide-react';
import type { RefObject } from 'react';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  buttonRef?: RefObject<HTMLButtonElement | null>;
}

export default function MenuButton({ isOpen, onClick, buttonRef }: MenuButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className="flex items-center justify-center p-2 sm:hidden"
      aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      {isOpen ? (
        <CircleX className="w-6 h-6" aria-hidden="true" />
      ) : (
        <Menu className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}
