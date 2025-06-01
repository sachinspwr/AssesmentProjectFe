import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { VHeader } from '@components/organisms/layout/v-header.organism';
import { FaBuilding, FaUserShield } from 'react-icons/fa6';
import { VSidebar } from '@components/organisms';
import { FaSlidersH, FaUserAlt } from 'react-icons/fa';
import { BsQuestionSquare } from 'react-icons/bs';

function AdminConsoleLayout() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  
  const sidebarItems = [
    {
      label: 'Dashboard',
      path: '/admin-console',
      icon: FaSlidersH,
    },
    {
      label: 'User Management',
      path: '/admin-console/users',
      icon: FaUserAlt,
    },
    
    {
      label: 'Tenant Management',
      path: '/admin-console/tenants',
      icon: FaBuilding,
    },
    {
      label: 'Role Management',
      path: '/admin-console/roles',
      icon: FaUserShield,
    },
    {
      label: 'Metadata',
      path: '/admin-console/metadata',
      icon: BsQuestionSquare,
    },
    {
      label: 'Test Configurations',
      path: '/admin-console/test-configurations',
      icon: FaSlidersH,
    },
    {
      label: 'System Settings',
      path: '/admin-console/system-settings',
      icon: FaSlidersH,
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

export { AdminConsoleLayout };
