import { Route } from 'react-router-dom';
import React, { lazy } from 'react';
import { AdminConsoleLayout } from './layout';
import TestConfigurations from './pages/test-configurations/test-configurations.page';

import Metadata from './pages/metadata/metadata.page';

import RoleManagement from './pages/role-management/role-management.page';
import ManageRolesPage from './pages/manage-role.page';


// Lazy load pages
const AdminConsoleHomePage = lazy(() => import('./pages/admin-console-home.page'));
const TenantHomePage = lazy(() => import('./pages/tenant-home.page'));
// const RoleManagementPage = lazy(() => import('./pages/manage-role.page'));
// const UserManagementPage = lazy(() => import('./pages/manage-role.page'));
// const PermissionsPage = lazy(() => import('./pages/manage-permission.page'));

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
    <Route index element={<AdminConsoleHomePage />} />
    
    {/* Tenant Management Route */}
    <Route path="tenants" element={<TenantHomePage />} />
    
    {/* Role Management Route */}
    <Route path="roles" element={<RoleManagement />} />
    <Route path="roles/:id" element={<ManageRolesPage/>} />
    
    {/* User Management Route */}
    <Route path="users" element={<TenantHomePage />} />
    
    {/* Permissions Management Route */}
    <Route path="permissions" element={<TenantHomePage />} />
    
    {/* Example route for managing specific tenants */}
    <Route path="tenants/:tenantId" element={<TenantHomePage />} />
    
    {/* Example route for managing user permissions */}
    <Route path="permissions/:userId" element={<TenantHomePage />} />

    {/* Route for test settings */}
    <Route path="metadata" element={<Metadata />} />

    {/* Route for test settings */}
    <Route path="test-configurations" element={<TestConfigurations />} />
  </Route>
);
