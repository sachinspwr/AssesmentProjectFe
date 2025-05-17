import React from 'react';
import { IconType } from 'react-icons';

export type VOptionItemProps = DefaultProps & {
  label: string;
  value: string;
  type: 'checkbox' | 'radio' | 'icon'; // Enforcing specific types
  icon?: IconType;
  onClick: (value: string) => void;
  active?: boolean; // New prop to determine active state
};

export function VOptionItem({
  label,
  value,
  type,
  icon: Icon,
  className = '',
  onClick,
  active = false,
}: VOptionItemProps) {
  const renderInput = () => {
    switch (type) {
      case 'icon':
        return Icon && <>{<Icon size={24} />}</>; // Render icon only
      default:
        return null;
    }
  };

  return (
    <div
      onClick={() => onClick(value)}
      className={`
        flex items-center gap-2 cursor-pointer text-theme-secondary  hover:bg-theme-default-hover transition-all p-2
         tracking-wide leading-loose ${active ? '!text-theme-brand font-semibold ' : 'font-normal'}${className} `}
    >
      {renderInput()}
      <span>{label}</span>
    </div>
  );
}
