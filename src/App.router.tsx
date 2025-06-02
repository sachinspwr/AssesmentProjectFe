import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import {
  AppLauncher,
  ComponentsPage,
  ForgotPasswordPage,
  LoginPage,
  LogoutPage,
  ManageTicketPage,
  NotFoundPage,
  RegisterPage,
  RequestaDemoPage,
  ResetPasswordPage,
  SupportPage,
} from '@components/pages';

import { FeatureLayout } from '@components/templates/layout/feature-layout.template';
import ResetPasswordSuccessPage from '@components/pages/account/reset-password-success.page';
import VerifyAccountPage from '@components/pages/account/verify-account.page';
import VerifyAccountStatusPage from '@components/pages/account/verify-account-status.page';

// Assessment and Question pages
import TestAssessmentpage from '@components/pages/assessment/assement.page';
import Questionspage from '@components/pages/question/questions.page';
import ManageQuestionpage from '@components/pages/question/manage-question.page';
import { ManageAssessment } from '@components/pages/assessment/manage-assessment.page';

// Account pages
import RegisterUserSuccessPage from '@components/pages/account/register-user-success.page';

import { Subscriptionpage } from '@components/pages/subscription/subscription.page';
import RazorpayCheckout from '@services/payment.service';

// Subscription pages
import { SubscriptionPlans } from '@components/organisms/subscription/subscription-plans.organism';
import UpgradeSubscriptionpage from '@components/pages/subscription/ugrade-subscription.page';

// Other pages
import { BootstrapAppPage } from '@components/pages/app/bootstrap-app.page';
import { Errorpage } from '@components/organisms/excel-select-preview/error.page';
import { ErrorBoundary } from '@components/organisms/error/error-bountry.organism';

// Support Docs

import AccountSettings from '@components/pages/account-setting/account-setting.page';
import { AuthenticatedLayout } from '@components/templates';
import { HeaderOnlyLayout } from '@components/templates/layout/header-only-layout.template';
import { HydrationProvider } from './context';
import { SubscriptionGuard } from 'guards';

import { Landingpage } from 'apps/landing';
import { SupportDeskRoutes } from 'apps/support-desk';
import { HelpCenterRoutes } from 'apps/help-center';
import { AdminConsoleRoutes } from 'apps/admin-console';
import { EvalyticsRoutes } from 'apps/evalytics';
import DetailedCandidateTestResultPage from 'test-result/detailed-candidate-result.page';
import UserResultDashboard from 'test-result/user-result-dashboard.page';
import InvitationPage from '@components/pages/invitation/invitation.page';
import InvitationAcceptPage from '@components/pages/invitation/invitation-accept.page';
import InvitationRejectPage from '@components/pages/invitation/invitation-reject.page';
import LinkRegisterPage from '@components/pages/invitation/link-register.page';
import InviteTestPage from '@components/pages/invitation/invite-test.page';
import { CompliancePage } from '@components/pages/compliance.page';
import PrivacyPolicy from '@components/organisms/compliance/privacy-policy.organism';
import Dashboard from '@components/pages/dashboard.page';
import MaintenanceCheckProvider from '@context/maintenance-check-provider';
import { TestRunnerRoutes } from 'test-runner';
function AppRouter() {
  return (
    <div className="w-full h-screen">
      <Router>
        <MaintenanceCheckProvider>
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Landingpage />} />
            <Route path="/components" element={<ComponentsPage />} />

            {/* Account Routes */}
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<RegisterPage />} />
            <Route path="/register-user-success" element={<RegisterUserSuccessPage />} />
            <Route path="/sign-out" element={<LogoutPage />} />
            <Route path="/verify-account" element={<VerifyAccountPage />} />
            <Route path="/verify-account-status" element={<VerifyAccountStatusPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/reset-password-success" element={<ResetPasswordSuccessPage />} />
            <Route path="/request-demo" element={<RequestaDemoPage />} />
            <Route path="/compliance-page" element={<CompliancePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* // Authenticated Layout */}
            <Route path="/" element={<AuthenticatedLayout />}>
              <Route path="invitations/accept" element={<InvitationAcceptPage />} />
              <Route path="invitations/reject" element={<InvitationRejectPage />} />
              <Route path="link/register" element={<LinkRegisterPage />} />

              <Route element={<HydrationProvider />}>
                {/* Bootstrap Page */}
                <Route path="/bootstrap" element={<BootstrapAppPage />} />
                <Route path="/apps" element={<AppLauncher />} />

                {/* Protect these routes with SubscriptionGuard */}
                <Route element={<SubscriptionGuard />}>
                  <Route path="/" element={<FeatureLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="assessments" element={<TestAssessmentpage />} />
                    <Route path="assessments/:id" element={<ManageAssessment />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="pricing" element={<SubscriptionPlans />} />
                    <Route path="subscriptions" element={<Subscriptionpage />} />
                    <Route path="tickets/:id" element={<ManageTicketPage />} />
                    <Route path="questions" element={<Questionspage />} />
                    <Route path="questions/:id" element={<ManageQuestionpage />} />
                    <Route path="settings" element={<AccountSettings />} />
                    <Route path="user-dashboard" element={<UserResultDashboard />} />
                    <Route path="test-results/:resultId" element={<DetailedCandidateTestResultPage />} />
                    <Route path="invite" element={<InvitationPage />} />
                    {/* <Route path="invite" element={<InvitationPage />} /> */}
                    <Route path="link/:id" element={<InviteTestPage />} />
                  </Route>
                </Route>

                {/* These routes are outside SubscriptionGuard */}
                <Route path="/" element={<HeaderOnlyLayout />}>
                  <Route path="subscriptions">
                    <Route path="upgrade" element={<UpgradeSubscriptionpage />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* Support Doc Routes */}
            {HelpCenterRoutes}

            {/* Payment Route */}
            <Route path="/payment" element={<RazorpayCheckout orderId={''} amount={0} subscriptionId={''} />} />

            {/* Support Doc Routes */}
            {HelpCenterRoutes}

            {/* Support Routes */}
            {SupportDeskRoutes}

            {/* Test Runner Routes */}
            {TestRunnerRoutes}

            {AdminConsoleRoutes}

            {/* Evaluate and Analytics Routes */}
            {EvalyticsRoutes}

            {/* Error Handling */}
            <Route
              path="/error"
              element={
                <ErrorBoundary>
                  <Errorpage />
                </ErrorBoundary>
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MaintenanceCheckProvider>
      </Router>
    </div>
  );
}

export default AppRouter;
