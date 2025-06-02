import { VFeedbackCard } from '@components/organisms';
import { useNavigate, useLocation } from 'react-router-dom';
import { TestFlowRoutes } from 'test-runner/core';
import { useTestRunnerDispatch } from 'test-runner/store';
import { resetRejectPrivacyPolicy } from 'test-runner/store/participant';

export function PrivacyRejectedPage() {
  const dispatch = useTestRunnerDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || '/';

  const handleTryAgain = () => {
    dispatch(resetRejectPrivacyPolicy());
    navigate(TestFlowRoutes.TEST_OVERVIEW, {
      state: { showPolicyModal: true },
      replace: true,
    });
  };

  const handleContactSupport = () => {
    window.location.href =
      'mailto:support@valt.com?subject=Privacy%20Policy%20Concerns&body=I%20have%20questions%20about...';
  };

  return (
    <VFeedbackCard
      icon={
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.59 3z"
          />
        </svg>
      }
      title="Consent Required"
      message="To proceed, you must agree to our Privacy Policy. This ensures a secure and transparent experience."
      additionalNote={
        <>
          <strong>Why we collect data:</strong> To ensure test security, prevent abuse, and support platform
          performance.
        </>
      }
      primaryAction={{ label: 'Review Policy', onClick: handleTryAgain }}
      secondaryAction={{ label: 'Return to Home', onClick: () => navigate(fromPage, { replace: true }) }}
      supportLink={{ label: 'Have concerns? Contact support', onClick: handleContactSupport }}
    />
  );
}
