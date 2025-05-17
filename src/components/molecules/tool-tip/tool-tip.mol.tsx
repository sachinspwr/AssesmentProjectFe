import React, { useState, useRef } from 'react';

interface TooltipProps {
  content?: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  children?: React.ReactNode;
  className?: string;
}

function ToolTip({ content, position = 'bottom', children, className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      default:
        return '';
    }
  };

  const getArrowPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-600';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-600';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-600';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={`absolute bg-gray-600 text-white text-sm p-2 rounded shadow-lg whitespace-nowrap ${getPositionClasses()} ${className}`}
        >
          {content}
          <div className={`absolute w-0 h-0 border-8 border-transparent ${getArrowPositionClasses()}`} />
        </div>
      )}
    </div>
  );
}

export { ToolTip };
