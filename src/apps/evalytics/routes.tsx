import { Route } from 'react-router-dom';
import React, { lazy } from 'react';
import { EvalyticsLayout } from './layout';
import ReviewQuestionpage from './pages/review-question/review-questions.page';
import ManageQuestionReviewpage from './pages/manage-question-review.page';
import ReviewTestpage from './pages/review-test/review-test.page';
import ManageTestReviewpage from './pages/manage-test-review.page';
const ReviewResultpage = lazy(() => import('./pages/review-result/review-result.page'));

export const EvalyticsRoutes = (
  <Route
    path="/evalytics/review" // Changed to reflect the Help Center concept
    element={
      <React.Suspense fallback={<div>Loading evalytics...</div>}>
        <EvalyticsLayout />
      </React.Suspense>
    }
  >
    <Route path="result" element={<ReviewResultpage />} />
    {/* <Route path='result/detailed-result' element={<ReviewDetailedResultpage/>} /> */}

    <Route path="question" element={<ReviewQuestionpage />} />
    <Route path="question/:id" element={<ManageQuestionReviewpage />} />

    <Route path="test" element={<ReviewTestpage />} />

    <Route path="test/:id" element={<ManageTestReviewpage />} />
  </Route>
);
