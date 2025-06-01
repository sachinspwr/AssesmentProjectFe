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
  mode?: 'view' | 'edit';
  pageChildren?: React.ReactNode;
};

function VSearchBox({
  value = '',
  onChange,
  placeholder = ' Search or type a command',
  disabled = false,
  className = '',
  wrapperClasses = '',
  throttleTime = 300,
  mode = 'edit'
}: VSearchBoxProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        mode={mode}
      />
    </div>
  );
}

export { VSearchBox };
