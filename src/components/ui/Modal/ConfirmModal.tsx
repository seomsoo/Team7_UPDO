'use client';
import * as React from 'react';
import Modal from './Modal';
import { cn } from '@/utils/cn';

type ConfirmTone = 'neutral' | 'brand' | 'danger';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: string;

  tone?: ConfirmTone;

  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;

  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

export default function ConfirmModal({
  open,
  onOpenChange,
  content,
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

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      initialFocusRef={confirmRef as React.RefObject<HTMLElement>}
      className="h-[216px] w-[342px] rounded-xl p-6 md:h-[289px] md:w-[600px] md:rounded-3xl md:p-10 md:pt-12">
      <Modal.Header
        onClose={() => {
          onOpenChange(false);
        }}
        className="p-0"
      />
      <Modal.Body className="card-title md:page-title flex flex-col items-center p-0 pt-6 text-center text-gray-700">
        <p>{content}</p>
      </Modal.Body>

      <Modal.Footer className="h-12 gap-3 p-0 md:h-15">
        <div className="flex h-full w-full justify-between gap-3">
          <button
            type="button"
            className="typo-body md:typo-subtitle h-full w-full cursor-pointer rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
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
              'bg-purple-450 typo-body-bold md:h5Bold md:bg-purple-250 md:hover:bg-purple-450 text-white hover:bg-purple-600',
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
