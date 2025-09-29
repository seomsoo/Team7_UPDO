import React from 'react';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function TextField({ ...props }: TextFieldProps) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        props.className || ''
      }`}
    />
  );
}
