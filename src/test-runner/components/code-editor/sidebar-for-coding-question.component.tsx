import { Icon } from '@components/atoms';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { TfiMenu } from 'react-icons/tfi';

type SidebarProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
};

function SideBarForCodingQuestion({ children, isOpen, setIsOpen }: SidebarProps) {
  const toggleSidebar = () => {
    setIsOpen();
  };

  return (
    <div className="relative">
      {!isOpen && (
        <Icon
          icon={TfiMenu}
          size={30}
          color="black"
          className="fixed right-2 top-4 transform -translate-y-1/2 rounded-lg shadow-lg"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full transition-transform duration-300 overflow-scroll ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } w-2/6`}
      >
        <div className="p-4">
          <Icon icon={IoCloseOutline} size={40} color="red" onClick={toggleSidebar} className="!justify-start ml-4 mb-2" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default SideBarForCodingQuestion;
