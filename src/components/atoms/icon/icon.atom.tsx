import React from 'react';
import { IconType } from 'react-icons';

export type IconProps = {
  type?: 'react-icons' | 'svg';
  icon?: IconType;
  svg?: React.ReactElement;
  title?: string;
  size?: number;
  color?: string;
  onClick?: () => void;
  className?: string;
};

function Icon({
  type = 'react-icons',
  icon: IconComponent,
  svg,
  title,
  size = 24,
  color = 'currentColor',
  onClick,
  className = '',
}: IconProps) {
  if (type === 'react-icons' && IconComponent) {
    return (
      <div className={`flex flex-row justify-center items-center gap-1 ${className}`} onClick={onClick}>
        <IconComponent
          size={size}
          color={color}
          title={title}
          className={`mt-1 hover:transform transition duration-200 hover:scale-110 cursor-pointer text-theme-positive ${className}`}
        />
      </div>
    );
  }

  if (type === 'svg' && svg) {
    return (
      <div className={`flex flex-row justify-center items-center gap-1 ${className}`} onClick={onClick}>
        {React.cloneElement(svg, {
          width: size,
          height: size,
          fill: color,
          title,
          className: `mt-1 hover:transform transition duration-200 hover:scale-110 cursor-pointer ${svg.props.className}`,
        })}
      </div>
    );
  }

  return null;
}

export { Icon };
