import React, { useState, useEffect, useRef } from 'react';
import { VCheckbox } from '../checkbox/v-checkbox.mol';
import { VInput } from '@components/atoms';
import { VICon } from '@components/atoms/icon/v-icon.atom';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface VDropdownProps {
  options: DropdownOption[];
  isMultiSelect?: boolean;
  placeholder?: string;
  name: string; // Field name for handleChange compatibility
  value?: string | string[]; // New prop for controlled value
  onChange: (
    value: string | string[],
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  showSearch?: boolean;
  disabled?: boolean;
  dropdownBtnClasses?: string;
  dropdownClasses?: string;
  wrapperClasses?: string;
}

function VDropdown({
  options,
  isMultiSelect = false,
  placeholder,
  name,
  value = [], // Default value for controlled behavior
  onChange,
  showSearch = false,
  disabled = false,
  dropdownBtnClasses,
  dropdownClasses,
  wrapperClasses,
}: VDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize selectedValues based on the value prop
  useEffect(() => {
    const newValues = Array.isArray(value) ? value : [value];
    if (JSON.stringify(newValues) !== JSON.stringify(selectedValues)) {
      setSelectedValues(newValues);
    }
  }, [value]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const createEvent = (value: string | string[]): React.ChangeEvent<HTMLInputElement> => {
    return {
      target: {
        name,
        value,
        type: isMultiSelect ? 'select-multiple' : 'select-one',
      },
    } as React.ChangeEvent<HTMLInputElement>;
  };

  const handleOptionClick = (value: string) => {
    if (disabled) return;

    let updatedValues;
    if (isMultiSelect) {
      updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    } else {
      updatedValues = [value];
      setIsOpen(false);
    }

    setSelectedValues(updatedValues);
    onChange(isMultiSelect ? updatedValues : value, createEvent(isMultiSelect ? updatedValues : value));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const filteredOptions = options?.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const selectedLabels = isMultiSelect
    ? options?.filter((option) => selectedValues.includes(option.value))
        .map((option) => option.label)
        .join(', ')
    : options?.find((option) => option.value === selectedValues[0])?.label || placeholder;

  const buttonClasses = `w-full flex justify-start pl-5 pr-2.5 py-2.5 border rounded-lg text-md flex items-center justify-between ${
    disabled
      ? 'bg-theme-default-disabled text-theme-on-default-disabled cursor-not-allowed'
      : `bg-theme-default border-theme-default 
      ${selectedValues.length > 0 ? 'text-theme-primary' : 'text-theme-secondary'} border-theme-default focus:border-theme-primary focus:outline-none focus:ring-1 focus:ring-theme-primary `
  }`;

  return (
    <div className={`relative w-full ${wrapperClasses}`} ref={dropdownRef}>
      <button
        type="button"
        className={`!py-2 ${buttonClasses} ${dropdownBtnClasses}`}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        disabled={disabled}
      >
        {selectedLabels || placeholder}

        <VICon className="text-theme-muted" icon={isOpen ? MdOutlineArrowDropUp : MdOutlineArrowDropDown} />
      </button>
      {isOpen && !disabled && (
        <div
        className={`absolute left-0 w-full mt-2 bg-theme-secondary border rounded-md shadow-lg z-[9999] ${dropdownClasses}`}
        role="menu"
      >
          {showSearch && (
            <div className="p-2">
              <VInput
                name={`${name}_search`}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                disabled={disabled}
              />
            </div>
          )}
          <div className="max-h-[25vh] overflow-y-auto !z-10">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center px-4 py-2 cursor-pointer text-theme-primary hover:bg-theme-default-hover "
                role="menuitem"
                onClick={() => handleOptionClick(option.value)}
              >
                {isMultiSelect && (
                  <VCheckbox
                    name={option.value}
                    label={option.label}
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                  />
                )}
                {!isMultiSelect && <span>{option.label}</span>}
              </div>
            ))}
            {filteredOptions.length === 0 && <div className="px-4 py-2 text-theme-muted">No options found</div>}
          </div>
        </div>
      )}
    </div>
  );
}

export { VDropdown };