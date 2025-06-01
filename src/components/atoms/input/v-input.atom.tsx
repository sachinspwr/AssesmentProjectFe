import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { Icon } from '../icon/icon.atom';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

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
  onChange?: (value: string, originalEvent?: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  helpText?: string;
  regexPatterns?: { pattern: string; message: string }[];
  reflectErrors?: boolean;
  children?: React.ReactNode;
  mode?: 'view' | 'edit';
  pageChildren?: React.ReactNode;
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
  children,
  mode = 'edit',
  pageChildren,
}: VInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!touched) return;

    if (required && (!inputValue || (typeof inputValue === 'string' && inputValue.trim() === ''))) {
      setValidationError(`${name} is required`);
      return;
    }

    const failedPattern = regexPatterns.find(({ pattern }) => !new RegExp(pattern).test(String(inputValue)));

    if (failedPattern) {
      setValidationError(failedPattern.message);
    } else {
      setValidationError(null);
    }
  }, [inputValue, required, regexPatterns, touched, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setTouched(true);
    onChange?.(val, e);
  };

  const handleClick = () => {
    if (selectContentOnFocus && inputRef.current) {
      inputRef.current.select();
    }
  };

  const defaultClasses = `w-full text-md border rounded-lg px-5 py-2`;
  const disabledClasses = disabled
    ? 'border-theme-default-disabled bg-theme-default-disabled'
    : 'border-theme-default focus:outline-none focus:ring-1 focus:ring-theme-primary';
  const errorClasses =
    reflectErrors && (validationError || errorMessage) ? '!border-theme-negative focus:!ring-theme-negative' : '';

  const inputClasses = `${defaultClasses} ${disabledClasses} ${errorClasses} ${className}`.trim();

  const renderInput = () => (
    <input
      ref={inputRef}
      name={name}
      type={showPassword && type === 'password' ? 'text' : type}
      className={inputClasses}
      value={inputValue}
      placeholder={placeholder}
      checked={type === 'checkbox' || type === 'radio' ? checked : undefined}
      disabled={disabled}
      autoComplete="on"
      onChange={handleChange}
      onClick={handleClick}
    />
  );

  const renderpage = () => pageChildren ?? <VTypography className="pl-2 py-2">{inputValue || ''}</VTypography>;

  return (
    <div className={`${type === 'checkbox' || type === 'radio' ? 'w-fit' : 'w-full'} relative flex flex-col`}>
      <div className="relative">
        {mode === 'edit' ? renderInput() : renderpage()}

        {children && <div className="absolute inset-y-0 right-0 flex gap-1 items-center pr-1">{children}</div>}

        {type === 'password' && mode === 'edit' && (
          <div
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
            className="absolute inset-y-0 right-8 flex items-center cursor-pointer"
          >
            <Icon icon={MdOutlineRemoveRedEye} size={20} className="!text-theme-secondary" />
          </div>
        )}
      </div>

      {helpText && !validationError && !errorMessage && (
        <p className="text-theme-muted text-xs mt-1 ml-1">{helpText}</p>
      )}

      {reflectErrors && (validationError || errorMessage) && (
        <p className="text-theme-negative text-sm mt-1">{validationError || errorMessage}</p>
      )}
    </div>
  );
}
