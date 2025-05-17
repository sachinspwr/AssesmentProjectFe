// src/components/List.tsx
import React from 'react';
import { ListItem, ListItemProps } from '@components/atoms';

interface ListProps {
  items: ListItemProps[] | string[];
  numbered?: boolean;
  wrapperStyle?: ClassName;
}

function List({ items, numbered, wrapperStyle }: ListProps) {
  return (
    <ul className={`space-y-4 ${wrapperStyle}`}>
      {items.map((item, index) => (
        <li key={index}>
          {typeof item !== 'string' ? (
            <ListItem index={numbered ? index + 1 : null} title={item.title} description={item.description} />
          ) : (
            <ListItem index={numbered ? index + 1 : null} description={item} />
          )}
        </li>
      ))}
    </ul>
  );
}

export { List };
