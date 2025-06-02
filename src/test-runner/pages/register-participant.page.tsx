/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VFormFieldData } from '@types';
import { useTestRunnerSelector } from 'test-runner/store';
import { selectRegistrationFields } from 'test-runner/store/participant';
import { ParticipantRegistrationForm } from 'test-runner/components';
import { TestFlowRoutes } from 'test-runner/core';
import { Image } from '@components/atoms';
import { useTestWorkflow } from 'test-runner/hooks';
import { ConfirmExitTestModal } from 'test-runner/components/submit';

function transformRegistrationData(formData: Record<string, any>) {
  const result: Record<string, any> = {
    email: formData.email,
    profile: {},
  };

  Object.entries(formData).forEach(([key, value]) => {
    if (key !== 'email') {
      result.profile[key] = value;
    }
  });

  return result;
}

export function RegisterParticipantPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const registrationFields = useTestRunnerSelector(selectRegistrationFields);

  const { session, testDetails, registerParticipant } = useTestWorkflow();

  const handleRegistrationSubmit = async (formData: VFormFieldData) => {
    const reqBody = transformRegistrationData(formData);
    try {
      setIsSubmitting(true);
      await registerParticipant(reqBody); // ⬅️ Dispatch via hook
    } catch {
      navigate(TestFlowRoutes.ERROR_ACCESS_DENIED, {
        state: { error: 'Participant Registration Failed' },
      });
    }
  };

  const handleCancelClick = () => setShowCancelModal(true);

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    navigate(TestFlowRoutes.TEST_CANCELLED, {
      state: {
        title: 'Registration Cancelled',
        message: "You've exited the registration process. To restart, use your original test link.",
      },
    });
  };

  const handleRejectCancel = () => setShowCancelModal(false);

  useEffect(() => {
    if (session?.token && testDetails) {
      setIsSubmitting(false);
      navigate(TestFlowRoutes.TEST_OVERVIEW, {
        state: {
          sessionToken: session.token,
          testDetails,
        },
        replace: true,
      });
    }
  }, [session, testDetails, navigate]);

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-theme-background overflow-hidden">
      {/* Left Section - Illustration */}
      <div className="w-full lg:w-1/2 h-[40vh] lg:h-full overflow-hidden">
        <Image
          src="/src/assets/svgs/register-participant.svg"
          className="w-full h-full object-contain"
          alt="Register illustration"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full lg:max-w-xl xl:max-w-2xl">
          <ParticipantRegistrationForm
            registrationFields={registrationFields}
            onSubmit={handleRegistrationSubmit}
            onCancelRegistration={handleCancelClick}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Confirm Cancel Modal */}
      <ConfirmExitTestModal
        title="Confirm Registration Exit"
        open={showCancelModal}
        onAccept={handleConfirmCancel}
        onReject={handleRejectCancel}
        message="Are you sure you want to cancel the registration process? Your progress will not be saved and you’ll be returned to the start."
        subMessages={['If you change your mind later, you can always restart the process using the same test link.']}
      />
    </div>
  );
}
