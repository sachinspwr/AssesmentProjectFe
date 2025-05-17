import React from 'react';
import { Icon } from '@components/atoms';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FiGithub } from 'react-icons/fi';
import { IoLogoGoogle } from 'react-icons/io';

function SocialMedia() {
  return (
    <div className="flex gap-5 items-stretch justify-between">
      <Icon icon={IoLogoGoogle} />
      <Icon icon={FaLinkedinIn} />
      <Icon icon={FiGithub} />
    </div>
  );
}

export { SocialMedia };
