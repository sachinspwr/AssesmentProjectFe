import React, { useState, useEffect } from 'react';
import { VInput, VInputProps } from '../input/v-input.atom';
import { VICon } from '../icon/v-icon.atom';
import { FaMinus, FaPlus } from 'react-icons/fa6';

export type VNumberInputProps = Omit<VInputProps, 'type' | 'onChange' | 'value'> & {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange?: (value: number, originalEvent?: React.ChangeEvent<HTMLInputElement>) => void;
};

export function VNumberInput({
  value = 0,
  min,
  max,
  step = 1,
  unit,
  onChange,
  className = '',
  ...props
}: VNumberInputProps) {
  const [displayValue, setDisplayValue] = useState<string>(String(value));

  // Only update display value when the prop changes
  useEffect(() => {
    setDisplayValue(String(value));
  }, [value]);

  const handleChange = (value: string, e?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value === '') {
      setDisplayValue('');
      return;
    }

    const numValue = Number(value);
    if (!isNaN(numValue)) {
      let clampedValue = numValue;
      if (min !== undefined) clampedValue = Math.max(clampedValue, min);
      if (max !== undefined) clampedValue = Math.min(clampedValue, max);

      setDisplayValue(String(clampedValue));
      onChange?.(clampedValue, e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const adjustValue = (delta: number) => {
    const current = displayValue === '' ? (min ?? 0) : Number(displayValue);
    let newValue = current + delta;
    
    if (min !== undefined) newValue = Math.max(newValue, min);
    if (max !== undefined) newValue = Math.min(newValue, max);

    setDisplayValue(String(newValue));
    onChange?.(newValue);
  };

  return (
    <VInput
      {...props}
      type="number"
      value={displayValue}
      onChange={handleChange}
      className={`number-input ${className}`}
      children={
        <>
          {unit && <span className="unit-tag">{unit}</span>}
          {step > 1 && (
            <div className="mr-2 flex gap-2">
              <VICon 
                icon={FaPlus} 
                size={12} 
                onClick={() => adjustValue(step)} 
                aria-label="Increase value" 
              />
              <VICon 
                icon={FaMinus} 
                size={12} 
                onClick={() => adjustValue(-step)} 
                aria-label="Decrease value" 
              />
            </div>
          )}
        </>
      }
    />
  );
}