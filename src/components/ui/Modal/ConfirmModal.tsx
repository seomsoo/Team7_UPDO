'use client';
import * as React from 'react';
import Modal from './Modal';
import { cn } from '@/utils/cn';

type ConfirmTone = 'neutral' | 'brand' | 'danger';
type ConfirmSize = 'small' | 'large';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;

  size?: ConfirmSize; // 'small' | 'large'
  tone?: ConfirmTone;

  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;

  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const sizeStyles: Record<
  ConfirmSize,
  {
    modal: string;
    padding: string;
    height: string;
    font: string;
    confirmButton: string;
    cancelButton: string;
  }
> = {
  small: {
    modal: 'w-[342px] h-[216px]',
    padding: 'p-6',
    height: 'h-12',
    font: 'card-title',
    confirmButton: 'bg-purple-450 hover:bg-purple-600 text-white typo-body-bold',
    cancelButton: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 typo-body',
  },
  large: {
    modal: 'w-[600px] h-[289px]',
    padding: 'p-10 pt-12',
    height: 'h-15',
    font: 'page-title',
    confirmButton: 'bg-purple-250 hover:bg-purple-450 text-white h5Bold',
    cancelButton: 'typo-subtitle hover:bg-gray-50',
  },
};

export default function ConfirmModal({
  open,
  onOpenChange,
  content,
  size = 'small',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const confirmRef = React.useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) {
      onOpenChange(false);
      return;
    }
    try {
      setLoading(true);
      await onConfirm();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  const { modal, padding, height, font, confirmButton, cancelButton } = sizeStyles[size];

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      initialFocusRef={confirmRef as React.RefObject<HTMLElement>}
      className={cn(modal, padding)}>
      <Modal.Header
        onClose={() => {
          onOpenChange(false);
        }}
        className="p-0"
      />
      <Modal.Body
        className={cn('flex flex-col items-center p-0 pt-6 text-center text-gray-700', font)}>
        <p>{content}</p>
      </Modal.Body>

      <Modal.Footer className={cn('gap-3 p-0', height)}>
        <div className="flex h-full w-full justify-between gap-3">
          <button
            type="button"
            className={cn('h-full w-full cursor-pointer rounded-md', cancelButton)}
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            disabled={loading}>
            취소
          </button>

          <button
            ref={confirmRef}
            type="button"
            className={cn(
              'h-full w-full cursor-pointer rounded-md transition-colors',
              loading && 'cursor-not-allowed opacity-70',
              confirmButton,
            )}
            onClick={handleConfirm}
            disabled={loading}>
            {loading ? '처리 중...' : '확인'}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
