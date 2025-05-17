import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Icon } from '../icon/icon.atom';

export type VInputFieldTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'hidden'
  | 'date'
  | 'file';

export type VInputProps = DefaultProps & {
  type?: VInputFieldTypes;
  name: string;
  value?: string;
  placeholder?: string;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  selectContentOnFocus?: boolean;
  onChange?: (value: string, originalEvent?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorMessage?: string; // Error message to display
  helpText?: string; // Help text displayed when there's no error
  regexPatterns?: { pattern: string; message: string }[]; // Array of regex patterns and corresponding messages
  reflectErrors?: boolean;
  children?: React.ReactNode; // Custom content to display inside the input container
};

export function VInput({
  type = 'text',
  name,
  value = '',
  placeholder = '',
  checked = false,
  disabled = false,
  className = '',
  onChange,
  errorMessage,
  helpText,
  required = false,
  selectContentOnFocus = false,
  regexPatterns = [],
  reflectErrors = true,
  children, // Custom content
}: VInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string | number>(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Validate input value based on regex patterns
  useEffect(() => {
    if (touched && required && (!inputValue || inputValue === '')) {
      setValidationError(`${name} is required`);
    } else {
      const patternValidation = regexPatterns.find(({ pattern }) => !new RegExp(pattern).test(String(inputValue)));

      if (patternValidation) {
        setValidationError(patternValidation.message); // Show the first matching error message
      } else {
        setValidationError(null); // Clear any errors if validation passes
      }
    }
  }, [name, inputValue, required, regexPatterns, touched]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setInputValue(currentValue);
    setTouched(true); // Mark as touched
    onChange && onChange(currentValue, e);
  };

  const handleClick = () => {
    if (selectContentOnFocus && inputRef.current) {
      inputRef.current.select();
    }
  };

  // Conditional classes for error handling
  const defaultClasses = `w-full text-md border rounded-lg px-5 py-2`;
  const disabledClasses = `${disabled
    ? 'border-theme-default-disabled bg-theme-default-disabled'
    : 'border-theme-default focus:outline-none focus:ring-1 focus:ring-theme-primary'
  }`;
  const errorClasses = `${reflectErrors && (validationError || errorMessage) ? '!border-theme-negative focus:!ring-theme-negative ' : ''}`;

  return (
    <div className={`${type === 'radio' || type === 'checkbox' ? 'w-fit' : 'w-full'} relative flex flex-col`}>
      {/* Input container with custom content */}
      <div className="relative">
        <input
          ref={inputRef}
          name={name}
          type={showPassword ? 'text' : type}
          className={`${defaultClasses} ${disabledClasses} ${errorClasses} ${className}`}
          value={inputValue}
          placeholder={` ${placeholder}`}
          checked={checked}
          disabled={disabled}
          autoComplete="off"
          onChange={handleChange}
          onClick={handleClick}
        />
        {/* Custom content (e.g., icons, buttons) */}
        {children && (
          <div className="absolute inset-y-0 right-0 flex gap-1 items-center pr-1">
            {children}
          </div>
        )}
        {/* Password visibility toggle */}
        {type === 'password' && (
          <div
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            className="absolute inset-y-0 right-2 flex items-center"
          >
            <Icon icon={MdOutlineRemoveRedEye} size={20} className="!text-theme-secondary" />
          </div>
        )}
      </div>
      {/* Display help text if no error */}
      {!(validationError || errorMessage) && helpText && (
        <p className="text-theme-muted text-xs mt-1 ml-1">{helpText}</p>
      )}
      {/* Display error message if there's a validation error */}
      {reflectErrors &&(validationError || errorMessage) && (
        <p className="text-theme-negative text-sm mt-1">{validationError || errorMessage}</p>
      )}
    </div>
  );
}