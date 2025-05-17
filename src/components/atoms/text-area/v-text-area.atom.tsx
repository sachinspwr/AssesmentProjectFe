import React, { useEffect, useState } from 'react';

export type VTextAreaProps = DefaultProps & {
  name: string;
  rows?: number;
  cols?: number;
  value?: string; // Controlled value prop
  onChange: (value: string, originalEvent?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string; // Error message to display
  helpText?: string; // Help text displayed when there's no error
  regexPatterns?: { pattern: string; message: string }[]; // Array of regex patterns and corresponding messages
  reflectErrors?:boolean;
};

export function VTextArea({
  name,
  rows = 3,
  cols,
  value = '', // Default value for uncontrolled behavior
  placeholder = '',
  disabled = false,
  className = '',
  onChange,
  errorMessage,
  helpText,
  required = false,
  regexPatterns = [],
  reflectErrors = true
}: VTextAreaProps) {
  const [textAreaValue, setTextAreaValue] = useState<string>(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Sync internal state with the value prop
  useEffect(() => {
    if (value !== textAreaValue) {
      setTextAreaValue(value);
    }
  }, [value, textAreaValue]);

  useEffect(() => {
    if (touched) {
      if (required && (!textAreaValue || textAreaValue.trim() === '')) {
        if (validationError !== `${name} is required`) {
          setValidationError(`${name} is required`);
        }
        return;
      }
  
      const patternValidation = regexPatterns.find(({ pattern }) => !new RegExp(pattern).test(textAreaValue));
  
      if (patternValidation) {
        if (validationError !== patternValidation.message) {
          setValidationError(patternValidation.message);
        }
      } else if (validationError) {
        setValidationError(null);
      }
    }
  }, [touched, textAreaValue, required, regexPatterns, validationError, name]);
  

  // Handle text area change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setTextAreaValue(currentValue);
    setTouched(true); // Mark as touched
    onChange(currentValue, e);
  };

  // Conditional classes for error handling
  const defaultClasses = `w-full text-md border rounded-lg px-5 py-2.5`;
  const disabledClasses = `${
    disabled
      ? 'border-theme-default-disabled bg-theme-default-disabled'
      : 'border-theme-default focus:outline-none focus:ring-1 focus:ring-theme-primary'
  }`;
  const errorClasses = `${reflectErrors && (validationError || errorMessage) ? '!border-theme-negative focus:!ring-theme-negative' : ''}`;

  return (
    <div>
      <textarea
        name={name}
        rows={rows}
        cols={cols}
        className={`${defaultClasses} ${disabledClasses} ${errorClasses} ${className}`}
        value={textAreaValue ?? ''} // Controlled by textAreaValue state
        onChange={handleChange}
        placeholder={` ${placeholder}`}
        disabled={disabled}
      />

      {/* Display help text if no error */}
      {!(validationError || errorMessage) && helpText && (
        <p className="text-theme-primary text-sm mt-1 l-1">{helpText}</p>
      )}
      {/* Display error message if there's a validation error */}
      {reflectErrors && (validationError || errorMessage) && (
        <p className="text-theme-negative text-sm mt-1">{validationError || errorMessage}</p>
      )}
    </div>
  );
}