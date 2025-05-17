import React from 'react';
import { VButton, VButtonProps } from '@components/atoms'; // Importing VButton and VButtonProps
import { VICon, VIConProps } from '@components/atoms/icon/v-icon.atom'; // Importing VICon

export type VIConButtonProps = VButtonProps & {
  iconProps: VIConProps;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
};

function VIConButton({
  iconProps,
  iconPosition = 'left',
  isLoading = false,
  children,
  label,
  ...buttonProps
}: VIConButtonProps) {
  return (
    <VButton
      {...buttonProps}
      className={`flex justify-center items-center gap-2 ${buttonProps.className}`}
      disabled={buttonProps.disabled}
    >
      {/* Render the icon if not loading and position is left */}
      {!isLoading && iconPosition === 'left' && iconProps && <VICon size={20} {...iconProps} />}
      {children || label}
      {/* Render the icon if not loading and position is right */}
      {!isLoading && iconPosition === 'right' && iconProps && <VICon size={20} {...iconProps} />}
      {/* Show a loader when isLoading is true */}
    </VButton>
  );
}

export { VIConButton };
