import React, { ReactNode, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type VToggleProps = {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function VToggle({ title, children, defaultOpen = false }: VToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="flex gap-1 items-center cursor-pointer" onClick={handleToggle}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-lg focus:outline-none">
          {isOpen ? <FiChevronUp className="text-lg" /> : <FiChevronDown className="text-lg" />}
        </button>
      </div>

      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
}
