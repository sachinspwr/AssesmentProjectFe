// CancellableChip.tsx

import React from 'react';

type VStatusProps = DefaultProps & {
  label: string;
  type?: 'default' | 'primary' | 'positive' | 'negative' | 'warning';
};

function VStatus({ label, type = 'default', className }: VStatusProps) {
  const getStatusClasses = () => {
    let classes = 'w-fit px-2 py-1 flex justify-center items-center rounded-md font-medium text-sm border ';
    switch (type) {
      case 'default':
        classes += 'bg-theme-default-alt text-theme-secondary border-theme-default';
        break;
      case 'positive':
        classes += 'bg-theme-positive-lite text-theme-positive border-theme-positive';
        break;
      case 'negative':
        classes += 'bg-theme-negative-lite text-theme-negative border-theme-negative';
        break;
      case 'warning':
        classes += 'bg-theme-warning-lite text-theme-warning border-theme-warning';
        break;
      case 'primary':
        classes += 'bg-theme-primary-lite text-theme-brand border-theme-primary';
        break;
      default:
        break;
    }
    return classes;
  };

  return <p className={`${getStatusClasses()} ${className}`}>{label}</p>;
}

export { VStatus };
