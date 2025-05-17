import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { VHeader } from '@components/organisms/layout/v-header.organism';
import { VSidebar } from '@components/organisms';

function HelpCenterLayout() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const handleSidebarToggle = (isExpanded: boolean) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="relative bg-theme-default">
      {/* Fixed Header */}
      <VHeader className="fixed top-0 left-0 w-full z-10" showIcons={false} />

      {/* Sidebar below header */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isSidebarExpanded ? 'w-64' : 'w-14'
        } bg-theme-default-alt`}
      >
        <VSidebar
          items={[]}
          onSidebarToggle={handleSidebarToggle}
          classes={{ wrapper: 'mt-16 z-20' }}
          allowCollapse={false}
        />
      </div>

      {/* Main Content */}
      <div className={`${isSidebarExpanded ? 'ml-64' : '!ml-14'} transition-all duration-300 mt-16 p-5 pt-10`}>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export { HelpCenterLayout };
