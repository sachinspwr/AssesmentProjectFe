import { VListItem, VListItemProps } from '@components/atoms';
import React from 'react';

export type VListProps = DefaultProps & {
  items: VListItemProps[]; // List of items to render, leveraging VListItemProps
  numbered?: boolean; // If true, items will be numbered
  wrapperClassName?: string; // Custom wrapper styles
  itemClassName?: string; // Custom item styles
};

export function VList({ items, numbered = false, wrapperClassName = '', itemClassName = '' }: VListProps) {
  return (
    <ul className={`space-y-4 ${wrapperClassName}`}>
      {items.map((item, index) => (
        <li key={item.value} className="list-none">
          <VListItem
            {...item} // Spread item props for VListItem
            label={numbered ? `${index + 1}. ${item.label}` : item.label} // Prepend numbers if numbered is true
            className={`${itemClassName} ${item.className || ''}`} // Merge global and per-item class names
          />
        </li>
      ))}
    </ul>
  );
}
