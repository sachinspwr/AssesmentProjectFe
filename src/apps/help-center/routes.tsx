import { Route } from 'react-router-dom';
import React, { lazy } from 'react';
import { HelpCenterLayout } from './layout';

const HelpCenterHomePage = lazy(() => import('./pages/help-center-home.page'));
const DocPage = lazy(() => import('./pages/help-doc.page'));

export const HelpCenterRoutes = (
  <Route 
    path="/help-center" // Changed to reflect the Help Center concept
    element={
      <React.Suspense fallback={<div>Loading help center...</div>}>
        <HelpCenterLayout />
      </React.Suspense>
    }
  >
    <Route index element={<HelpCenterHomePage />} /> 
    <Route path="docs" element={<DocPage />} /> {/* Can be used for the docs landing page */}
    <Route path="docs/:docTitle" element={<DocPage />} /> {/* Specific doc page */}
    <Route path="docs/:docTitle/:subTitle" element={<DocPage />} /> {/* Sub-section within a specific doc */}
  </Route>
);
