import React, { ReactNode } from 'react';

export type LabelProps = DefaultProps & {
  htmlFor?: string;
  children?: ReactNode;
};

export function Label({ htmlFor, className = '', children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`block !text-theme-primary text-md font-normal ${className}`}>
      {children}
    </label>
  );
}
