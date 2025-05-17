import React from 'react';
import type { DropdownOption } from '@components/molecules/dropdown/v-dropdown.mol';
import { VDropdown, VSearchBox } from '@components/molecules/index';

interface VSearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (
    value: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSearchFilterChange?: (searchValue: string, filterValue: string) => void;
  filterOptions: DropdownOption[];
  searchPlaceholder?: string;
  filterPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  wrapperClasses?: string;
  searchThrottleTime?: number;
}

export function VSearchFilter({
  searchValue = '',
  onSearchChange,
  filterValue = '',
  onFilterChange,
  onSearchFilterChange,
  filterOptions = [],
  searchPlaceholder = 'Search...',
  filterPlaceholder = 'Filter',
  disabled = false,
  className = '',
  wrapperClasses = '',
  searchThrottleTime = 300,
}: VSearchFilterProps) {
  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    onSearchFilterChange?.(value, filterValue);
  };

  const handleFilterChange = (
    value: string | string[],
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    onFilterChange(value as string, e);
    onSearchFilterChange?.(searchValue, value as string);
  };

  return (
    <div className={`group relative ${wrapperClasses}`}>
      <div
        className={`flex items-center !rounded-lg border focus-within:ring-1 focus-within:ring-theme-primary focus-within:border-theme-primary transition-all ${className}`}
      >
        {/* Search Box */}
        <VSearchBox
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          disabled={disabled}
          throttleTime={searchThrottleTime}
          className="!border-none !rounded-none !focus:ring-0"
          wrapperClasses="h-full"
        />

        {/* Dropdown */}
        <div className="w-40 border-l border-theme-default">
          <VDropdown
            name="filter"
            value={filterValue}
            onChange={handleFilterChange}
            options={filterOptions}
            placeholder={filterPlaceholder}
            disabled={disabled}
            dropdownBtnClasses="h-full !rounded-none !border-none !focus:ring-0"
            dropdownClasses='!rounded-none'
          />
        </div>
      </div>
    </div>
  );
}
