import { VButton, VCard, VImage } from '@components/atoms';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FiChevronDown } from 'react-icons/fi';
import { AppOptions } from '@components/pages/index';

function AppDropdownButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
    }, 200);
    setHoverTimeout(timeout);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* App Dropdown Trigger */}
      <button
        aria-label="Apps"
        className="flex items-center gap-1 text-theme-on-primary hover:text-theme-on-primary-hover focus:outline-none"
      >
        <AiOutlineAppstoreAdd size={20} />
        <FiChevronDown size={16} />
      </button>

      {/* App Dropdown Card */}
      {isHovered && (
        <div
          className="absolute top-12 right-0 min-w-56"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <VCard className="p-3 bg-theme-default rounded-xl shadow-lg">
            {/* Notch */}
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white rotate-45"></div>

            {/* App Options */}
            <ul className="grid grid-cols-2 gap-4">
            {AppOptions.map(({ title, icon, route }) => (
  <li key={title} className="cursor-pointer">
    <div
      onClick={() => navigate(route)}
      className="flex flex-col items-center gap-2 p-2 rounded-lg"
    >
      {/* Circular Image Wrapper */}
      <div className="p-2 border border-theme-primary rounded-full flex items-center justify-center w-[48px] h-[48px]">
        <VImage
          src={icon}
          alt={title}
          className="w-[28px] h-[28px] rounded-full object-cover hover:scale-[1.08] hover:shadow-md"
        />
      </div>

      {/* Title Below the Image */}
      <span className="text-center text-theme-brand text-xs whitespace-nowrap">
        {title}
      </span>
    </div>
  </li>
))}

            </ul>
          </VCard>
        </div>
      )}
    </div>
  );
}

export { AppDropdownButton };
