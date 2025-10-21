'use client';
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
    setTimeout(() => set({ isOpen: false }), 2000);
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

  return (
    <div className={`fixed right-6 bottom-6 rounded-md px-4 py-3 text-white shadow-lg ${bg}`}>
      {message}
    </div>
  );
}
