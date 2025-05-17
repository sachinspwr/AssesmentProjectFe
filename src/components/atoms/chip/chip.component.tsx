// CancellableChip.tsx

import React from 'react';
import { Icon } from '../icon/icon.atom';
import { IoCloseOutline } from 'react-icons/io5';

type ChipProps = DefaultProps & {
  label: string;
  onRemove?: () => void;
  type?: 'primary' | 'danger' | 'success' | 'warning' | 'info';
};

function Chip({ label, onRemove, type = 'primary', className }: ChipProps) {
  const getChipClasses = () => {
    let classes = 'inline-flex items-center px-3 py-0 rounded-full font-medium text-sm mr-2  ';
    switch (type) {
      case 'primary':
        classes += 'bg-blue-200 text-blue-800';
        break;
      case 'danger':
        classes += 'bg-red-200 text-red-800';
        break;
      case 'success':
        classes += 'bg-green-100 text-green-800';
        break;
      case 'warning':
        classes += 'bg-yellow-200 text-yellow-800';
        break;
      case 'info':
        classes += 'bg-gray-200 text-blue-800';
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <div className={`${getChipClasses()} ${className}`}>
      {label}
      {onRemove && (
        <button className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={onRemove}>
          <Icon icon={IoCloseOutline} size={20} />
        </button>
      )}
    </div>
  );
}

export { Chip };
