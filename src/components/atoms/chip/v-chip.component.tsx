// CancellableChip.tsx

import React from 'react';
import { Icon } from '../icon/icon.atom';
import { IoCloseOutline } from 'react-icons/io5';

type VChipProps = DefaultProps & {
  id: string;
  label: string;
  onRemove?: (id: string) => void;
  type?: 'default' | 'positive' | 'negative' | 'warning' | 'primary';
};

function VChip({ id, label, onRemove, type = 'default', className }: VChipProps) {
  const getChipClasses = () => {
    let classes = 'w-fit px-2.5 py-1 flex justify-center items-center rounded-lg font-medium text-sm ';
    switch (type) {
      case 'default':
        classes += 'bg-theme-default-alt text-theme-secondary';
        break;
      case 'positive':
        classes += 'bg-theme-positive-lite text-theme-positive';
        break;
      case 'negative':
        classes += 'bg-theme-negative-lite text-theme-negative';
        break;
      case 'warning':
        classes += 'bg-theme-warning-lite text-theme-warning';
        break;
      case 'primary':
        classes += 'bg-theme-primary-lite text-theme-brand';
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <p className={`w-fit flex justify-center items-center ${getChipClasses()} ${className}`}>
      {label}
      {onRemove && (
        <button className="ml-2 focus:outline-none" onClick={() => onRemove(id)}>
          <Icon icon={IoCloseOutline} size={20} />
        </button>
      )}
    </p>
  );
}

export { VChip };
