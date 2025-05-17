import React, { useState } from 'react';

interface CustomRadioProps {
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  name: string;
  value: string;
  label?: string;
  size?: 'small' | 'medium' | 'large' | 'extra-large'; // Added extra-large size option
}

const sizeClasses = {
  small: 'w-6 h-6', // Smaller size
  medium: 'w-8 h-8', // Medium size
  large: 'w-10 h-10', // Larger size
  'extra-large': 'w-12 h-12', // Extra-large size
};

function CustomRadio({ checked, onChange, name, value, label, size = 'small' }: CustomRadioProps) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          onChange(!isChecked);
        }}
        className="hidden peer"
      />
      <label
        htmlFor={value}
        className={`flex items-center justify-center border-2 rounded-full ursor-pointer ${sizeClasses[size]} ${checked ? 'bg-skin-theme-invert' : 'bg-skin-theme'}`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 cursor-pointer text-skin-theme-invert"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </label>
      <span className="ml-2 text-skin-theme">{label}</span>
    </div>
  );
}

export default CustomRadio;
