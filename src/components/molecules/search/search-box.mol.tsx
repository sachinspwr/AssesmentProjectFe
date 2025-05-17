import React, { useCallback } from 'react';
import { IConInput } from '../icon-input/icon-input.mol';
import { throttle } from '@utils/functions';
import { IoSearchOutline } from 'react-icons/io5';
import { Button, Icon } from '@components/atoms';
import { IconType } from 'react-icons';

type SearchBoxProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  throttleTime?: number;
  buttonsProps?: {
    icon?: IconType;
    iconSize?: number;
    label?: string;
    onClick?: () => void;
  }[];
};

function SearchBox({
  value = '',
  onChange,
  placeholder = ' Search or type a command',
  disabled = false,
  className = '',
  throttleTime = 300,
  buttonsProps,
}: SearchBoxProps) {
  const handleChange = useCallback(
    throttle((value: string) => {
      onChange(value);
    }, throttleTime),
    [onChange, throttleTime]
  );

  return (
    <div className="relative w-full ">
      <IConInput
        type="text"
        name="search"
        value={value}
        placeholder={placeholder ?? 'Search'}
        disabled={disabled}
        onChange={handleChange}
        icon={IoSearchOutline}
        iconSize={22}
        wrapperClasses={` ${className}`}
        inputClasses="p-3 !px-12 text-lg border"
        iconClasses="mr-3"
        aria-label={placeholder} //
      />
      <div className="absolute right-1 top-1">
        <div className="flex">
          {buttonsProps &&
            buttonsProps.map((x) => (
              <Button
                varient="no-background-border"
                onClick={x.onClick}
                className="border-l-2 flex items-center gap-2 hover:bg-skin-theme-light focus:!ring-0"
              >
                {x.icon && <Icon icon={x.icon} size={x.iconSize} />}
                <span>{x.label}</span>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}

export { SearchBox };
