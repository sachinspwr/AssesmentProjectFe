import React, { useEffect, useState } from 'react';
import { localStorageService } from '@services/local-storage.service';
import { StorageKeys } from '@utils/index';
import { useAcceptInvitationMutation } from 'store/slices/test-invitation.slice';
import { initializeLinkTokenFromUrl } from './initialize-link-token-from-url';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
// import { VButton } from '@components/atoms/button/v-button.atom';

function AssessmentInvitationAcceptPage() {
  const [status, setStatus] = useState<'initial' | 'pending' | 'success' | 'error'>('initial');
  const [acceptInvitation] = useAcceptInvitationMutation();

  useEffect(() => {
    const run = async () => {
      initializeLinkTokenFromUrl();
      const token = localStorageService.getItem(StorageKeys.TOKEN) as string;

      if (!token) {
        setStatus('error');
        return;
      }
      setStatus('pending');
      try {
        await acceptInvitation(token).unwrap();
        localStorageService.removeItem(StorageKeys.TOKEN);
        setStatus('success');
      } catch (err) {
        console.error('❌ Accept failed:', err);
        setStatus('error');
      }
    };

    if (status === 'initial') {
      run();
    }
  }, [status, acceptInvitation]);

  // const handleRetry = () => setStatus('initial');

  const handleMailSupport = () => {
    window.location.href =
      'mailto:support@valt.com?subject=Invitation%20Acceptance%20Concerns&body=I%20have%20questions%20about...';
  };

  if (status === 'initial' || status === 'pending') {
    const message =
      status === 'initial' ? 'Loading...' : 'Processing your acceptance...';

    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <VLoader />
        <span className="mt-4 text-lg">{message}</span>
      </div>
    );
  }

  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl shadow-sm p-8 text-center border-2">
        <div className="mb-6">
          {isSuccess && (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-10 w-10 text-green-600" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {isError && (
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-10 w-10 text-red-600" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {isSuccess && (
            <>
              <VTypography as="h2" color="primary" className="text-2xl font-bold">
                Invitation Accepted
              </VTypography>
              <VTypography as="p" color="secondary">
                You can now proceed to take the assessment.
              </VTypography>
              <div className="mt-4 p-4">
                <VTypography as="p" color="secondary" className="text-sm font-medium mb-2">
                  Next Steps
                </VTypography>
                <ul className="text-left list-disc list-inside text-sm text-theme-secondary space-y-1">
                  <li>Check your email for assessment details</li>
                  <li>Prepare any required materials</li>
                  <li>Complete the assessment by the deadline</li>
                </ul>
              </div>
            </>
          )}

          {isError && (
            <div className='pb-2 space-y-2'>
              <VTypography as="h2" color="primary" className="text-2xl font-bold">
                Error Occurred
              </VTypography>
              <VTypography as="p" color="secondary">
                Failed to accept the assessment invitation.
              </VTypography>
              <VTypography as="p" color="secondary" className="text-sm mb-4">
                Please try again later or contact support.
              </VTypography>
            </div>
          )}
        </div>

        {(isSuccess || isError) && (
          <div className="mt-2 pt-6 border-t">
            <VTypography as="p" color="secondary" className="text-sm">
              {isSuccess
                ? 'Good luck with your assessment!'
                : 'We apologize for the inconvenience.'}
            </VTypography>
          </div>
        )}

        <div className="mt-3 text-center">
          <VTypography as="p" color="secondary" className="text-sm">
            Need help?{' '}
            <span onClick={handleMailSupport} className="text-theme-brand cursor-pointer">
              Contact support
            </span>
          </VTypography>
        </div>
      </div>
    </div>
  );
}

export default AssessmentInvitationAcceptPage;
