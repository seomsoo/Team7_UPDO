import { forwardRef } from 'react';
import { Input, InputProps } from './Input';

export type InputAreaProps = Omit<InputProps, 'multiline' | 'type'> & {
  autoResize?: boolean;
  rows?: number;
};

const InputArea = forwardRef<HTMLTextAreaElement, InputAreaProps>(
  ({ rows = 3, autoResize = true, ...props }, ref) => {
    return <Input {...props} multiline autoResize={autoResize} rows={rows} ref={ref} />;
  },
);

InputArea.displayName = 'InputArea';

export default InputArea;
