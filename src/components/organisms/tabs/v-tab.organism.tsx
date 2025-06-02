import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef, useCallback } from 'react';

export type VTab = {
  id?: string;
  name: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
};

type VTabsProps = {
  tabs: VTab[];
  onTabChange?: (tabIndex: number, name?: string, id?: string) => void;
  classNames?: {
    body?: string;
    header?: string;
    tab?: string;
    activeTab?: string;
    inactiveTab?: string;
  };
  stickyHeader?: boolean;
  fixedHeader?: boolean;
  stickyOffset?: string | number;
  defaultActiveTab?: string;
};

export type VTabsRef = {
  nextTab: () => void;
  prevTab: () => void;
  setActiveTab: (name: string) => void;
  getActiveTab: () => string;
};

const VTabs = forwardRef<VTabsRef, VTabsProps>(
  (
    {
      tabs,
      onTabChange,
      classNames = {},
      stickyHeader = false,
      fixedHeader = false,
      stickyOffset = '0px',
      defaultActiveTab = tabs[0]?.name,
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = useState<string>(defaultActiveTab);
    const [isSticky, setIsSticky] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    // Handle sticky header effect without flickering
    useEffect(() => {
      if (!stickyHeader || !sentinelRef.current || fixedHeader) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsSticky(!entry.isIntersecting);
        },
        {
          root: null,
          rootMargin: '-1px 0px 0px 0px',
          threshold: [1],
        }
      );

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }, [stickyHeader, fixedHeader]);

    // Apply header styles based on mode
    useEffect(() => {
      if (!headerRef.current) return;

      const header = headerRef.current;

      if (fixedHeader) {
        header.style.position = 'fixed';
        header.style.top = typeof stickyOffset === 'number' ? `${stickyOffset}px` : stickyOffset;
        header.style.zIndex = '50';
        header.style.width = '100%';
      } else if (stickyHeader) {
        if (isSticky) {
          header.style.position = 'sticky';
          header.style.top = typeof stickyOffset === 'number' ? `${stickyOffset}px` : stickyOffset;
          header.style.zIndex = '50';
        } else {
          header.style.position = '';
          header.style.top = '';
          header.style.zIndex = '';
          header.style.backgroundColor = '';
          header.style.boxShadow = '';
        }
      } else {
        // Reset all styles if neither sticky nor fixed
        header.style.position = '';
        header.style.top = '';
        header.style.zIndex = '';
        header.style.backgroundColor = '';
        header.style.boxShadow = '';
        header.style.width = '';
      }
    }, [isSticky, stickyHeader, fixedHeader, stickyOffset]);

    // Rest of the component remains exactly the same...
    useImperativeHandle(ref, () => ({
      nextTab: () => {
        const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
        if (currentIndex < tabs.length - 1) {
          const nextTab = tabs[currentIndex + 1];
          if (!nextTab.disabled) {
            setActiveTab(nextTab.name);
          }
        }
      },
      prevTab: () => {
        const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
        if (currentIndex > 0) {
          const prevTab = tabs[currentIndex - 1];
          if (!prevTab.disabled) {
            setActiveTab(prevTab.name);
          }
        }
      },
      setActiveTab: (name: string) => {
        const tabExists = tabs.some((tab) => tab.name === name);
        if (tabExists) {
          setActiveTab(name);
        }
      },
      getActiveTab: () => activeTab,
    }));

    const handleTabChange = useCallback(
      (name: string) => {
        const tabIndex = tabs.findIndex((tab) => tab.name === name);
        const tab = tabs[tabIndex];

        if (tab && !tab.disabled) {
          setActiveTab(name);
        }
      },
      [tabs]
    );

    useEffect(() => {
      const tabIndex = tabs.findIndex((tab) => tab.name === activeTab);
      const tab = tabs[tabIndex];

      if (tab && onTabChange) {
        onTabChange(tabIndex, tab.name, tab.id);
      }
    }, [activeTab, tabs, onTabChange]);

    useEffect(() => {
      if (defaultActiveTab && !tabs.some((tab) => tab.name === defaultActiveTab)) {
        console.warn(`Default active tab "${defaultActiveTab}" not found in tabs array`);
      }
    }, [defaultActiveTab, tabs]);

    if (!tabs || tabs.length === 0) {
      return null;
    }

    return (
      <div className="w-full">
        {/* Sentinel element to detect when header should stick (only for sticky mode) */}
        {stickyHeader && !fixedHeader && <div ref={sentinelRef} className="absolute top-0 left-0 right-0 h-px" />}

        {/* Tab Navigation */}
        <div
          ref={headerRef}
          className={`
    text-md font-medium text-center
    ${stickyHeader || fixedHeader ? 'transition-all duration-200' : ''}
    ${classNames.header || ''}
    border-b border-grey-1
  `}
          style={{
            borderBottomColor: 'transparent', // Disable border when needed
          }}
        >
          <ul className="flex flex-wrap -mb-px overflow-x-auto no-scrollbar">
            {tabs.map((tab, index) => (
              <li key={tab.name || index} className="flex-shrink-0 me-2">
                <button
                  onClick={() => handleTabChange(tab.name)}
                  disabled={tab.disabled}
                  aria-current={activeTab === tab.name ? 'page' : undefined}
                  className={`
                  inline-block py-2 px-2 border-b-[3px] transition-colors
                  ${index > 0 ? 'mx-1' : ''}
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${
                    activeTab === tab.name
                      ? classNames.activeTab || 'text-theme-primary border-theme-primary font-semibold'
                      : classNames.inactiveTab ||
                        'border-transparent font-normal text-theme-secondary hover:text-theme-link hover:border-theme-default-hover'
                  }
                  ${classNames.tab || ''}
                `}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className={classNames.body || (fixedHeader ? 'pt-16' : 'pt-5')}>
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={activeTab === tab.name ? 'block' : 'hidden'}
              aria-hidden={activeTab !== tab.name}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

VTabs.displayName = 'VTabs';

export { VTabs };
