import { forwardRef } from 'react';
import { Input, type InputProps, type TextareaOnlyProps, type BaseProps } from './Input';

// Base props we allow to pass through from Input's shared props
type BaseSubset = Pick<
  BaseProps,
  | 'variant'
  | 'inputSize'
  | 'errorMessage'
  | 'className'
  | 'inputClassName'
  | 'rightSlot'
  | 'disableFocusStyle'
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
>;

export type InputAreaProps = BaseSubset & Omit<TextareaOnlyProps, 'multiline'>; // Always multiline in this wrapper

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ rows = 3, autoResize = true, ...props }, ref) => {
    const merged = { ...props, multiline: true } as InputProps;
    return <Input {...merged} ref={ref} />;
  },
);

InputArea.displayName = 'InputArea';

export default InputArea;
