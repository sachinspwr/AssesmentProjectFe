import { Input, Label } from '@components/atoms';
import React, { ChangeEvent, ReactNode, useState } from 'react';

type CheckboxProps = DefaultProps & {
  name: string;
  label?: ReactNode;
  value: string;
  checked?: boolean;
  required?: boolean;
  wrapperClasses?: ClassName;
  labelClasses?: ClassName;
  onChange: (
    value: string,
    originalEvent?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    checked?: boolean
  ) => void;
};

function Checkbox({
  label,
  name,
  value,
  checked,
  required,
  wrapperClasses = '',
  labelClasses = '',
  className = '',
  onChange,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (value: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onChange(value, e, checked);
  };

  return (
    <div className={`inline-flex items-center w-full ${wrapperClasses}`}>
      <Input
        name={name}
        type="checkbox"
        value={value}
        checked={isChecked}
        required={required}
        onChange={(value, e) => handleChange(value, e as ChangeEvent<HTMLInputElement>)}
        className={`cursor-pointer !w-5 !h-5 !rounded ${className}`}
      />
      <Label className={`w-full ml-2 tracking-wide ${labelClasses}`}>{label}</Label>
    </div>
  );
}

export { Checkbox };
