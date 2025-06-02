import React, { useState, useEffect } from 'react';
import { VInput } from '@components/atoms'; // Assuming VInput is available
import { VLabel } from '@components/atoms/label/v-label.atom';

export type VRadioOption = {
  label: string;
  value: string;
};

type VRadioButtonGroupProps = DefaultProps & {
  name: string;
  options: VRadioOption[];
  direction?: 'horizontal' | 'vertical';
  defaultValue?: string;
  groupLabel?: string;
  wrapperClasses?: string;
  optionContainerClasses?: string;
  labelClasses?: string;
  className?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

function VRadioButtonGroup({
  name,
  options,
  direction = 'vertical',
  defaultValue = '',
  groupLabel = '',
  wrapperClasses = '',
  optionContainerClasses = '',
  labelClasses = '',
  className = '',
  disabled=false,
  onChange,
}: VRadioButtonGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue); // Use defaultValue for initial selection

  // Handle change when a radio button is selected
  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (defaultValue && selectedValue === '') {
      setSelectedValue(defaultValue); // Set default value if not set yet
    }
  }, [defaultValue, selectedValue]);

  return (
    <div className={`w-full flex flex-col gap-2 ${wrapperClasses}`}>
      {/* Group label */}
      {groupLabel && <VLabel>{groupLabel}</VLabel>}

      {/* Radio buttons */}
      <div className={`flex ${direction === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-4'}`}>
        {options.map((option) => (
          <div key={option.value} className={`flex items-center ${optionContainerClasses}`}>
            <VInput
              type="radio"
              name={name}
              value={option.value}
              disabled={disabled}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value)} // Update selected value on change
              className={`!w-4 !h-4 !p-0 !rounded-full border-2 
              ${selectedValue === option.value ? 'bg-theme-primary border-theme-primary' : 'bg-transparent border-theme-default'} 
              focus:ring-0 transition-colors duration-150 ease-in-out ${className}`}
            />
            <label
              className={`ml-2 font-normal ${labelClasses} ${selectedValue === option.value ? 'text-theme-brand font-semibold' : 'text-theme-secondary'}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export { VRadioButtonGroup };
