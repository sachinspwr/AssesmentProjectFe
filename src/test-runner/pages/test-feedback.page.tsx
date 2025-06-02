import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { selectSessionToken } from 'test-runner/store/participant';
import { ParticipantTestFeedbackForm } from 'test-runner/components/feedback';
import { VFormFieldData } from '@types';
import { TestFlowRoutes } from 'test-runner/core';
import { VFeedbackCard } from '@components/organisms';
import { VImage } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import {  useTestRunnerDispatch, useTestRunnerSelector } from 'test-runner/store';
import { submitTestFeedback } from 'test-runner/middleware/workflow.middleware';

function TestFeedbackPage() {
  const sessionToken = useTestRunnerSelector(selectSessionToken);
  const dispatch = useTestRunnerDispatch();
  const navigate = useNavigate();
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleFeedbackSubmit = async (formData: VFormFieldData) => {
    if (!sessionToken) {
      throw new Error('Session token is required');
    }

    try {
      setSubmitError(false);
      setIsSubmittingFeedback(true);

      // Prepare the complete feedback payload
      const feedbackPayload = {
        ...formData,
        timestamp: new Date().toISOString(),
      };

      // Call the thunk action with correct parameters
      await dispatch(submitTestFeedback(sessionToken, feedbackPayload));

      toast.success('Feedback submitted successfully');
      navigate(TestFlowRoutes.TEST_SIGNOFF);
    } catch (error: any) {
      console.error('Feedback submission error:', error);
      setSubmitError(true);
      toast.error(error.message || 'Failed to submit feedback');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleContactSupport = () => {
    // Add custom support logic or redirection here
    navigate('/');
  };

  if (submitError) {
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
        title="Submission Failed"
        message={
          <>
            <p>We couldn't submit your feedback. Please check your connection or try again later.</p>
            <p className="mt-2">If you need any help, our support team is just a message away.</p>
          </>
        }
        primaryAction={{ label: 'Re-Try Again', onClick: () => setSubmitError(false) }}
        secondaryAction={{ label: 'Return Home', onClick: handleContactSupport }}
        supportLink={{ label: 'Have concerns? Contact support', onClick: handleContactSupport }}
      />
    );
  }
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-theme-background overflow-hidden">
      {/* Left Illustration Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-theme-highlight">
        <VImage src="/src/assets/svgs/feedback.svg" className="max-w-full h-auto" />
      </div>

      {/* Right Feedback Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-10 gap-8">
        <div className="flex flex-col gap-4">
          <VTypography as="h2" color="brand">
            Thank You for Taking the Test!
          </VTypography>

          <VTypography as="p" className="text-md  text-theme-muted max-w-lg">
            We appreciate your feedback — it helps us improve the testing experience for everyone. Your input is
            valuable to us.
          </VTypography>
        </div>

        <ParticipantTestFeedbackForm onSubmit={handleFeedbackSubmit} isFormSubmitting={isSubmittingFeedback} />
      </div>
    </div>
  );
}

export { TestFeedbackPage };
