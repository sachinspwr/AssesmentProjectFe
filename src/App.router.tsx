import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import {
  AppLauncher,
  ComponentsPage,
  Dashboard,
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

import {
  TestQuestionPage,
  TestLandingPage,
  TestRedirectPage,
  InvalidLinkPage,
  TestSignoffPage,
  TestResultPage,
} from 'test-runner/pages';

import { FeedbackForm } from '@components/organisms/test-feedback-form/test-feedback-form.organism';
import { FeatureLayout } from '@components/templates/layout/feature-layout.template';
import { TermsAndServices } from '@components/organisms/compliance/terms-and-services.organism';
import ResetPasswordSuccessPage from '@components/pages/account/reset-password-success.page';
import VerifyAccountPage from '@components/pages/account/verify-account.page';
import VerifyAccountStatusPage from '@components/pages/account/verify-account-status.page';

// Assessment and Question Pages
import TestAssessmentPage from '@components/pages/assessment/assement.page';
import QuestionsPage from '@components/pages/question/questions.page';
import ManageQuestionPage from '@components/pages/question/manage-question.page';
import { ManageAssessment } from '@components/pages/assessment/manage-assessment.page';

// Account Pages
import RegisterUserSuccessPage from '@components/pages/account/register-user-success.page';

import { SubscriptionPage } from '@components/pages/subscription/subscription.page';
import RazorpayCheckout from '@services/payment.service';

// Test Runner Pages
import TestRegisterPage from 'test-runner/pages/test-register.page';
import TestMetadataPage from 'test-runner/pages/test-metadata.page';
import TestInterfacePage from 'test-runner/pages/test-interface.page';

// Subscription Pages
import { SubscriptionPlans } from '@components/organisms/subscription/subscription-plans.organism';
import UpgradeSubscriptionPage from '@components/pages/subscription/ugrade-subscription.page';

// Other Pages
import { BootstrapAppPage } from '@components/pages/app/bootstrap-app.page';
import { ErrorPage } from '@components/organisms/excel-select-preview/error.page';
import { ErrorBoundary } from '@components/organisms/error/error-bountry.organism';

// Support Docs

import AccountSettings from '@components/pages/account-setting/account-setting.page';
import { AuthenticatedLayout } from '@components/templates';
import { HeaderOnlyLayout } from '@components/templates/layout/header-only-layout.template';
import { HydrationProvider } from './context';
import { SubscriptionGuard } from 'guards';
import TestRunnerBootstrap from 'test-runner/pages/test-runner-bootstrap';
import CandidateTestResultPage from 'test-runner/pages/candidate-test-result.page';

import { LandingPage } from 'apps/landing';
import { SupportDeskRoutes } from 'apps/support-desk';
import { HelpCenterRoutes } from 'apps/help-center';
import { AdminConsoleRoutes } from 'apps/admin-console';
import { CodingTestEditor } from 'test-runner/pages/test-editor-page';
import { QuestionResponseDTO } from '@dto/response';
import { Answer } from 'test-runner/types';
import { EvalyticsRoutes } from 'apps/evalytics';

function AppRouter() {
  return (
    <div className="w-full h-screen">
      <Router>
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<LandingPage />} />
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
          <Route path="/terms-and-conditions" element={<TermsAndServices />} />

          {/* // Authenticated Layout */}
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route element={<HydrationProvider />}>
              {/* Bootstrap Page */}
              <Route path="/bootstrap" element={<BootstrapAppPage />} />

              <Route path="/apps" element={<AppLauncher />} />

              {/* Protect these routes with SubscriptionGuard */}
              <Route element={<SubscriptionGuard />}>
                <Route path="/" element={<FeatureLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="assessments" element={<TestAssessmentPage />} />
                  <Route path="assessments/:id" element={<ManageAssessment />} />
                  <Route path="support" element={<SupportPage />} />
                  <Route path="pricing" element={<SubscriptionPlans />} />
                  <Route path="subscriptions" element={<SubscriptionPage />} />
                  <Route path="tickets/:id" element={<ManageTicketPage />} />
                  <Route path="questions" element={<QuestionsPage />} />
                  <Route path="questions/:id" element={<ManageQuestionPage />} />
                  <Route path="settings" element={<AccountSettings />} />
                </Route>
              </Route>

              {/* These routes are outside SubscriptionGuard */}
              <Route path="/" element={<HeaderOnlyLayout />}>
                <Route path="subscriptions">
                  <Route path="upgrade" element={<UpgradeSubscriptionPage />} />
                </Route>
              </Route>

            </Route>
          </Route>

          {/* Test Runner Routes */}
          <Route path="/test-runner/:id/bootstrap" element={<TestRunnerBootstrap />} />
          <Route path="/test-runner/:id/register" element={<TestRegisterPage />} />
          <Route path="/test-runner/:id/test-metadata" element={<TestMetadataPage />} />
          <Route path="/test-runner/:id/test-interface" element={<TestInterfacePage />} />
          <Route path="/test-runner/redirect/:testLinkToken" element={<TestRedirectPage />} />
          <Route path="/test-runner/test/:testId" element={<TestLandingPage />} />
          <Route path="/test-runner/test/:testId/questions" element={<TestQuestionPage />} />
          <Route path="/test-runner/sign-off" element={<TestSignoffPage />} />
          <Route path="/test-feedback" element={<FeedbackForm />} />
          <Route path="/test-runner/invalid-link" element={<InvalidLinkPage />} />
          <Route path="/test-runner/test-result" element={<TestResultPage />} />
          <Route path="/test-runner/code-editor" element={<CodingTestEditor question={new QuestionResponseDTO} currentQuestionId={''} questionAnswer={''} isLastQuestion={false} onAnswer={function (questionId: string, answer: Answer): void {
            throw new Error('Function not implemented.');
          } } onSubmit={function (): void {
            throw new Error('Function not implemented.');
          } } onNext={function (): void {
            throw new Error('Function not implemented.');
          } } onBack={function (): void {
            throw new Error('Function not implemented.');
          } }/>} />
          <Route path='/test-runner/candidate-test-result' element={<CandidateTestResultPage/>} />

          {/* Payment Route */}
          <Route path="/payment" element={<RazorpayCheckout orderId={''} amount={0} subscriptionId={''} />} />

          {/* Support Doc Routes */}
          {HelpCenterRoutes}

           {/* Support Routes */}
          {SupportDeskRoutes}

           {/* Admin Routes */}
           {AdminConsoleRoutes}

          {/* Evaluate and Analytics Routes */}
           {EvalyticsRoutes}

          {/* Error Handling */}
          <Route
            path="/error"
            element={
              <ErrorBoundary>
                <ErrorPage />
              </ErrorBoundary>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
