import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

export type VTab = {
  name: string;
  label: string;
  content: React.ReactNode;
};

type VTabsProps = {
  tabs: VTab[];
  onTabChange?: (tabIndex: number, name?: string) => void;
};

export type VTabsRef = {
  nextTab: () => void;
  prevTab: () => void;
};

const VTabs = forwardRef<VTabsRef, VTabsProps>(({ tabs, onTabChange }, ref) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.name);

  useImperativeHandle(ref, () => ({
    nextTab: () => {
      const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1].name);
      }
    },
    prevTab: () => {
      const currentIndex = tabs.findIndex((tab) => tab.name === activeTab);
      if (currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1].name);
      }
    },
  }));

  useEffect(() => {
    const tabIndex = tabs.findIndex((x) => x.name === activeTab);
    onTabChange && onTabChange(tabIndex, activeTab);
  }, [tabs, activeTab, onTabChange]);

  return (
    <div>
      {/* Tab Navigation */}
      <div className="text-md font-medium text-center border-b border-theme-default">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab, index) => (
            <li key={tab.name} className="me-2">
              <button
                onClick={() => setActiveTab(tab.name)}
                aria-current={activeTab === tab.name ? 'page' : undefined}
                className={`inline-block py-1 border-b-[3px] 
                  ${index > 0 ? 'mx-4 ' : ''}
                  ${
                    activeTab === tab.name
                      ? 'text-theme-primary border-theme-primary'
                      : 'border-transparent font-normal text-theme-secondary hover:text-theme-link hover:border-theme-default-hover'
                  }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="pt-5">
        {tabs.map((tab) => (activeTab === tab.name ? <div key={tab.name}>{tab.content}</div> : null))}
      </div>
    </div>
  );
});

export { VTabs };
