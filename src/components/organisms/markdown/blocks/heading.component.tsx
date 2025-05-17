import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';

export function H1({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <VTypography as="h2" className=" mb-6 mt-8">
      {children}
    </VTypography>
  );
}

export function H2({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <VTypography as="h3" className="mb-5 mt-7 border-b pb-2">
      {children}
    </VTypography>
  );
}

export function H3({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <VTypography as="h4" className="mb-4 mt-6">
      {children}
    </VTypography>
  );
}

export function H4({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <VTypography as="h5" className=" mb-3 mt-5">
      {children}
    </VTypography>
  );
}
