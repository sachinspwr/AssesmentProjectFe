import React, { ReactNode, forwardRef } from 'react';
import { VLoader } from '@components/molecules/loader/v-loader.mol';

export type VButtonProps = DefaultProps & {
  label?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'positive' | 'negative' | 'link';
  size?: 'sm' | 'md';
  isLoading?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

const VButton = forwardRef<HTMLButtonElement, VButtonProps>(
  (
    {
      label,
      type = 'button',
      size = 'md',
      variant = 'primary',
      isLoading = false,
      disabled = false,
      className = '',
      children,
      onClick,
    },
    ref // <-- Receiving the ref
  ) => {
    const defaultStyle = `w-full relative flex flex-row justify-center items-center gap-1 rounded-md font-semibold cursor-pointer`;

    const baseVariantClass = {
      primary: 'border hover:text-theme-on-primary-hover hover:bg-theme-primary-hover',
      secondary: 'border hover:text-theme-on-secondary-hover hover:bg-theme-secondary-hover',
      positive: 'border hover:text-theme-on-positive-hover hover:bg-theme-positive-hover',
      negative: 'border hover:text-theme-on-negative-hover hover:bg-theme-negative-hover',
      link: 'hover:bg-theme-default-hover hover:text-theme-on-default-hover',
    };

    const disabledClass = disabled
      ? {
          primary: 'opacity-90 bg-theme-primary-disabled !border-theme-primary-disabled text-theme-on-primary-disabled !cursor-not-allowed',
          secondary:
            'opacity-90 bg-theme-secondary-disabled border-theme-secondary-disabled text-theme-on-secondary-disabled !cursor-not-allowed',
          positive:
            'opacity-90 bg-theme-positive-disabled border-theme-positive-disabled text-theme-on-positive-disabled !cursor-not-allowed',
          negative:
            'opacity-90 bg-theme-negative-disabled border-theme-negative-disabled text-theme-on-negative-disabled !cursor-not-allowed',
          link: 'opacity-90 !cursor-not-allowed text-theme-on-default-disabled',
        }
      : {
          primary: 'bg-theme-primary border-theme-primary text-theme-on-primary',
          secondary: 'bg-theme-secondary border-theme-secondary text-theme-on-secondary',
          positive: 'bg-theme-positive border-theme-positive text-theme-on-positive',
          negative: 'bg-theme-negative border-theme-negative text-theme-on-negative',
          link: 'text-theme-on-secondary',
        };

    const variantClass = `${baseVariantClass[variant]} ${disabledClass[variant]}`;

    const sizeClass = {
      sm: 'px-4 py-1 text-sm',
      md: 'px-4 py-2 text-md',
    }[size];

    return (
      <button
        ref={ref} // <-- Attaching ref to the button
        type={type}
        className={`${defaultStyle} ${variantClass} ${sizeClass} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="flex items-center justify-center gap-1">
          {isLoading ? <VLoader size="xs" position="inline" classNames={`${baseVariantClass[variant]}`} /> : ''}
          {children || label || 'Submit'}
        </span>
      </button>
    );
  }
);

VButton.displayName = 'VButton'; // Needed for debugging when using forwardRef

export { VButton };
