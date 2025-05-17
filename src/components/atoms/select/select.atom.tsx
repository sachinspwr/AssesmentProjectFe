import React, { useEffect, useState } from 'react';

export type SelectProps = DefaultProps & {
  name?: string;
  value?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string, originalEvent?: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Select({
  name,
  value,
  options,
  disabled,
  className = '',
  onChange,
  required = false,
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string>(value || '');

  useEffect(() => {
    if (value === undefined) {
      setSelectedValue('');
    } else {
      setSelectedValue(value);
    }
  }, [value]);

  const classes = `w-full placeholder-gray-400 text-skin-theme text-md bg-skin-theme border border-gray-300 
                   focus:ring-skin-theme focus:border-skin-theme rounded-lg ${className}`;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.target.value;
    setSelectedValue(currentValue);
    onChange(currentValue, e);
  };

  return (
    <select
      name={name}
      value={selectedValue}
      disabled={disabled}
      onChange={handleChange}
      className={classes}
      required={required}
    >
      <option value="" disabled={required}>
        {required ? 'Please select an option' : 'Select an option'}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
