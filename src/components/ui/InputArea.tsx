import { forwardRef } from 'react';
import { Input, type InputProps } from './Input';
import type { BaseProps, TextareaOnlyProps } from './Input';

// Make BaseProps textarea-safe by omitting shared handlers and re-adding textarea-specific ones
type BaseWithoutHandlers = Omit<BaseProps, 'onFocus' | 'onBlur' | 'onChange'>;

export type InputAreaProps = BaseWithoutHandlers &
  Omit<TextareaOnlyProps, 'multiline'> & {
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  };

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ rows = 3, autoResize = true, ...props }, ref) => {
    const merged = { ...props, multiline: true, autoResize, rows } as InputProps;
    return <Input {...merged} ref={ref} />;
  },
);

InputArea.displayName = 'InputArea';

export default InputArea;
