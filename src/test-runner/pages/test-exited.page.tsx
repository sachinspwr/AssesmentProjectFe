import { VFeedbackCard } from '@components/organisms';
import { useLocation, useNavigate } from 'react-router-dom';

function TestExitedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state?.title ?? 'You’ve Exited the Test';
  const message =
    location.state?.message ??
    'Your current test session has been exited. You can return anytime using the original test link.';

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Test Assistance Needed');
    const body = encodeURIComponent(
      `I exited the test process at: ${window.location.href}\n\n` +
        `Exit message: ${location.state?.message || 'None provided'}\n\n` +
        `Additional context:`
    );
    window.location.href = `mailto:support@valt.com?subject=${subject}&body=${body}`;
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
      title={title}
      message={
        <>
          <p>{message}</p>
          <p className="mt-2">If you need any help, our support team is just a message away.</p>
        </>
      }
      primaryAction={{ label: 'Re-Try Again', onClick: () => navigate(-1) }}
      secondaryAction={{ label: 'Return Home', onClick: handleContactSupport }}
      supportLink={{ label: 'Have concerns? Contact support', onClick: handleContactSupport }}
    />
  );
}

export { TestExitedPage };
