import React, { useEffect, useState } from 'react';
import { VTypography } from '@components/molecules/typography/v-typography.mol';

export type VTextAreaProps = DefaultProps & {
  name: string;
  rows?: number;
  cols?: number;
  value?: string;
  onChange: (value: string, originalEvent?: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  helpText?: string;
  regexPatterns?: { pattern: string; message: string }[];
  reflectErrors?: boolean;
  mode?: 'view' | 'edit';
  pageChildren?: React.ReactNode;
};

export function VTextArea({
  name,
  rows = 3,
  cols,
  value = '',
  placeholder = '',
  disabled = false,
  className = '',
  onChange,
  errorMessage,
  helpText,
  required = false,
  regexPatterns = [],
  reflectErrors = true,
  mode = 'edit',
  pageChildren,
}: VTextAreaProps) {
  const [textAreaValue, setTextAreaValue] = useState<string>(value);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (value !== textAreaValue) {
      setTextAreaValue(value);
    }
  }, [textAreaValue, value]);

  useEffect(() => {
    if (!touched) return;

    if (required && (!textAreaValue || textAreaValue.trim() === '')) {
      setValidationError(`${name} is required`);
      return;
    }

    const failedPattern = regexPatterns.find(({ pattern }) => !new RegExp(pattern).test(textAreaValue));
    setValidationError(failedPattern ? failedPattern.message : null);
  }, [textAreaValue, required, regexPatterns, touched, name]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    setTextAreaValue(currentValue);
    setTouched(true);
    onChange(currentValue, e);
  };

  const defaultClasses = `w-full text-md border rounded-lg px-5 py-2.5`;
  const disabledClasses = disabled
    ? 'border-theme-default-disabled bg-theme-default-disabled'
    : 'border-theme-default focus:outline-none focus:ring-1 focus:ring-theme-primary';
  const errorClasses = reflectErrors && (validationError || errorMessage)
    ? '!border-theme-negative focus:!ring-theme-negative'
    : '';

  const textAreaClasses = `${defaultClasses} ${disabledClasses} ${errorClasses} ${className}`.trim();

  const renderpage = () => (
    pageChildren ?? <VTypography className="pl-2 py-2">{textAreaValue || ''}</VTypography>
  );

  return (
    <div className="w-full flex flex-col">
      {mode === 'edit' ? (
        <textarea
          name={name}
          rows={rows}
          cols={cols}
          className={textAreaClasses}
          value={textAreaValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        renderpage()
      )}

      {helpText && !validationError && !errorMessage && (
        <p className="text-theme-primary text-sm mt-1 ml-1">{helpText}</p>
      )}
      {reflectErrors && (validationError || errorMessage) && (
        <p className="text-theme-negative text-sm mt-1">{validationError || errorMessage}</p>
      )}
    </div>
  );
}
