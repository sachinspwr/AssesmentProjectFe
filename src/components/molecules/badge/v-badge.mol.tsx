import { VICon } from '@components/atoms';
import React, { ReactNode } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export type BadgeVariant = 'default' | 'positive' | 'negative' | 'warning' | 'primary' | 'outline';

interface VBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  onRemove?: (id?: string) => void;
  variant?: BadgeVariant;
  removable?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

function VBadge({
  label,
  onRemove,
  variant = 'default',
  removable = false,
  icon,
  size = 'md',
  className = '',
  children,
  ...props
}:VBadgeProps) {
  const getVariantClasses = () => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium';
    const sizeClasses = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-1',
      lg: 'text-base px-3 py-1.5'
    };

    const variantClasses = {
      default: 'bg-theme-default-alt text-theme-secondary',
      positive: 'bg-theme-positive-lite text-theme-positive',
      negative: 'bg-theme-negative-lite text-theme-negative',
      warning: 'bg-theme-warning-lite text-theme-warning',
      primary: 'bg-theme-primary-lite text-theme-brand',
      outline: 'bg-transparent border border-theme-border text-theme-body'
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span
      className={`${getVariantClasses()} ${className}`}
      {...props}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
      {children}
      {(removable || onRemove) && (
        <button
          type="button"
          onClick={handleRemove}
          className="ml-1.5 -mr-0.5 focus:outline-none"
          aria-label="Remove badge"
        >
          <VICon icon={IoCloseOutline} size={16} className="opacity-70 hover:opacity-100" />
        </button>
      )}
    </span>
  );
};

export { VBadge };