import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { VICon } from '@components/atoms/icon/v-icon.atom';
import { MdKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from 'store/store';
import { useNavlinkContext } from '../../../context/navlinkContext';
import { selectIsSidebarExpanded, selectIsSidebarVisible, setIsSidebarExpanded } from 'store/slices/ui.slice';


type SidebarProps = {
  items: NavLink[];
  allowCollapse?: boolean;
  onSidebarToggle: (isExpanded: boolean) => void;
  classes?: {
    wrapper?: string;
  };
  externalSubLinks?: { // Optional prop for external sublinks
    [parentPath: string]: NavLink[];
  };
};

const MIN_WIDTH_FOR_LABELS = 100;

function VSidebar({ items, allowCollapse = true, onSidebarToggle, classes, externalSubLinks }: SidebarProps) {
  const dispatch = useAppDispatch();
  const isVisible = useAppSelector(selectIsSidebarVisible);
  const isExpanded = useAppSelector(selectIsSidebarExpanded);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { mainLinks, setMainLinks } = useNavlinkContext();
  const [, setActiveMainLink] = useState<NavLink | null>(null);
  const [currentSubLinks, setCurrentSubLinks] = useState<NavLink[]>([]);

  // Initialize main links in context
  useEffect(() => {
    setMainLinks(items);
  }, [items, setMainLinks]);

  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    onSidebarToggle(newExpandedState);
    dispatch(setIsSidebarExpanded(newExpandedState));
  };

  // Handle click on main link to show its sublinks
  const handleMainLinkClick = (item: NavLink) => {
    setActiveMainLink(item);
    // Combine internal subLinks with any external subLinks for this path
    const combinedSubLinks = [
      ...(item.subLinks || []),
      ...(externalSubLinks?.[item.path] || [])
    ];
    setCurrentSubLinks(combinedSubLinks);
  };

  // Track sidebar width
  useEffect(() => {
    const currentRef = sidebarRef.current;
    if (!currentRef) return;

    const observer = new ResizeObserver(([entry]) => {
      setSidebarWidth(entry.contentRect.width);
    });
    observer.observe(currentRef);

    return () => observer.disconnect();
  }, []);

  // Set active main link and sublinks based on current route
  useEffect(() => {
    // Find active main link
    const currentActiveItem = mainLinks.find(item => 
      location.pathname.startsWith(item.path)
    ) || null;
    
    setActiveMainLink(currentActiveItem);

    if (currentActiveItem) {
      // Combine sublinks from both sources
      const combinedSubLinks = [
        ...(currentActiveItem.subLinks || []),
        ...(externalSubLinks?.[currentActiveItem.path] || [])
      ];
      setCurrentSubLinks(combinedSubLinks);

      // Find active sublink if exists
      const activeSub = combinedSubLinks.find(sub => 
        location.pathname === sub.path
      );
      if (activeSub) {
        // You can use this activeSub for additional highlighting if needed
      }
    }
  }, [location.pathname, mainLinks, externalSubLinks]);

  const getVisibleLabel = (label: string): string => {
    if (!isExpanded || sidebarWidth <= MIN_WIDTH_FOR_LABELS) return '';
    const availableWidth = sidebarWidth - 40;
    const approximateCharWidth = 8;
    const maxChars = Math.max(0, Math.floor(availableWidth / approximateCharWidth));
    return label.substring(0, maxChars);
  };

  const renderMainNavItems = () => (
    <div className={`flex flex-col gap-6 flex-grow ${sidebarWidth > MIN_WIDTH_FOR_LABELS ? 'mx-auto' : 'items-center'}`}>
      {mainLinks.map((item) => {
        const isActive = location.pathname.startsWith(item.path);
        const truncatedLabel = getVisibleLabel(item.label);
        const hasSubLinks = item.subLinks || externalSubLinks?.[item.path];

        return (
          <React.Fragment key={item.path}>
            <NavLink
              to={item.path}
              onClick={() => handleMainLinkClick(item)}
              className={`
                flex items-center gap-2 p-2 py-1 rounded transition-colors duration-300
                hover:bg-theme-default-hover hover:text-theme-link
                ${isActive ? 'text-theme-brand' : 'text-theme-secondary'}
                ${hasSubLinks ? 'font-semibold' : ''}
              `}
            >
              <VICon icon={item.icon} size={18} className="font-normal" />
              {truncatedLabel && (
                <span className={`${isActive ? 'font-semibold' : ''}`}>
                  {truncatedLabel}
                </span>
              )}
            </NavLink>
            {item.separator && <div className="w-full border-b border-theme-default my-2" />}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderSubLinks = () => {
    if (!isExpanded || currentSubLinks.length === 0) return null;

    return (
      <div className="bg-theme-default-light rounded-md mx-2 mb-4 pt-4">
        <ul className="pl-2 text-theme-secondary flex flex-col gap-3 pb-4">
          {currentSubLinks.map((subLink) => {
            const isActive = location.pathname === subLink.path;

            return (
              <NavLink
                to={subLink.path}
                key={subLink.path}
                className={`
                  flex gap-1 py-1 px-2 text-sm whitespace-nowrap rounded cursor-pointer
                  hover:text-theme-link hover:bg-theme-default-hover
                  ${isActive ? 'text-theme-brand font-semibold bg-theme-default-hover' : ''}
                `}
              >
                <VICon icon={subLink.icon} size={18} className="font-normal" />
                {subLink.label}
              </NavLink>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderToggleButton = () => (
    <button
      onClick={toggleSidebar}
      className={`p-2 fixed bottom-0 transition-colors text-theme-muted hover:text-theme-brand ${
        isExpanded ? 'self-end mr-2' : 'self-center'
      }`}
      aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
    >
      {isExpanded ? (
        <MdKeyboardDoubleArrowLeft size={20} />
      ) : (
        <MdOutlineKeyboardDoubleArrowRight size={20} />
      )}
    </button>
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed top-0 left-0 h-full transition-all duration-300 z-50
        ${isExpanded ? 'w-64' : 'w-14'} 
        bg-theme-default-alt border-r border-theme-default ${classes?.wrapper || ''}
      `}
    >
      <div className="pt-4 flex flex-col mt-6 max-h-screen">
        {renderMainNavItems()}
        {currentSubLinks.length > 0  && <hr className='mt-4 mb-4 border-theme-default'></hr>}
        {renderSubLinks()}
        {allowCollapse && renderToggleButton()}
      </div>
    </div>
  );
}

export { VSidebar };