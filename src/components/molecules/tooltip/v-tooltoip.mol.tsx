import React, { useState, useRef, useEffect } from 'react';

// Define the Props interface
type TooltipProps = {
  content: string | React.ReactNode; // Content displayed inside the tooltip
  position?: 'top' | 'bottom' | 'left' | 'right'; // Tooltip position
  className?: string; // Additional styles
  children: React.ReactNode; // Element the tooltip is anchored to
};

function VToolTip({
  content,
  position = 'bottom', // Default position is bottom
  className = '',
  children,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const [elementWidth, setElementWidth] = useState(0);

  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Measure the width of the element
  useEffect(() => {
    if (elementRef.current) {
      setElementWidth(elementRef.current.offsetWidth);
    }
  }, [children]);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current) return;

    const tooltip = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPosition = position; // Start with the provided position

    // Adjust horizontal positions if needed
    if (tooltip.left < 0 && newPosition === 'left') {
      newPosition = 'right';
    } else if (tooltip.right > viewportWidth && newPosition === 'right') {
      newPosition = 'left';
    }

    // Adjust vertical positions if needed
    if (tooltip.top < 0 && newPosition === 'top') {
      newPosition = 'bottom';
    } else if (tooltip.bottom > viewportHeight && newPosition === 'bottom') {
      newPosition = 'top';
    }

    setAdjustedPosition(newPosition); // Update the adjusted position
  }, [isVisible, position]);

  // Base styles for the tooltip container
  let tooltipStyle = `absolute z-10 rounded text-sm font-medium shadow-lg p-2 transition-opacity duration-200 ease-in-out opacity-0 pointer-events-none bg-theme-primary text-theme-on-primary`;
  if (isVisible) tooltipStyle += ' opacity-100';

  // Position styles for the tooltip and the arrow
  const positionStyle = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }[adjustedPosition];

  const arrowStyle = {
    top: 'absolute left-1/2 transform -translate-x-1/2 top-full border-8 border-transparent border-t-theme-primary',
    bottom:
      'absolute left-1/2 transform -translate-x-1/2 bottom-full border-8 border-transparent border-b-theme-primary',
    left: 'absolute top-1/2 transform -translate-y-1/2 left-full border-8 border-transparent border-l-theme-primary',
    right: 'absolute top-1/2 transform -translate-y-1/2 right-full border-8 border-transparent border-r-theme-primary',
  }[adjustedPosition];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)} // Show tooltip on hover
      onMouseLeave={() => setIsVisible(false)} // Hide tooltip on mouse leave
      ref={elementRef} // Attach the ref to the element
    >
      {/* The anchored element */}
      {children}
      {/* Tooltip content */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`${tooltipStyle} ${positionStyle} ${className}`}
          style={{
            // Set maxWidth to the element's width or content width, whichever is smaller
            maxWidth: `${elementWidth}px`,
            width: 'auto', // Allow the tooltip to shrink to fit content if smaller
          }}
          role="tooltip"
        >
          <div className={`${arrowStyle}`} />
          {content}
        </div>
      )}
    </div>
  );
}

export { VToolTip };
