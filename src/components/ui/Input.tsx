import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import { type VariantProps, cva } from 'class-variance-authority';

import Icon from './Icon';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  rightSlot?: React.ReactNode;
}

export const INPUT_VARIANT = {
  default: '',
  toggle: 'border border-gray-50', // dropdown 완성 후 추가 개발
  typing: 'border-[1px] border-purple-400',
  done: 'border-[1px] border-gray-50',
};

const inputVariants = cva(
  'flex w-full rounded-md px-4 py-2.5 outline-none transition text-gray-700 bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: INPUT_VARIANT,
      inputSize: {
        lg: 'typo-base leading-6',
        sm: 'typo-sm leading-5',
      },
      isError: {
        true: 'border-[1px] border-red-500 text-gray-700',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'lg',
      isError: false,
    },
  },
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputSize, type, errorMessage, className, inputClassName, rightSlot, ...props }, ref) => {
    const isPasswordField = type === 'password';
    const [showPassword, setShowPassword] = useState(false);

    const isError = !!errorMessage?.trim();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!(props.value ?? props.defaultValue));

    // 외부에서 값이 업데이트되어도 setIsFilled가 바뀔 수 있도록 수정
    useEffect(() => {
      setIsFilled(!!(props.value ?? props.defaultValue));
    }, [props.value, props.defaultValue]);

    const currentVariant = isFocused ? 'typing' : isFilled ? 'done' : 'default';

    const errorId = props.id ? `${props.id}-error` : undefined;

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    return (
      <>
        <div
          className={cn(inputVariants({ variant: currentVariant, inputSize, isError }), className)}>
          <input
            ref={ref}
            className={cn(
              'flex-1 outline-none placeholder:text-gray-400 disabled:placeholder:text-gray-400',
              inputClassName,
            )}
            type={isPasswordField ? (showPassword ? 'text' : 'password') : (type ?? 'text')}
            onFocus={e => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              setIsFilled(!!e.currentTarget.value);
              props.onBlur?.(e);
            }}
            onChange={e => {
              setIsFilled(!!e.currentTarget.value);
              props.onChange?.(e);
            }}
            aria-invalid={!!isError}
            aria-describedby={isError && errorId ? errorId : undefined}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="shrink-0 cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <Icon name="visibility_on" /> : <Icon name="visibility_off" />}
            </button>
          )}
          {rightSlot && <div className="shrink-0">{rightSlot}</div>}
        </div>

        <p id={errorId} className="typo-sm pt-1 pl-4 text-red-500" role="alert" aria-live="polite">
          {isError && errorMessage ? errorMessage : null}
        </p>
      </>
    );
  },
);

Input.displayName = 'Input';
