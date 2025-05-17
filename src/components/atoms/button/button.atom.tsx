import { Loader } from '@components/molecules';
import React from 'react';

// Define the Props interface
type ButtonProps = DefaultProps & {
  type?: 'button' | 'submit';
  varient?: 'fill' | 'bordered' | 'no-background-border';
  disabled?: boolean;
  children?: React.ReactNode; // Make children optional
  label?: string; // New label property
  isLoading?: boolean;
  onClick?: () => void;
};

// Define the Button component using function declaration syntax
function Button({
  type = 'button',
  varient = 'fill',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  children,
  label,
}: ButtonProps) {
  let buttonStyle = `min-h relative inline-block rounded focus:outline-none focus:ring-4 focus:ring-skin-theme
         px-6 py-2 text-sm font-medium tracking-wider cursor-pointer`;
  switch (varient) {
    case 'fill':
      buttonStyle += ` text-skin-theme-invert bg-skin-theme-invert hover:bg-skin-theme-btn-hover ${className}`;
      break;
    case 'bordered':
      buttonStyle += ` text-skin-theme bg-skin-theme border-1 ${className}`;
      break;
    case 'no-background-border':
      buttonStyle += `text-skin-theme bg-skin-theme ${className}`;
      break;
    default:
      buttonStyle; // No change needed
  }

  return (
    <button type={type} className={`${buttonStyle} ${className} min-h-10`} onClick={onClick} disabled={disabled}>
      {isLoading ? <Loader /> : label || children} {/* Use label if provided, otherwise use children */}
    </button>
  );
}

export { Button };