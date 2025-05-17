import React, { useState } from 'react';

type Tab = {
  name: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = DefaultProps & {
  tabs: Tab[];
};

function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].name);

  return (
    <div className="">
      {/* Tab Navigation */}
      <div className="text-sm font-medium text-center border-b border-gray-200 ">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.name} className="me-2">
              <button onClick={() => setActiveTab(tab.name)} aria-current={activeTab === tab.name ? 'page' : undefined}>
                <p
                  className={`inline-block p-1 py-2 2xl:py-4 mx-4 border-b-2 rounded-t-lg ${
                    activeTab === tab.name
                      ? ' text-blue-600 border-blue-600 '
                      : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="pt-6 2xl:pt-8">
        {tabs.map((tab) => (activeTab === tab.name ? <div key={tab.name}>{tab.content}</div> : null))}
      </div>
    </div>
  );
}

export { Tabs };
