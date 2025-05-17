import React, { useState } from 'react';

export type TextAreaProps = DefaultProps & {
  name: string;
  rows?: number;
  cols?: number;
  value?: string;
  onChange: (value: string, originalEvent?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function TextArea({
  name,
  rows = 3,
  cols,
  value = '',
  placeholder = '',
  disabled = false,
  className = '',
  onChange,
}: TextAreaProps) {
  const classes = `w-full placeholder-gray-400 text-skin-theme text-md bg-skin-theme border border-gray-300 
                   focus:ring-skin-theme focus:border-skin-theme rounded-lg ${className}`;

  // remember current value
  const [textAreaValue, setTextAreaValue] = useState<string>(value);

  // handle TextArea change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setTextAreaValue(currentValue);
    onChange(currentValue, e);
  };

  return (
    <textarea
      name={name}
      rows={rows}
      cols={cols}
      className={classes}
      value={textAreaValue}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
