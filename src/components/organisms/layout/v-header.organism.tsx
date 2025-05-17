import React, { ReactNode } from 'react';
import { FiBell } from 'react-icons/fi'; // React Icon for notification
import clsx from 'clsx'; // Utility to conditionally join class names
import { VBrandHeader } from './v-brand-title.organism';
import { UserProfileCard } from '../user/user-profile-card';
import {AppDropdownButton} from 'apps/common/app-dropdown-button.component';

type VHeaderProps = {
  className?: string; // Optional className prop to accept custom classes
  showIcons?: boolean; 
  children?: ReactNode;
};

function VHeader({ className, showIcons = true, children }: VHeaderProps) {
  return (
    <header
      className={clsx(
        'flex justify-between items-center px-4 py-4 bg-theme-primary',
        className // Custom classes will be added here
      )}
    >
      {/* Left Section: Brand Name */}
      <VBrandHeader as="h3" className="ml-10 text-theme-on-primary">
        TestEngine
      </VBrandHeader>

      {/* Right Section: Notifications and Avatar (conditionally rendered) */}
      {showIcons && (
        <div className="flex items-center gap-8">
          {/* Notification Icon */}
          <button
            aria-label="Notifications"
            className="text-theme-on-primary hover:text-theme-on-primary-hover focus:outline-none"
          >
            <FiBell size={20} />
          </button>

          <AppDropdownButton />

          {/* User Avatar */}
          <div className="relative">
            <UserProfileCard />
          </div>
        </div>
      )}

      {children}
    </header>
  );
}

export { VHeader };
