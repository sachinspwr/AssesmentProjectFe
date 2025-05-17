import React, { useState } from 'react';

export type InputFieldTypes = 'text' | 'email' | 'password' | 'number' | 'checkbox' | 'radio' | 'hidden' | 'date';

export type InputProps = DefaultProps & {
  type?: InputFieldTypes;
  name: string;
  value?: string;
  placeholder?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  onChange: (value: string, originalEvent?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function Input({
  type = 'text',
  name,
  value = '',
  placeholder = '',
  checked = false,
  disabled = false,
  className = '',
  onChange,
}: InputProps) {
  const classes = `w-full placeholder-gray-400 text-skin-theme text-md bg-skin-theme border border-gray-300 
                   focus:ring-skin-theme focus:border-skin-theme rounded-lg  ${className}`;

  // remember current value
  const [inputValue, setInputValue] = useState<string | number>(value);

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setInputValue(currentValue);
    onChange(currentValue, e);
  };

  return (
    <input
      name={name}
      type={type}
      className={classes}
      value={inputValue}
      placeholder={placeholder}
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
    />
  );
}
