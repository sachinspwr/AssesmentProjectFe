import { Navigate, Route } from 'react-router-dom';
import React, { lazy } from 'react';
import { EvalyticsLayout } from './layout';

const ReviewResultPage = lazy(() => import('./pages/review-result.component'));

export const EvalyticsRoutes = (
  <Route
    path="/evalytics" // Changed to reflect the Help Center concept
    element={
      <React.Suspense fallback={<div>Loading evalytics...</div>}>
        <EvalyticsLayout />
      </React.Suspense>
    }
  >
    <Route index element={<Navigate to="review" replace />} />
    <Route path="review" element={<ReviewResultPage />} />
  </Route>
);
