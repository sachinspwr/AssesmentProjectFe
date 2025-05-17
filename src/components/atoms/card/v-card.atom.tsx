import React, { ReactNode, MouseEvent } from 'react';

type VCardProps = {
  children: ReactNode;
  className?: string;
  rounded?: boolean;
  muted?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

function VCard({ 
  children, 
  className = '', 
  rounded = true, 
  muted = false,
  onClick 
}: VCardProps) {
  const baseClasses = `border border-theme-default ${rounded ? 'rounded-lg' : ''} p-5 ${
    muted ? '' : 'shadow-md'
  }`;

  const hoverClasses = onClick 
    ? 'transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg cursor-pointer' 
    : '';

  const cardClasses = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}

export { VCard };