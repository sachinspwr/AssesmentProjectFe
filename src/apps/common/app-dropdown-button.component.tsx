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
            <div className="absolute -top-2 right-4 w-4 h-4  rotate-45"></div>

            {/* App Options */}
            <ul className="grid grid-cols-2 gap-4">
              {AppOptions.map(({ title, icon, route }) => (
                <li key={title} className="flex items-center gap-2 !w-20 !h-20 cursor-pointer">
                  <VButton variant='secondary' className="block p-4 rounded w-full" onClick={() => navigate(route)}>
                    <VImage src={icon} alt={title} />
                  </VButton>
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
