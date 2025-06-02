import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { AdminConsoleLayout } from './layout';
import TestConfigurations from './pages/test-configurations/test-configurations.page';

import Metadata from './pages/metadata/metadata.page';

import { VLoader } from '@components/molecules/index';
import ManageRolesPage from './pages/manage-role.page';
import ManageSystemSettingPage from './pages/manage-system-setting.page';
import ManageUsersPage from './pages/manage-user.page';
import RoleManagement from './pages/role-management/role-management.page';
import { ManageTenantAdminHomePage } from './pages/tenant-admin/manage-tenant-admin-home.page';
import { ManageTenantAdminPage } from './pages/tenant-admin/manage-tenant-admin.page';
import { ManageTenantUserPage } from './pages/tenant-admin/manage-user.page';
import { ManageTeamAdminPage } from './pages/tenant-admin/manage-team.page';
import ManageSubscriptionPage from './pages/manage-subscription.page';
// import AdminConsoleHomePage from './pages/admin-console-home.page';
// import TenantHomePage from './pages/tenant-home.page';
// import ManageTenantPage from './pages/tenant/manage-tenant.page';

// Lazy load pages
const AdminConsoleHomePage = lazy(() => import('./pages/admin-console-home.page'));
const TenantHomePage = lazy(() => import('./pages/tenant-home.page'));
const ManageTenantPage = lazy(() => import('./pages/tenant/manage-tenant.page')); // <-- import the correct component

// const RoleManagementviewMode = lazy(() => import('./pages/manage-role.page'));
// const UserManagementviewMode = lazy(() => import('./pages/manage-role.page'));
// const PermissionsviewMode = lazy(() => import('./pages/manage-permission.page'));

export const AdminConsoleRoutes = (
  <Route
    path="/admin-console"
    element={
      <React.Suspense fallback={
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <VLoader />
          <span className="mt-4 text-lg">Loading Admin Console...</span>
        </div>
      }>
        <AdminConsoleLayout userRole={'super_admin'} />
      </React.Suspense>
    }
  >
    {/* Admin Console Home */}
    <Route index element={<AdminConsoleHomePage userRole='super_admin' />} />

    {/* Tenant Management Route */}
    <Route path="tenants" element={<TenantHomePage />} />
    <Route path="tenants/:tenantId" element={<ManageTenantPage />} />

    {/* Role Management Route */}
    <Route path="roles" element={<RoleManagement />} />
    <Route path="roles/:id" element={<ManageRolesPage />} />

    {/* User Management Route */}
    <Route path="users" element={<ManageUsersPage />} />

    {/* Example route for managing specific tenants */}
    <Route path="tenants/:tenantId" element={<TenantHomePage />} />

    {/* Example route for managing user permissions */}
    <Route path="permissions/:userId" element={<TenantHomePage />} />

    {/* Route for test settings */}
    <Route path="metadata" element={<Metadata />} />

    {/* Route for test settings */}
    <Route path="test-configurations" element={<TestConfigurations />} />

    {/* Route for system settings */}
    <Route path="system-settings" element={<ManageSystemSettingPage />} />
    
    {/* Route for system settings */}
    <Route path="subscription" element={<ManageSubscriptionPage />} />

    {/* Route for Tenant Admin */}
    <Route path="home" element={<ManageTenantAdminHomePage />} />
    <Route path="tenant-admin" element={<ManageTenantAdminPage />} />
    <Route path="tenant-users" element={<ManageTenantUserPage />} />
    <Route path="team" element={<ManageTeamAdminPage />} />
  </Route>
);
