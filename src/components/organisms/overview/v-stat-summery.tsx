import React from 'react';

type VStateSummeryprops = {
  count?: number;
  label?: string;
  children?: React.ReactNode;
  countClassName?: string;
  labelClassName?: string;
};

function VStatSummery({ count, label, children, countClassName, labelClassName }: VStateSummeryprops) {
  return (
    <div className="flex flex-col items-center px-4 py-1 text-center border-r border-theme-default mb-3">
      <div className={`text-xl font-semibold text-theme-primary ${countClassName}`}>{count}</div>
      <div className={`text-xs font-normal text-theme-primary ${labelClassName}`}>{label}</div>
      {children}
    </div>
  );
}

export { VStatSummery };