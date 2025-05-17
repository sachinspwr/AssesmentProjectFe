/* eslint-disable react/function-component-definition */
import React from 'react';
import clsx from 'clsx';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const HomeIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    className={clsx('text-theme-brand', className)}
  >
    <path d="M12 3l10 9-1.5 1.5-8.5-7.5-8.5 7.5-1.5-1.5z" />
  </svg>
);

const EmailCheckIcon: React.FC<IconProps> = ({ size = 24, color = 'none', className = '' }) => (
  <svg
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    width={size}
    height={size}
    fill={color}
    className={clsx('text-theme-brand', className)}
  >
    <path d="M22 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h8" />
    <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7M16 19l2 2 4-4" />
  </svg>
);

const BookOpenIcon: React.FC<IconProps> = ({ size = 24, color = 'none', className, ...props }) => (
  <svg
    viewBox="0 0 576 512"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    fill={color}
    className={clsx('text-theme-brand', className)}
    {...props}
  ></svg>
);

export default BookOpenIcon;

export { HomeIcon, EmailCheckIcon, BookOpenIcon };
