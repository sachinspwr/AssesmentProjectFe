import { Label } from '@components/atoms';
import React from 'react';
import { IconType } from 'react-icons'; // Adjust import based on your setup

type SummaryItemProps = {
  icon: IconType;
  title: string;
  content: React.ReactNode;
  iconClasses?: string;
};

function SummaryItem({ icon: Icon, title, content, iconClasses }: SummaryItemProps) {
  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0  text-lg mr-4 mt-1`}>
        <Icon size={20} className={iconClasses} />
      </div>
      <div className="">
        <Label className="text-lg text-skin-theme">{title}</Label>
        <div className="text-md text-skin-theme-dark lg:max-h-40 2xl:max-h-full overflow-y-auto">{content}</div>
      </div>
    </div>
  );
}

export { SummaryItem };
