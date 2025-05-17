import React from 'react';
import { VInput, VInputProps } from '@components/atoms'; // Importing VInput and its props
import { VICon, VIConProps } from '@components/atoms/icon/v-icon.atom'; // Importing VICon for the icon

export type VIConInputProps = VInputProps & {
  iconProps: VIConProps;
  iconPosition?: 'left' | 'right';
  wrapperClasses?: string;
};

function VIConInput({
  iconProps,
  iconPosition = 'left',
  className = '',
  wrapperClasses = '',
  ...inputProps // Spread the rest of the props for VInput
}: VIConInputProps) {
  return (
    <div className={`relative flex items-center w-full ${wrapperClasses}`}>
      {/* Render the icon if position is left */}
      {iconPosition === 'left' && (
        <VICon {...iconProps} className={`absolute left-2 z-10 !text-theme-secondary ${iconProps?.className}`} />
      )}

      {/* Input field */}
      <VInput
        {...inputProps}
        className={`w-full ${iconPosition === 'left' ? 'pl-10' : ''} ${iconPosition === 'right' ? 'pr-10' : ''} ${className}`}
      />

      {/* Render the icon if position is right */}
      {iconPosition === 'right' && (
        <VICon {...iconProps} className={`absolute right-2 z-10 !text-theme-secondary ${iconProps?.className}`} />
      )}
    </div>
  );
}

export { VIConInput };
