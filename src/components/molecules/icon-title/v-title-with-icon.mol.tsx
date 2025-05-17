import React, { ReactNode } from 'react';
import { VICon, VIConProps } from '@components/atoms/icon/v-icon.atom'; // Import the VIConProps type
import { VTypography, VTypographyProps } from '../typography/v-typography.mol';

// Extend VIConProps to support all its props along with title, and className
type VTitleWithIconProps = VIConProps &
  VTypographyProps & {
    title?: React.ReactNode;
    className?: string;
    children?: ReactNode;
  };

function VTitleWithIcon({ title, className = '', children, ...props }: VTitleWithIconProps) {
  return (
    <div className={`w-full flex items-center gap-3 ${className}`}>
      <VICon {...props} />
      <VTypography {...props}>{title ?? children}</VTypography>
    </div>
  );
}

export { VTitleWithIcon };
