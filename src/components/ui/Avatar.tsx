import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
};

export default function Avatar({
  size = 'md',
  src,
  alt,
  children,
  className = '',
  ...props
}: AvatarProps) {
  const combinedClassName = `inline-flex items-center justify-center rounded-full bg-gray-200 overflow-hidden ${sizeClasses[size]} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-gray-700">{children}</span>
      )}
    </div>
  );
}
