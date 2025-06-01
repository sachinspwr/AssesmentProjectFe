import React, { useState, useEffect, useRef } from 'react';
import { VCheckbox } from '../checkbox/v-checkbox.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
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
  name: string;
  value?: string | string[];
  onChange: (
    value: string | string[],
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  showSearch?: boolean;
  disabled?: boolean;
  dropdownBtnClasses?: string;
  dropdownClasses?: string;
  wrapperClasses?: string;
  mode?: 'view' | 'edit';
  pageChildren?: React.ReactNode;
}

export function VDropdown({
  options,
  isMultiSelect = false,
  placeholder = 'Select...',
  name,
  value = [],
  onChange,
  showSearch = false,
  disabled = false,
  dropdownBtnClasses,
  dropdownClasses,
  wrapperClasses,
  mode = 'edit',
  pageChildren,
}: VDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newValues = Array.isArray(value) ? value : [value];
    if (JSON.stringify(newValues) !== JSON.stringify(selectedValues)) {
      setSelectedValues(newValues);
    }
  }, [value]);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
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

  const handleOptionClick = (val: string) => {
    if (disabled) return;
    let updatedValues: string[];
    if (isMultiSelect) {
      updatedValues = selectedValues.includes(val) ? selectedValues.filter((v) => v !== val) : [...selectedValues, val];
    } else {
      updatedValues = [val];
      setIsOpen(false);
    }

    setSelectedValues(updatedValues);
    onChange(isMultiSelect ? updatedValues : val, createEvent(isMultiSelect ? updatedValues : val));
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
    ? options
        ?.filter((option) => selectedValues.includes(option.value))
        .map((option) => option.label)
        .join(', ')
    : options?.find((option) => option.value === selectedValues[0])?.label || '';

  const renderpage = () =>
    pageChildren ?? <VTypography className="pl-2 py-2">{selectedLabels || placeholder}</VTypography>;

  const buttonClasses = `w-full flex justify-between items-center pl-5 pr-2.5 py-2.5 border rounded-lg text-md ${
    disabled
      ? 'bg-theme-default-disabled text-theme-on-default-disabled cursor-not-allowed'
      : `bg-theme-default border-theme-default ${
          selectedValues.length > 0 ? 'text-theme-primary' : 'text-theme-secondary'
        } focus:outline-none focus:ring-1 focus:ring-theme-primary`
  }`;

  return (
    <div className={`relative w-full ${wrapperClasses}`} ref={dropdownRef}>
      {mode === 'view' ? (
        renderpage()
      ) : (
        <>
          <button
            type="button"
            className={`!py-2 ${buttonClasses} ${dropdownBtnClasses}`}
            onClick={toggleDropdown}
            disabled={disabled}
          >
            <span className="truncate">{selectedLabels || placeholder}</span>
            <VICon
              icon={isOpen ? MdOutlineArrowDropUp : MdOutlineArrowDropDown}
              className="ml-2 !text-theme-secondary"
              size={20}
            />
          </button>

          {isOpen && (
            <div
              className={`absolute mt-1 z-10 w-full rounded-md bg-white border border-theme-default max-h-60 overflow-y-auto ${dropdownClasses}`}
            >
              {showSearch && (
                <div className="p-2">
                  <VInput
                    name={`${name}_search`}
                    value={searchTerm}
                    onChange={(val) => handleSearchChange(val)}
                    placeholder="Search..."
                    type="text"
                  />
                </div>
              )}

              {filteredOptions?.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-theme-muted flex items-center gap-2"
                  onClick={() => handleOptionClick(option.value)}
                >
                  {isMultiSelect && (
                    <VCheckbox
                      name={name}
                      value={option.value}
                      checked={selectedValues.includes(option.value)}
                      onChange={() => handleOptionClick(option.value)}
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              ))}
              {filteredOptions.length === 0 && <div className="px-4 py-2 text-theme-muted">No options found</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
}
