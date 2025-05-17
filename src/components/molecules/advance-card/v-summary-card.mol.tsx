import { VCard } from '@components/atoms';
import React from 'react';
import { IconType } from 'react-icons';

type Variant = 'default' | 'positive' | 'warning' | 'negative' | 'primary';
type TrendDirection = 'up' | 'down' | 'neutral';

interface EnhancedSummaryCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  variant?: Variant;
  trend?: {
    value: string;
    direction: TrendDirection;
  };
  helperText?: string;
  className?: string;
}

function getVariantColor(variant: Variant): { color: string; bg: string } {
  const colors = {
    default: { color: 'text-theme-default', bg: 'bg-theme-default/10' },
    positive: { color: 'text-theme-positive', bg: 'bg-theme-positive/10' },
    warning: { color: 'text-theme-warning', bg: 'bg-theme-warning/10' },
    negative: { color: 'text-theme-negative', bg: 'bg-theme-negative/10' },
    primary: { color: 'text-theme-brand', bg: 'bg-theme-brand/10' },
  };
  return colors[variant] || colors.default;
}

function TrendIndicator({ direction }: { direction: TrendDirection }) {
  const icons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };
  return (
    <span className={`ml-1 ${
      direction === 'up' ? 'text-theme-positive' : 
      direction === 'down' ? 'text-theme-negative' : 
      'text-theme-secondary'
    }`}>
      {icons[direction]}
    </span>
  );
}

// eslint-disable-next-line react/function-component-definition
export const VSummaryCard: React.FC<EnhancedSummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  variant = 'default',
  trend,
  helperText,
  className = '',
}) => {
  const { color, bg } = getVariantColor(variant);

  return (
    <VCard className={`rounded-xl p-5 transition-all hover:shadow-md ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-theme-secondary mb-1">{title}</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold text-theme-primary">{value}</h3>
            {trend && (
              <span className={`text-sm flex items-center ${ 
                trend.direction === 'up' ? 'text-theme-positive' : 
                trend.direction === 'down' ? 'text-theme-negative' : 
                'text-theme-secondary'
              }`}>
                {trend.value}
                <TrendIndicator direction={trend.direction} />
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${bg}`}>
          <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
        </div>
      </div>
      
      {helperText && (
        <p className="mt-2 text-xs text-theme-secondary">{helperText}</p>
      )}
    </VCard>
  );
};