import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { VHeader } from '@components/organisms/layout/v-header.organism';
import {FaNewspaper } from 'react-icons/fa6';
import { VSidebar } from '@components/organisms';
import { FaFileAlt, FaTicketAlt } from 'react-icons/fa';

function SupportDeskLayout() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  const sidebarItems = [
    {
      label: 'Support Requests',
      path: '/support-desk/tickets',
      icon: FaTicketAlt,  // Icon for Manage Tickets
    },
    {
      label: 'Documentation',
      path: '/support-desk/docs',
      icon: FaFileAlt,  // Icon for Manage Docs
    },
    {
      label: 'Knowledge Base',
      path: '/support-desk/articles',
      icon: FaNewspaper,  // Icon for Manage Articles
      separator: true,
    },
  ];
  

  const handleSidebarToggle = (isExpanded: boolean) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="relative bg-theme-default">
      {/* Fixed Header */}
      <VHeader className="fixed top-0 left-0 w-full z-10" showIcons={true} />

      {/* Sidebar below header */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isSidebarExpanded ? 'w-64' : 'w-14'
        } bg-theme-default-alt`}
      >
        <VSidebar
          items={sidebarItems}
          onSidebarToggle={handleSidebarToggle}
          classes={{ wrapper: 'mt-16 z-20' }}
          allowCollapse={true}
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

export default SupportDeskLayout;
