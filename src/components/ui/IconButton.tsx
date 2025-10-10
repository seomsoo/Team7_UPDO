import * as React from 'react';
import { cn } from '@/utils/cn';
import Icon from '@/components/ui/Icon';

interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  label?: string;
  size?: 'desktop' | 'mobile';
}

export const IconButton = ({ label, size = 'desktop', className, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        'flex items-center justify-center bg-[var(--color-primary)] text-white transition-colors focus:outline-none active:bg-[var(--color-primary-active)]',
        size === 'mobile' && 'h-[48px] w-[48px] rounded-full',
        size === 'desktop' &&
          'h5Bold h-[64px] w-[194px] gap-1.5 rounded-xl hover:bg-[var(--color-primary-hover)]',
        className,
      )}
      {...props}>
      <Icon name="plus" size={32} className="shrink-0" />
      {size === 'desktop' && label && <span>{label}</span>}
    </button>
  );
};
