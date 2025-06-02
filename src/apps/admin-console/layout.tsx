import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { VHeader } from '@components/organisms/layout/v-header.organism';
import { FaBuilding, FaUserShield, FaUsers } from 'react-icons/fa6';
import { VSidebar } from '@components/organisms';
import { FaSlidersH, FaTools, FaUserAlt } from 'react-icons/fa';
import { BsQuestionSquare } from 'react-icons/bs';
import { MdSettings, MdSubscriptions } from 'react-icons/md';

interface AdminConsoleLayoutProps {
  userRole: 'super_admin' | 'tenant_admin';
}

function AdminConsoleLayout({ userRole }: AdminConsoleLayoutProps) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  // Super Admin items
  const superAdminItems = [
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
      icon: FaTools,
    },
    {
      label: 'System Settings',
      path: '/admin-console/system-settings',
      icon: MdSettings,
    },
    {
      label: 'subscription',
      path: '/admin-console/subscription',
      icon: MdSubscriptions,
    },
  ];

  // Tenant Admin items
  const tenantAdminItems = [
    // {
    //   label: 'Home',
    //   path: '/admin-console/home',
    //   icon: FaHome,
    // },
    {
      label: 'Tenant Configuration',
      path: '/admin-console/tenant-admin',
      icon: FaBuilding,
    },
    {
      label: 'User Management',
      path: '/admin-console/tenant-users',
      icon: FaUserAlt,
    },
    {
      label: 'Team Management',
      path: '/admin-console/team',
      icon: FaUsers,
    },
  ];

  // Determine which items to show based on user role
  const sidebarItems = userRole === 'super_admin' ? superAdminItems : tenantAdminItems;

  const handleSidebarToggle = (isExpanded: boolean) => {
    setSidebarExpanded(isExpanded);
  };

  return (
    <div className="relative bg-theme-default">
      {/* Fixed Header */}
      <VHeader className="fixed top-0 left-0 w-full z-10" showIcons={true} />

      {/* Sidebar below header */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-14'
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