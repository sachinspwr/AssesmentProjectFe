import React from 'react';
import { VInput, VInputProps } from '@components/atoms'; // Importing VInput and its props
import { VLabel, VLabelProps } from '@components/atoms/label/v-label.atom'; // Importing VLabel and its props

type VLabelledInputProps = VLabelProps &
  VInputProps & {
    wrapperClasses?: string;
    labelClasses?: string;
    inputClasses?: string;
  };

function VLabelledInput({ wrapperClasses = '', labelClasses = '', inputClasses = '', ...props }: VLabelledInputProps) {
  const { label, htmlFor, className, ...inputProps } = props;

  return (
    <div className={`flex flex-col gap-2 ${wrapperClasses}`}>
      {/* Label */}
      <VLabel htmlFor={htmlFor || inputProps.name} className={labelClasses}>
        {label}
      </VLabel>

      {/* Input */}
      <VInput {...inputProps} className={`${className} ${inputClasses}`} />
    </div>
  );
}

export { VLabelledInput };
