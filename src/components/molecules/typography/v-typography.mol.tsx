import React from 'react';
import clsx from 'clsx';

export interface VTypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small' | 'span' | 'label';
  color?: 'brand' | 'primary' | 'secondary' | 'muted' | 'positive' | 'negative' | 'warning';
  className?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}

// Default styles for each element type based on 'as' prop
const defaultStyles = {
  h1: 'text-4xl font-semibold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-md font-medium',
  p: 'text-base ',
  small: 'text-base text-sm',
  span: 'text-base inline',
  label: 'text-base inline-block',
};

// Default color classes for different themes
const colorClasses = {
  brand: 'text-theme-brand',
  primary: 'text-theme-primary',
  secondary: 'text-theme-secondary',
  muted: 'text-theme-muted',
  positive: 'text-theme-positive',
  negative: 'text-theme-negative',
  warning: 'text-theme-warning',
};

function VTypography({ as = 'p', color = 'primary', className = '', htmlFor, children }: VTypographyProps) {
  // Get the default styles based on the 'as' prop
  const elementStyles = defaultStyles[as] || defaultStyles.p;

  const Element = as;

  return (
    <Element
      className={clsx(elementStyles, colorClasses[color] || colorClasses.primary, className)}
      htmlFor={as === 'label' ? htmlFor : undefined}
    >
      {children}
    </Element>
  );
}

export { VTypography };
