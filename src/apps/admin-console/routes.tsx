import { Route } from 'react-router-dom';
import React, { lazy } from 'react';
import { AdminConsoleLayout } from './layout';
import TestConfigurations from './pages/test-configurations/test-configurations.page';

import Metadata from './pages/metadata/metadata.page';

import RoleManagement from './pages/role-management/role-management.page';
import ManageRolespage from './pages/manage-role.page';
import ManageUserspage from './pages/manage-user.page';
import ManageSystemSettingpage from './pages/manage-system-setting.page';


// Lazy load pages
const AdminConsoleHomepage = lazy(() => import('./pages/admin-console-home.page'));
const TenantHomepage = lazy(() => import('./pages/tenant-home.page'));
const ManageTenantpage = lazy(() => import('./pages/tenant/manage-tenant.page')); // <-- import the correct component

// const RoleManagementviewMode = lazy(() => import('./pages/manage-role.page'));
// const UserManagementviewMode = lazy(() => import('./pages/manage-role.page'));
// const PermissionsviewMode = lazy(() => import('./pages/manage-permission.page'));

export const AdminConsoleRoutes = (
  <Route 
    path="/admin-console"
    element={
      <React.Suspense fallback={<div>Loading admin console...</div>}>
        <AdminConsoleLayout />
      </React.Suspense>
    }
  >
    {/* Admin Console Home */}
    <Route index element={<AdminConsoleHomepage />} />
    
    {/* Tenant Management Route */}
    <Route path="tenants" element={<TenantHomepage />} />
    <Route path="tenants/:tenantId" element={<ManageTenantpage />} />
    
    {/* Role Management Route */}
    <Route path="roles" element={<RoleManagement />} />
    <Route path="roles/:id" element={<ManageRolespage/>} />
    
    {/* User Management Route */}
    <Route path="users" element={<ManageUserspage />} />
        
    {/* Example route for managing specific tenants */}
    <Route path="tenants/:tenantId" element={<TenantHomepage />} />
    
    {/* Example route for managing user permissions */}
    <Route path="permissions/:userId" element={<TenantHomepage />} />

    {/* Route for test settings */}
    <Route path="metadata" element={<Metadata />} />

    {/* Route for test settings */}
    <Route path="test-configurations" element={<TestConfigurations />} />

    {/* Route for system settings */}
    <Route path="system-settings" element={<ManageSystemSettingpage />} />
  </Route>
);
