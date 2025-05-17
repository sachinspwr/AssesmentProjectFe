import React from 'react';
import { IconType } from 'react-icons';

export type VIConProps = {
  type?: 'react-icons' | 'svg'; // Type of icon: React-icons, SVG React component
  icon?: IconType; // React-icons component (for react-icons only)
  svg?: React.ReactElement | React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // SVG React component or JSX element
  src?: string; // For string-based SVG imports (SVG path)
  title?: string; // Accessible title
  size?: number; // Icon size
  color?: string; // Icon color
  onClick?: () => void; // Click handler
  className?: string; // Custom classes
  wrapperClassNames?: string; // Additional wrapper classes
  disabled?: boolean; // Disabled state
};

function VICon({
  type = 'react-icons',
  icon: IconComponent,
  svg,
  title,
  size = 24,
  color = 'currentColor',
  onClick,
  className = '',
  wrapperClassNames = '',
  disabled = false,
}: VIConProps) {
  // Common wrapper class with disabled styling
  const wrapperClass = `flex justify-center items-center transition-transform duration-200 ${
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105'
  } ${className} ${wrapperClassNames}`;

  // Click handler with disabled check
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // Handle react-icons components
  if (type === 'react-icons' && IconComponent) {
    return (
      <div className={wrapperClass} onClick={handleClick}>
        <IconComponent
          size={size}
          color={color}
          title={title}
          className={disabled ? 'opacity-50' : `hover:scale-105 ${className}`} // Apply theme classes
        />
      </div>
    );
  }

  // Handle SVG React components or JSX elements
  if (type === 'svg' && svg) {
    return (
      <div className={wrapperClass} onClick={handleClick}>
        {typeof svg === 'function'
          ? React.createElement(svg, {
              width: size,
              height: size,
              fill: color,
              className: disabled ? 'opacity-50' : `hover:scale-105 ${className}`,
            })
          : React.cloneElement(svg, {
              width: size,
              height: size,
              fill: color,
              title,
              className: disabled
                ? `opacity-50 ${svg.props?.className || ''}`
                : `hover:scale-105 ${className} ${svg.props?.className || ''}`,
            })}
      </div>
    );
  }

  return null;
}

export { VICon };
