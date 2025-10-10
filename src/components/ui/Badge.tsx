import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const badgeStyles = cva(
  'inline-flex items-center justify-center select-none tabular-nums rounded-full bg-[var(--color-purple-250)] text-white',
  {
    variants: {
      size: {
        sm: 'h-4 min-w-[1rem] px-[7px] badge-xs',
        lg: 'h-6 min-w-[1.5rem] px-[10px] badge-lg',
      },
    },
    defaultVariants: { size: 'sm' },
  },
);

export type BadgeStyleProps = VariantProps<typeof badgeStyles>;

export type BadgeProps = React.ComponentPropsWithoutRef<'span'> &
  BadgeStyleProps & {
    as?: 'span' | 'div' | 'a' | 'button';
    value: number; // 0이면 렌더링 안 됨
    max?: number; // 기본 99, 초과 시 "99+"
    formatter?: (n: number, max: number) => React.ReactNode;
    ariaLive?: 'off' | 'polite' | 'assertive';
  };

export default function Badge({
  as = 'span',
  value,
  max = 99,
  formatter,
  ariaLive = 'polite',
  size = 'sm',
  className,
  ...rest
}: BadgeProps) {
  if (value === 0) return null; // 업데이트 0이면 숨김

  const Comp = as as React.ElementType;
  const display =
    typeof formatter === 'function'
      ? formatter(value, max)
      : value > max
        ? `${max}+`
        : String(value);

  return (
    <Comp
      role="status"
      aria-live={ariaLive}
      aria-label={`${value}개의 업데이트`}
      className={cn(badgeStyles({ size }), className)}
      {...rest}>
      {display}
    </Comp>
  );
}
