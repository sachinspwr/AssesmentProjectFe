import { VInput } from '@components/atoms';
import { VLabel } from '@components/atoms/label/v-label.atom';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';

type VCheckboxProps = DefaultProps & {
  name: string;
  label?: ReactNode;
  value: string;
  checked?: boolean;
  required?: boolean;
  wrapperClasses?: ClassName;
  labelClasses?: ClassName;
  onChange?: (
    value: string,
    originalEvent?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
  ) => void;
  disabled?: boolean;
};

function VCheckbox({
  label,
  name,
  value,
  checked,
  required,
  disabled,
  wrapperClasses = '',
  labelClasses = '',
  className = '',
  onChange,
}: VCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onChange && onChange(value, e, checked);
  };

  return (
    <div className={`inline-flex items-center w-full ${wrapperClasses}`}>
      <VInput
        name={name}
        type="checkbox"
        value={value}
        checked={isChecked}
        required={required}
        disabled={disabled}
        onChange={(value, e) => handleChange(value, e as ChangeEvent<HTMLInputElement>)}
        className={`cursor-pointer !w-4 !h-4 !p-0 !rounded ${className}`}
        reflectErrors={false}
      />
      <VLabel className={`w-full ml-2 tracking-wide  ${labelClasses}`}>{label}</VLabel>
    </div>
  );
}

export { VCheckbox };
