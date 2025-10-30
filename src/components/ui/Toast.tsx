'use client';
import { createPortal } from 'react-dom';
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info';
interface ToastState {
  message: string;
  type: ToastType;
  isOpen: boolean;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToast = create<ToastState>(set => ({
  message: '',
  type: 'info',
  isOpen: false,
  showToast: (message, type = 'info') => {
    set({ message, type, isOpen: true });
    setTimeout(() => set({ isOpen: false }), 3000);
  },
  hideToast: () => set({ isOpen: false }),
}));

export function Toast() {
  const { message, type, isOpen } = useToast();

  if (!isOpen) return null;
  const bg = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-600',
  }[type];

  const node = (
    <div aria-live="polite" className="pointer-events-none fixed inset-0 z-[99999]">
      <div
        className={`pointer-events-auto absolute right-6 bottom-6 rounded-md px-4 py-3 text-white shadow-lg ${bg}`}>
        {message}
      </div>
    </div>
  );

  return typeof window !== 'undefined' ? createPortal(node, document.body) : node;
}
