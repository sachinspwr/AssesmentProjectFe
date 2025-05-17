import React from 'react';
import { SummaryItem } from '@components/molecules'; // Adjust import path
import { ListItem } from '@components/atoms';
import { IconType } from 'react-icons';
import CustomRadio from '../custom-radio/custom-radio.mol';

// Define types for the props
type SummaryItemProps = {
  icon: IconType;
  title: string;
  iconClasses: string;
  content: string;
};

type SelectableSummaryProps<T> = {
  items: Array<{
    value: T;
    summaryItemProps: SummaryItemProps;
  }>;
  selectedValue: T;
  onChange: (value: T) => void;
};

function SelectableSummary<T>({ items, selectedValue, onChange }: SelectableSummaryProps<T>) {
  const handleCheckboxChange = (value: T) => {
    if (selectedValue === value) {
      // If the item is already selected, don't change the selection
      return;
    }

    onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map(({ value, summaryItemProps }) => (
        <ListItem key={value as unknown as string} className="w-full">
          <div className="flex">
            <div className="w-1/6 mt-1.5">
              <CustomRadio
                checked={selectedValue === value}
                name="owner"
                value={value as unknown as string}
                onChange={() => handleCheckboxChange(value)}
              />
            </div>
            <div className="w-5/6">
              <SummaryItem
                icon={summaryItemProps.icon}
                title={summaryItemProps.title}
                iconClasses={summaryItemProps.iconClasses}
                content={summaryItemProps.content}
              />
            </div>
          </div>
        </ListItem>
      ))}
    </div>
  );
}

export { SelectableSummary };
