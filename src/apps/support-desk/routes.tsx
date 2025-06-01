import { Navigate, Route } from 'react-router-dom';
import React, { lazy } from 'react';

// Lazy loading the layout and page components
const SupportDeskLayout = lazy(() => import('./layout'));
const Ticketspage = lazy(() => import('./pages/desk-ticket-summary.page'));
const SupportDocspage = lazy(() => import('./pages/desk-support-doc.page'));
const Articlespage = lazy(() => import('./pages/desk-articles.page'));
const ManageSupportDocpage = lazy(() => import('./pages/manage-support-doc.page'));
const ManageSupportSubDocpage = lazy(() => import('./pages/manage-support-sub-doc.page'));
const ManageArticlespage = lazy(() => import('./pages/manage-articles.page'));

export const SupportDeskRoutes = (
  <Route
    path="/support-desk"
    element={
      <React.Suspense fallback={<div>Loading options...</div>}>
        <SupportDeskLayout />
      </React.Suspense>
    }
  >
    <Route index element={<Navigate to="tickets" replace />} />
    <Route path="tickets" element={<Ticketspage />} />

    {/* Support Document */}
    <Route path="docs" element={<SupportDocspage />} />
    <Route path="docs/0" element={<ManageSupportDocpage mode="create" />} />
    <Route path="docs/:id" element={<ManageSupportDocpage />} />

    {/* Support Sub Document */}
    <Route path="docs/:parentId/sub-doc/0" element={<ManageSupportSubDocpage mode="create" />} />
    <Route path="docs/:parentSlug/sub-doc/:slug" element={<ManageSupportSubDocpage />} />

    {/* Article */}
    <Route path="articles" element={<Articlespage />} />
    <Route path="articles/0" element={<ManageArticlespage mode="create" />} />
    <Route path="articles/:id" element={<ManageArticlespage />} />
  </Route>
);
