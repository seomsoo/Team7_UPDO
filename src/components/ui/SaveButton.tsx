'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import SaveFilled from './Icon/Icons/SaveFilled';
import SaveOutline from './Icon/Icons/SaveOutline';

export interface SaveButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

export default function SaveButton({
  isSaved,
  onToggle,
  size = 48,
  className,
  ariaLabel = '찜하기',
}: SaveButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      aria-label={ariaLabel}
      aria-pressed={isSaved}
      className={cn('relative inline-flex cursor-pointer items-center justify-center', className)}
      style={{
        width: size,
        height: size,
        background: 'none',
        border: 'none',
        padding: 0,
        outline: 'none',
      }}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
      {/* Default (Outline) */}
      <div className="absolute inset-0">
        <SaveOutline size={size} />
      </div>

      {/* Active (Filled) */}
      <AnimatePresence>
        {isSaved && (
          <motion.div
            key="filled"
            className="absolute inset-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 25,
              mass: 0.5,
            }}>
            <SaveFilled size={size} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 반짝임 효과 */}
      {isSaved && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.3, opacity: [0, 0.4, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}>
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, color-mix(in srgb, var(--color-purple-400) 30%, transparent) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}
    </motion.button>
  );
}
