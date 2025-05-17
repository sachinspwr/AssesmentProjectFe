// src/components/ListItem.tsx
import React, { ReactNode } from 'react';

export type ListItemProps = DefaultProps & {
  index?: number | null;
  title?: string | number;
  description?: ReactNode;
  children?: ReactNode;
};

function ListItem({ index, title, description, className, children }: ListItemProps) {
  return (
    <div className={`flex items-center p-3 bg-skin-theme shadow rounded-lg mb-4 ${className}`}>
      <div className="flex-grow">
        {title && (
          <div>
            {index && <span>{index}</span>}
            <h3 className="text-lg font-semibold text-skin-theme">{title}</h3>
          </div>
        )}
        <div className="flex gap-1">
          {index && <span className=" text-skin-theme">{index}.</span>}
          <p className="text-skin-theme">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export { ListItem };
