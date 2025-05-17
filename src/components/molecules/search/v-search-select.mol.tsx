import React, { useCallback, useState, useEffect, useRef, useMemo } from "react";
import { throttle } from "@utils/functions";
import { VButton, VChip, VICon } from "@components/atoms";
import { VLabelledInput } from "../labelled-input/v-labelled-input.mol";
import { VLoader } from "../loader/v-loader.mol";
import { FaTrashAlt } from "react-icons/fa";

type Option = { label: string; value: string };

type VSearchSelectProps = {
  label?: string;
  value?: string[];
  onChange: (
    value: string[],
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSearch?: (query: string) => void;
  onAddItem?: (newItem: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  throttleTime?: number;
  wrapperClasses?: string;
  options: Option[];
};

function VSearchSelect({
  label,
  value = [],
  onChange,
  onSearch,
  onAddItem,
  placeholder = "Search or type a command",
  disabled = false,
  loading = false,
  className = "",
  wrapperClasses = "",
  throttleTime = 1000,
  options = [],
}: VSearchSelectProps){
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const memoizedOptions = useMemo(() => options, [options]);

  // Throttled search handler
  const throttledSearch = useMemo(
    () =>
      throttle((query: string) => {
        const filtered = memoizedOptions.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOptions(filtered);
        setIsOpen(true);
        if (onSearch) onSearch(query);
      }, throttleTime),
    [memoizedOptions, onSearch, throttleTime]
  );
  
  const handleSearch = useCallback(
    (query: string) => throttledSearch(query),
    [throttledSearch]
  );

  // Handle input change
  const handleInputChange = (event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event) {
      const val = event.target.value;
      setInputValue(val);
      if (!isOpen) setIsOpen(true); // Only open if it's not already open
      handleSearch(val);
    }
  };
  
  // Handle option selection
  const handleOptionClick = (option: Option) => {
    const updatedValue = value.includes(option.value)
      ? value.filter((v) => v !== option.value)
      : [...value, option.value];
  
    setInputValue("");
    
    // Use a real event instead of createEvent
    onChange(updatedValue, { target: { value: inputValue } } as React.ChangeEvent<HTMLInputElement>);
    
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

   // Update filtered options when options prop changes
   useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className={`relative w-full ${wrapperClasses}`} ref={dropdownRef}>
      <VLabelledInput
        type="text"
        name="search"
        label={label}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        selectContentOnFocus={true}
        onChange={(_, e) => {
          setIsOpen(true);
          handleInputChange(e);
        }}
        aria-label={placeholder}
        className={`w-full flex px-5 py-2 border rounded-lg text-md items-center justify-between ${disabled
            ? "bg-theme-default-disabled text-theme-on-default-disabled cursor-not-allowed"
            : "bg-theme-default border-theme-default text-theme-secondary focus:border-theme-primary focus:outline-none focus:ring-1 focus:ring-theme-primary"
          } ${className}`}
      >
          {Array.isArray(value) ?value.map(x => (
            <VChip key={x} id={x} label={x} onRemove={(id) => {
              handleOptionClick({ label: id, value: id });
            }} />
          )):[]}
      </VLabelledInput>

      {isOpen && !disabled && (
        <div className="absolute left-0 z-10 w-full mt-2 bg-theme-secondary border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-[7px] flex justify-center items-center">
              <VLoader size="sm" /> {/* Show loader while fetching options */}
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`flex justify-between px-4 py-2 cursor-pointer text-theme-primary hover:bg-theme-default-hover ${value.includes(option.value) ? "bg-theme-primary hover:bg-theme-primary-hover text-white" : ""
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
                {value.includes(option.value) && <VICon icon={FaTrashAlt} size={14}/>}
              </div>
            ))
          ) : (
            onAddItem && inputValue.trim() && (
              <div className="px-4 py-1.5 cursor-pointer text-theme-primary hover:bg-theme-default-hover">
                <VButton variant="link" size="sm" onClick={() => onAddItem(inputValue.trim())}>
                  Add Item {`"${inputValue.trim()}"`}
                </VButton>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export { VSearchSelect };