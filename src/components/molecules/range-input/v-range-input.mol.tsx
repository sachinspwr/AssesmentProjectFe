import { VLabel, VNumberInput } from '@components/atoms';
import React, { useState, useRef } from 'react';

type VRangeInputProps = {
  min?: number;
  max?: number;
  step?: number;
  initialMin?: number | null;
  initialMax?: number | null;
  onChange: (min: number | null, max: number | null) => void;
  className?: string;
  label?: string;
  unit?: string;
  allowSameValues?: boolean;
  placeholder?: {min: string, max: string}
};

export function VRangeInput({
  min = 0,
  max = 180,
  step = 1,
  initialMin = min,
  initialMax = max,
  onChange,
  className = '',
  label = 'Select range',
  unit = '',
  placeholder = {min: 'min', max: 'max'}
}: VRangeInputProps) {
  const [minValue, setMinValue] = useState<number | null>(initialMin === null ? null : initialMin);
  const [maxValue, setMaxValue] = useState<number | null>(initialMax === null ? null : initialMax);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle min input change with debouncing
  const handleMinChange = (value: number | null) => {
    if (value === null) {
      setMinValue(null);
      onChange(null, maxValue);
      return;
    }

    // Ensure min is greater than or equal to the lower bound
    let newMin = Math.max(value, min);

    // Clear previous timeout and set a new one to delay the validation
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new min value after a delay
    debounceTimeout.current = setTimeout(() => {
      if (maxValue !== null && newMin > maxValue) {
        newMin = maxValue; // Prevent min from exceeding max
      }

      setMinValue(newMin);
      onChange(newMin, maxValue); // Update the parent component after the delay
    }, 700);
  };

  // Handle max input change with debouncing
  const handleMaxChange = (value: number | null) => {
    if (value === null) {
      setMaxValue(null);
      onChange(minValue, null);
      return;
    }

    // Ensure max is less than or equal to the upper bound
    let newMax = Math.min(value, max);

    // Clear previous timeout and set a new one to delay the validation
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new max value after a delay
    debounceTimeout.current = setTimeout(() => {
      if (minValue !== null && newMax < minValue) {
        newMax = minValue; // Prevent max from being less than min
      }

      setMaxValue(newMax);
      onChange(minValue, newMax); // Update the parent component after the delay
    }, 700); 
  };

  // Cleanup timeout when component unmounts
  React.useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <VLabel>{label}</VLabel>}

      <div className="flex items-center border border-theme-default rounded-md overflow-hidden
        group  focus-within:border-none focus-within:outline-none focus-within:ring-2 focus-within:ring-theme-primary">
        <VNumberInput
          name="min"
          value={minValue!}
          onChange={(val) => handleMinChange(val === null ? null : Number(val))}
          min={min}
          step={step}
          unit={unit}
          aria-label="Minimum value"
          placeholder={placeholder?.min}
          className="flex-1 border-0 rounded-none shadow-none focus:ring-0 focus:border-transparent"
        />

        <div className="h-6 w-px bg-theme-default-dark mx-1"></div>

        <VNumberInput
          name="max"
          value={maxValue!}
          onChange={(val) => handleMaxChange(val === null ? null : Number(val))}
          max={max}
          step={step}
          unit={unit}
          aria-label="Maximum value"
          placeholder={placeholder?.max}
          className="flex-1 border-0 rounded-none shadow-none focus:ring-0 focus:border-transparent"
        />
      </div>
    </div>
  );
}