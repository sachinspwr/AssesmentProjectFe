import { Navigate, Route } from 'react-router-dom';
import React, { lazy } from 'react';

// Lazy loading the layout and page components
const SupportDeskLayout = lazy(() => import('./layout'));
const TicketsPage = lazy(() => import('./pages/desk-ticket-summary.page'));
const SupportDocsPage = lazy(() => import('./pages/desk-support-doc.page'));
const ArticlesPage = lazy(() => import('./pages/desk-articles.page'));
const ManageSupportDocPage = lazy(() => import('./pages/manage-support-doc.page'));
const ManageSupportSubDocPage = lazy(() => import('./pages/manage-support-sub-doc.page'));
const ManageArticlesPage = lazy(() => import('./pages/manage-articles.page'));

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
    <Route path="tickets" element={<TicketsPage />} />

    {/* Support Document */}
    <Route path="docs" element={<SupportDocsPage />} />
    <Route path="docs/0" element={<ManageSupportDocPage mode="create" />} />
    <Route path="docs/:id" element={<ManageSupportDocPage />} />

    {/* Support Sub Document */}
    <Route path="docs/:parentId/sub-doc/0" element={<ManageSupportSubDocPage mode="create" />} />
    <Route path="docs/:parentSlug/sub-doc/:slug" element={<ManageSupportSubDocPage />} />

    {/* Article */}
    <Route path="articles" element={<ArticlesPage />} />
    <Route path="articles/0" element={<ManageArticlesPage mode="create" />} />
    <Route path="articles/:id" element={<ManageArticlesPage />} />
  </Route>
);
