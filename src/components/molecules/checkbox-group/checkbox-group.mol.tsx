import { useEffect, useState } from 'react';
import { Checkbox } from '../checkbox/checkbox.mol';

export type CheckboxOption = {
  label: string;
  value: string;
};

type CheckboxGroupProps = {
  name: string;
  options: CheckboxOption[];
  selectedValues?: string[];
  wrapperClasses?: string;
  checkboxContainerClasses?: string;
  labelClasses?: string;
  className?: string;
  onChange: (selections: string[]) => void;
};

function CheckboxGroup({
  name,
  options,
  selectedValues = [],
  wrapperClasses = '',
  checkboxContainerClasses = '',
  labelClasses = '',
  className = '',
  onChange,
}: CheckboxGroupProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedValues);

  useEffect(() => {
    setSelectedOptions(selectedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange(selectedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) => {
      const isAlreadySelected = prev.includes(value);
      return isAlreadySelected ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  const handleCheck = (value: string) => {
    return selectedOptions.includes(value);
  };

  return (
    <div className={`flex flex-col ${wrapperClasses}`}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={handleCheck(option.value)}
          wrapperClasses={checkboxContainerClasses}
          labelClasses={labelClasses}
          className={className}
          onChange={(value) => handleCheckboxChange(value)}
        />
      ))}
    </div>
  );
}

export { CheckboxGroup };
