import React, { useCallback } from 'react';
import { throttle } from '@utils/functions';
import { IoSearchOutline } from 'react-icons/io5';
import { VIConInput } from '../icon-input/v-icon-input.mol';

type VSearchBoxProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  throttleTime?: number;
  wrapperClasses?: string;
};

function VSearchBox({
  value = '',
  onChange,
  placeholder = ' Search or type a command',
  disabled = false,
  className = '',
  wrapperClasses = '',
  throttleTime = 300,
}: VSearchBoxProps) {
  const handleChange = useCallback(
    throttle((value: string) => {
      onChange(value);
    }, throttleTime),
    [onChange, throttleTime]
  );

  return (
    <div className={`relative w-full ${wrapperClasses}`}>
      <VIConInput
        type="text"
        name="search"
        value={value}
        placeholder={placeholder ?? 'Search query here'}
        disabled={disabled}
        onChange={handleChange}
        iconProps={{ icon: IoSearchOutline }}
        aria-label={placeholder}
        className={className}
      />
    </div>
  );
}

export { VSearchBox };
