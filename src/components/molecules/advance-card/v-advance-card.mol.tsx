import React, { ReactNode } from 'react';
import { VCard } from '../../atoms/card/v-card.atom';

type VAdvanceCardProps = {
  title?: ReactNode;
  children: ReactNode;
  className?: string; // Custom class for card styles
  headerClassName?: string; // Custom class for header styles
  bgColor?: string; // Custom background color for card
  borderColor?: string; // Custom border color
  shadow?: boolean; // Option to toggle shadow
  ariaLabel?: string; // ARIA label for accessibility
};

function VAdvanceCard({
  title,
  className = '',
  headerClassName = '',
  children,
  bgColor = 'bg-theme-default',
  borderColor = 'border-theme-default',
  shadow = true,
  ariaLabel = '',
}: VAdvanceCardProps) {
  return (
    <VCard className={`${bgColor} ${borderColor} ${shadow ? 'shadow-md' : ''} ${className}`} muted={!shadow}>
      {/* Header section */}
      {title && (
        <div className={`text-xl text-theme-primary font-semibold mb-4 ${headerClassName}`}>
          <h2 id="card-title" aria-label={ariaLabel}>
            {title}
          </h2>
        </div>
      )}
      {/* Card body */}
      <div className="w-full">{children}</div>
    </VCard>
  );
}

export { VAdvanceCard };
