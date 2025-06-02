import React from 'react';

interface ChartWrapperProps {
  title: string;
  data: any[];
  children: React.ReactNode;
}

export function ChartWrapper({ title, data, children }: ChartWrapperProps) {
  const isDataAvailable = Array.isArray(data) && data.length > 0;

  return (
    <div className="p-4 min-h-[250px]">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {isDataAvailable ? (
        children
      ) : (
        <div className="text-center text-gray-500 p-20">No data found</div>
      )}
    </div>
  );
};
