import React, { ReactNode, useState } from 'react';
import { IconType } from 'react-icons'; // Importing type for icon component

export type VDetailedListItemProps = DefaultProps & {
  id?: number | null;
  title?: string | number;
  description?: ReactNode;
  label?: string;
  icon?: IconType; // Optional icon for the left side of the list item
  children?: ReactNode;
  onClick: (index: number) => void;
  index: number; // The index to pass to onClick
  className?: string;
};

function VDetailedVListItem({
  id,
  title,
  description,
  label,
  icon: Icon,
  className = '',
  children,
  index,
  onClick,
}: VDetailedListItemProps) {
  const [isClicked, setIsClicked] = useState(false); // Track click state for text color change

  // Handle click and ensure index is passed
  const handleClick = () => {
    if (id !== null && id !== undefined) {
      setIsClicked(true); // Change text color on click
      onClick(index); // Call onClick only if id is present
    }
  };

  return (
    <div
      className={`flex items-center p-3 bg-theme-default rounded-lg cursor-pointer hover:bg-theme-default-hover transition-all ${className}`}
      onClick={handleClick} // Trigger onClick when clicked
    >
      {/* Icon and label section */}
      {Icon && (
        <div className="flex items-center">
          <Icon size={24} className="mr-2 text-theme-brand" />
          {label && <span className="text-theme-primary mr-4">{label}</span>}
        </div>
      )}

      {/* Content Section */}
      <div className="flex-grow">
        {title && (
          <div>
            {id && <span className="text-theme-muted mr-2">{id}.</span>}
            <h3
              className={`text-lg font-semibold ${isClicked ? 'text-theme-primary' : 'text-theme-primary'}`} // Ensure text color becomes primary when clicked
            >
              {title}
            </h3>
          </div>
        )}
        <div className="flex gap-1 items-center">
          {description && <p className="text-theme-muted text-sm">{description}</p>}
          {children && <div className="text-theme-primary mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
}

export { VDetailedVListItem };
