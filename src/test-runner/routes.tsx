import React from 'react';
import { Route } from 'react-router-dom';
import {
  TestResultPage,
  BootstrapRunnerPage,
  UnauthorizedPage,
  ForbiddenPage,
  PrivacyRejectedPage,
  TestSignoffPage,
  TestRunnerLayout,
  TestExitedPage,
  TestFeedbackPage,
  TestSubmittedPage,
} from './pages';
import { RegisterParticipantPage } from './pages';
import { RequireLinkTokenGuard, TestSessionGuard, TestWorkflowGuard } from './guard';
import { TestWorkflowState } from './types';
import { TestRunnerProvider } from './providers';
import { TestFlowRoutes } from './core';
import TestOverviewPage from './pages/test-overview.page';
import PrivacyPolicyPage from './components/policy/privacy-policy-content.component';
import TestInterfacePage from './pages/test-interface.page';
import TestInterfaceLayout from './pages/layout/test-interface.layout';

function stripBasePath(route: string, base = '/test-runner/'): string {
  return route.startsWith(base) ? route.slice(base.length) : route;
}

export const TestRunnerRoutes = (
  <Route
    path="/participant"
    element={
      <TestRunnerProvider>
        <TestRunnerLayout />
      </TestRunnerProvider>
    }
  >
    {/* Initial Entry Point */}
    <Route
      path={stripBasePath(TestFlowRoutes.ENTRY)}
      element={
        <TestWorkflowGuard
          requiredState={TestWorkflowState.INITIAL}
          fallbackPath={TestFlowRoutes.PARTICIPANT_REGISTRATION}
        >
          <BootstrapRunnerPage />
        </TestWorkflowGuard>
      }
    />

    {/* Link TOken Protected Route */}
    <Route element={<RequireLinkTokenGuard />}>
      <Route
        path={stripBasePath(TestFlowRoutes.PARTICIPANT_REGISTRATION)}
        element={
          <TestWorkflowGuard
            requiredState={TestWorkflowState.REGISTRATION_REQUIRED}
            fallbackPath={TestFlowRoutes.ENTRY}
          >
            <RegisterParticipantPage />
          </TestWorkflowGuard>
        }
      />

      <Route
        path={stripBasePath(TestFlowRoutes.TEST_CANCELLED)}
        element={
          <TestWorkflowGuard requiredState={TestWorkflowState.SIGN_OFF} fallbackPath={TestFlowRoutes.ENTRY}>
            <TestExitedPage />
          </TestWorkflowGuard>
        }
      />
    </Route>
    {/* Registration */}

    {/* Protected Routes (require valid session) */}
    <Route element={<TestSessionGuard />}>
      <Route
        path={stripBasePath(TestFlowRoutes.TEST_OVERVIEW)}
        element={
          <TestWorkflowGuard requiredState={TestWorkflowState.TEST_OVERVIEW} fallbackPath={TestFlowRoutes.ENTRY}>
            <TestOverviewPage />
          </TestWorkflowGuard>
        }
      />

      <Route path={stripBasePath(TestFlowRoutes.PRIVACY_POLICY)} element={<PrivacyPolicyPage />} />
      <Route path={stripBasePath(TestFlowRoutes.PRIVACY_POLICY_REJECTED)} element={<PrivacyRejectedPage />} />

      <Route
        path={stripBasePath(TestFlowRoutes.TEST_INTERFACE)}
        element={
          <TestWorkflowGuard
            requiredState={TestWorkflowState.TEST_IN_PROGRESS}
            fallbackPath={TestFlowRoutes.TEST_OVERVIEW}
          >
            <TestInterfaceLayout />
          </TestWorkflowGuard>
        }
      >
        <Route index element={<TestInterfacePage />} />
      </Route>

      <Route
        path={stripBasePath(TestFlowRoutes.TEST_SUBMITTED)}
        element={
          <TestWorkflowGuard requiredState={TestWorkflowState.SIGN_OFF} fallbackPath={TestFlowRoutes.TEST_INTERFACE}>
            <TestSubmittedPage />
          </TestWorkflowGuard>
        }
      />

      <Route
        path={stripBasePath(TestFlowRoutes.TEST_FEEDBACK)}
        element={
          <TestWorkflowGuard
            requiredState={TestWorkflowState.FEEDBACK_REQUIRED}
            fallbackPath={TestFlowRoutes.TEST_RESULTS}
          >
            <TestFeedbackPage />
          </TestWorkflowGuard>
        }
      />

      <Route
        path={stripBasePath(TestFlowRoutes.TEST_RESULTS)}
        element={
          <TestWorkflowGuard
            requiredState={TestWorkflowState.RESULTS_AVAILABLE}
            fallbackPath={TestFlowRoutes.TEST_SIGNOFF}
          >
            <TestResultPage />
          </TestWorkflowGuard>
        }
      />

      <Route
        path={stripBasePath(TestFlowRoutes.TEST_SIGNOFF)}
        element={
          <TestWorkflowGuard
            requiredState={TestWorkflowState.RESULTS_AVAILABLE}
            fallbackPath={TestFlowRoutes.TEST_RESULTS}
          >
            <TestSignoffPage />
          </TestWorkflowGuard>
        }
      />
    </Route>

    {/* Error Routes */}
    <Route path={stripBasePath(TestFlowRoutes.ERROR_ACCESS_DENIED)} element={<UnauthorizedPage />} />
    <Route path={stripBasePath(TestFlowRoutes.ERROR_FORBIDDEN)} element={<ForbiddenPage />} />
  </Route>
);
