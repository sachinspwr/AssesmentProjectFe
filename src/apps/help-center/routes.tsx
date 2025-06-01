import { Route } from 'react-router-dom';
import React, { lazy } from 'react';
import { HelpCenterLayout } from './layout';

const HelpCenterHomepage = lazy(() => import('./pages/help-center-home.page'));
const Docpage = lazy(() => import('./pages/help-doc.page'));

export const HelpCenterRoutes = (
  <Route 
    path="/help-center" // Changed to reflect the Help Center concept
    element={
      <React.Suspense fallback={<div>Loading help center...</div>}>
        <HelpCenterLayout />
      </React.Suspense>
    }
  >
    <Route index element={<HelpCenterHomepage />} /> 
    <Route path="docs" element={<Docpage />} /> {/* Can be used for the docs landing page */}
    <Route path="docs/:docTitle" element={<Docpage />} /> {/* Specific doc page */}
    <Route path="docs/:docTitle/:subTitle" element={<Docpage />} /> {/* Sub-section within a specific doc */}
  </Route>
);
