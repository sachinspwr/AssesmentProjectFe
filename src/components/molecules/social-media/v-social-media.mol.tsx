import React from 'react';
import { VICon } from '@components/atoms';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FiGithub } from 'react-icons/fi';
import { IoLogoGoogle } from 'react-icons/io';

type VSocialMediaProps = {
  iconSize?: string; // Optional icon size for better customization
  iconColor?: string; // Optional icon color for theming
  className?: string; // Additional className for further customization
  showGoogle?: boolean; // Flag to display Google icon
  showLinkedIn?: boolean; // Flag to display LinkedIn icon
  showGithub?: boolean; // Flag to display GitHub icon
  onClickGoogle?: () => void; // onClick handler for Google icon
  onClickLinkedIn?: () => void; // onClick handler for LinkedIn icon
  onClickGithub?: () => void; // onClick handler for GitHub icon
};

function VSocialMedia({
  iconSize = 'text-2xl',
  iconColor = '!text-theme-primary',
  className = '',
  showGoogle = true,
  showLinkedIn = true,
  showGithub = true,
  onClickGoogle,
  onClickLinkedIn,
  onClickGithub,
}: VSocialMediaProps) {
  return (
    <div className={`flex gap-5 items-center justify-between ${className}`}>
      {showGoogle && (
        <VICon
          icon={IoLogoGoogle}
          className={`${iconSize} ${iconColor}`}
          onClick={onClickGoogle} // Handle click event for Google
        />
      )}
      {showLinkedIn && (
        <VICon
          icon={FaLinkedinIn}
          className={`${iconSize} ${iconColor}`}
          onClick={onClickLinkedIn} // Handle click event for LinkedIn
        />
      )}
      {showGithub && (
        <VICon
          icon={FiGithub}
          className={`${iconSize} ${iconColor}`}
          onClick={onClickGithub} // Handle click event for GitHub
        />
      )}
    </div>
  );
}

export { VSocialMedia };
