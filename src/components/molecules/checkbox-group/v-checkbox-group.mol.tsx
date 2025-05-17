import { useEffect, useState } from 'react';
import { VCheckbox } from '@components/molecules/checkbox/v-checkbox.mol'; // Assuming VCheckbox is available
import { VLabel } from '@components/atoms/label/v-label.atom';

export type VCheckboxOption = {
  label: React.ReactNode;
  value: string;
};

type VCheckboxGroupProps = {
  name: string;
  options: VCheckboxOption[];
  selectedValues?: string[]; // List of selected values
  direction?: 'horizontal' | 'vertical'; // Layout direction for checkbox group
  groupLabel?: string; // Group label for the checkbox group
  wrapperClasses?: string;
  checkboxContainerClasses?: string;
  labelClasses?: string;
  className?: string;
  disabled?: boolean;
  onChange: (selections: string[]) => void; // Callback to notify parent about selections
};

function VCheckboxGroup({
  name,
  options,
  selectedValues = [], // Default selected values
  direction = 'vertical', // Default to vertical layout
  groupLabel = '', // Default to empty group label
  wrapperClasses = '',
  checkboxContainerClasses = '',
  labelClasses = '',
  className = '',
  disabled=false,
  onChange,
}: VCheckboxGroupProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedValues);

  // Update the selected options if the selectedValues prop changes
  useEffect(() => {
    setSelectedOptions(selectedValues);
  }, [selectedValues]);

  // Notify parent component about selected options when they change
  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  // Handle checkbox selection and deselection
  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((v) => v !== value) // Deselect the checkbox
        : [...prev, value]; // Select the checkbox
      return newSelection;
    });
  };

  // Check if the checkbox is selected
  const handleCheck = (value: string) => selectedOptions.includes(value);

  // Apply flex direction based on the 'direction' prop
  const flexDirectionClass = direction === 'horizontal' ? 'flex-row space-x-6' : 'flex-col space-y-4';

  return (
    <div className={`flex flex-col gap-2 ${wrapperClasses}`}>
      {groupLabel && <VLabel>{groupLabel}</VLabel>}

      <div className={`flex ${flexDirectionClass}`}>
        {options.map((option) => (
          <VCheckbox
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            disabled={disabled}
            checked={handleCheck(option.value)} // Determine if the checkbox is checked
            wrapperClasses={checkboxContainerClasses}
            labelClasses={labelClasses}
            className={className}
            onChange={(value) => handleCheckboxChange(value)} // Handle change on checkbox click
          />
        ))}
      </div>
    </div>
  );
}

export { VCheckboxGroup };
