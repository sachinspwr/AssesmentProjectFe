import { VTypography, VTypographyProps } from '@components/molecules/typography/v-typography.mol';
import React, { ReactNode } from 'react';

export type VLabelProps = DefaultProps &
  VTypographyProps & {
    label?: ReactNode;
    htmlFor?: string;
    children?: ReactNode;
    className?: string;
    ariaLabel?: string;
    required?: boolean;
  };

export function VLabel({
  label,
  htmlFor,
  className = '',
  children,
  ariaLabel,
  required = false,
  ...rest
}: VLabelProps) {
  return (
    <VTypography
      as="label"
      htmlFor={htmlFor}
      className={`text-theme-secondary ${className}`}
      aria-label={ariaLabel} // Added aria-label for better accessibility
      {...rest}
    >
      {(label && <>{label}</>) || children || (required && <span className="text-theme-negative">*</span>)}
      {/* Optionally display the asterisk for required fields */}
    </VTypography>
  );
}
