'use client';

import { formatCurrency } from '@/lib/formatters';
import { X, ShoppingBag, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalPrice: number;
  itemCount: number;
}

export function CheckoutModal({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
  itemCount,
}: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-orange-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-orange-500 dark:text-purple-400" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Confirmar compra
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Você está prestes a concluir a compra de <strong>{itemCount}</strong>{' '}
          {itemCount === 1 ? 'item' : 'items'} totalizando{' '}
          <strong>{formatCurrency(totalPrice)}</strong>.
        </p>

        <div className="bg-orange-50 dark:bg-purple-950 border border-orange-200 dark:border-purple-800 rounded-lg p-4 mb-6">
          <p className="text-sm text-orange-800 dark:text-purple-200 text-center">
            ⚠️ Esta é uma simulação de demonstração. Nenhuma compra real será efetuada.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
