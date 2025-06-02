import { VFeedbackCard } from '@components/organisms';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLock } from 'react-icons/tb';

export function UnauthorizedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as
    | {
        error?: string;
        details?: string;
        retryUrl?: string;
      }
    | undefined;

  const searchParams = new URLSearchParams(location.search);
  const showBack = searchParams.get('showBack') === 'true';
  const allowRetry = searchParams.get('allowRetry') === 'true';

  const handleContactSupport = () => {
    const subject = encodeURIComponent('Access Denied Assistance');
    const body = encodeURIComponent(
      `I encountered an access issue at: ${window.location.href}\n\n` +
        `Error details: ${state?.error || 'None provided'}\n\n` +
        `Additional context:`
    );
    window.location.href = `mailto:support@valt.com?subject=${subject}&body=${body}`;
  };

  const handleRetry = () => {
    if (state?.retryUrl) {
      window.location.href = state.retryUrl;
    } else {
      window.location.reload();
    }
  };

  return (
    <VFeedbackCard
      icon={<TbLock className="w-10 h-10 text-theme-negative" />}
      title="Access Restricted"
      message={
        <>
          <p>{state?.error || "You don't have permission to view this resource."}</p>
          {state?.details && <p className="mt-2 text-sm text-gray-600">{state.details}</p>}
          <p className="mt-4 text-sm text-gray-400">Error code: 403_Forbidden</p>
        </>
      }
      primaryAction={
        allowRetry
          ? { label: 'Try Again', onClick: handleRetry }
          : showBack
            ? { label: 'Go Back', onClick: () => navigate(-1) }
            : { label: 'Read Docs', onClick: () => navigate('/help-center/docs') }
      }
      secondaryAction={{ label: 'Go Home', onClick: () => navigate('/') }}
      supportLink={{
        label: 'Need help? Reach out to our team',
        onClick: handleContactSupport,
      }}
    />
  );
}
