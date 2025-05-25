import React from 'react';

type VOverviewprops = DefaultProps & {
  title: string;
  children?: React.ReactNode;
  overViewLableChildren?: React.ReactNode;
  titleClassName?: string;
};

function VOverview({
  title,
  titleClassName,
  overViewLableChildren,
  children
}: VOverviewprops) {
  return (
    <>
      <div className="w-full mx-auto rounded-lg border border-theme-default">
        <div className='flex justify-between items-center p-5'>
        <div className={`text-md font-medium tracking-wider text-theme-primary ${titleClassName}`}>{title}</div>
        {overViewLableChildren}
        </div>
        <div className="border border-theme-default mb-2"></div>
        {children}
      </div>
    </>
  );
}

export { VOverview };