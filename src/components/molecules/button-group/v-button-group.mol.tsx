import { VButton } from '@components/atoms';
import React, { useState } from 'react';

export type VToggleButtonGroupProps = {
  options: (string | React.ReactNode)[]; // Allow custom content for each option
  size?: 'sm' | 'md';
  variant?: 'primary' | 'secondary' | 'positive' | 'negative' | 'link'; // Support variant for button
  onChange?: (selected: string | React.ReactNode, index: number) => void; // Pass custom content and index to onChange
};

function VToggleButtonGroup({
  options,
  size = 'md',
  variant = 'primary', // Default variant is 'primary'
  onChange,
}: VToggleButtonGroupProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index: number) => {
    setActiveIndex(index);
    const selectedOption = options[index]; // Get the selected option content
    if (onChange) onChange(selectedOption, index); // Pass both content and index to onChange
  };

  return (
    <div className="inline-flex w-full">
      {options.map((option, index) => {
        // Determine the active state class based on the selected index
        const activeClass =
          activeIndex === index
            ? `bg-${variant}-hover text-theme-on-${variant}-hover border-${variant}-hover` // Apply variant hover classes when active
            : `bg-theme-secondary text-theme-secondary border-theme-default`;

        return (
          <VButton
            key={index} // Use index as the key since content can be dynamic
            label={typeof option === 'string' ? option : ''} // If it's a string, pass it as label
            size={size} // Pass the size prop
            variant={variant} // Pass the variant prop to VButton
            className={`flex-1 ${index === 0 ? 'rounded-l-md' : 'rounded-none '} 
              ${index === options.length - 1 ? 'rounded-r-md' : 'rounded-none'} 
              ${index > 0 ? '!border-l-0' : ''} 
              ${activeClass}`} // Apply active class based on selection
            onClick={() => handleToggle(index)} // Handle the button click to change active state
          >
            {typeof option === 'string' ? option : option} {/* Render the custom content directly */}
          </VButton>
        );
      })}
    </div>
  );
}

export { VToggleButtonGroup };
