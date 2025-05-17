import React from 'react';
import { Icon } from '@components/atoms';
import { IconType } from 'react-icons';

interface TicketStatusSummaryProps {
  icon: IconType;
  size: number;
  iconClassName?: string;
  label: string;
  count: number;
}

function TicketStatusSummary({ icon, size, iconClassName, label, count }: TicketStatusSummaryProps) {
  return (
    <div className="min-w-64 p-4 flex flex-row items-center justify-between shadow-sm bg-theme-highlight rounded">
      <div className="flex flex-row justify-center items-center gap-2">
        <Icon icon={icon} size={size} className={iconClassName} />
        <span className="text-skin-theme text-sm font-medium truncate">{label}</span>
      </div>
      <span className="text-skin-theme text-sm font-medium">{count}</span>
    </div>
  );
}

export { TicketStatusSummary };
