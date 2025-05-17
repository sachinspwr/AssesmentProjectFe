import React from 'react';
import clsx from 'clsx';

export function Anchor({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a
    className={clsx(
      'text-blue-600 hover:text-blue-800',
      'underline underline-offset-4',
      'transition-colors duration-200',
      'decoration-blue-300 hover:decoration-blue-500'
    )}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
}

export function Strong({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <strong className="font-semibold text-gray-900" {...props}>
    {children}
  </strong>
}

export function Emphasis({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <em className="italic text-gray-700" {...props}>
    {children}
  </em>
}