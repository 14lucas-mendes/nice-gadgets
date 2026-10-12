'use client';

import { useRef, type RefObject } from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';
import { AccessibleDialog } from '@/components/Dialog/AccessibleDialog';
import { formatCurrency } from '@/lib/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalPrice: number;
  itemCount: number;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

export function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
  itemCount,
  returnFocusRef,
}: CheckoutModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <AccessibleDialog
      open={isOpen}
      onClose={onClose}
      titleId="checkout-dialog-title"
      descriptionId="checkout-dialog-description"
      initialFocusRef={closeButtonRef}
      returnFocusRef={returnFocusRef}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="Fechar diálogo"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mb-4 flex justify-center" aria-hidden="true">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-purple-900">
          <ShoppingBag className="h-8 w-8 text-orange-500 dark:text-purple-400" />
        </div>
      </div>

      <h2
        id="checkout-dialog-title"
        className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white"
      >
        Confirmar simulação
      </h2>

      <p
        id="checkout-dialog-description"
        className="mb-6 text-center text-gray-600 dark:text-gray-300"
      >
        Você está prestes a simular uma compra de <strong>{itemCount}</strong>{' '}
        {itemCount === 1 ? 'item' : 'itens'}, totalizando{' '}
        <strong>{formatCurrency(totalPrice)}</strong>.
      </p>

      <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-purple-800 dark:bg-purple-950">
        <p className="text-center text-sm text-orange-800 dark:text-purple-200">
          Esta é uma demonstração: confirmar limpa os itens do carrinho, mas não processa
          pagamento nem cria um pedido.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-bold text-gray-900 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-bold text-white transition-colors hover:bg-green-600"
        >
          <Check className="h-5 w-5" />
          Confirmar e limpar
        </button>
      </div>
    </AccessibleDialog>
  );
}
