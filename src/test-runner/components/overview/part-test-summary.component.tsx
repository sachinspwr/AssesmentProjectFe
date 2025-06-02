import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { ConfirmExitTestModal } from '../submit';
import { Timer } from '../timer.component';

import { TestDetails } from 'test-runner/types';
import { useTestRunnerSelector, useTestRunnerDispatch, selectTestProgress } from 'test-runner/store';
import { selectSessionToken } from 'test-runner/store/participant';
import { TestFlowRoutes } from 'test-runner/core';
import { submitTestSession } from 'test-runner/middleware/workflow.middleware';
import { formatDuration } from '@utils/functions';

interface PartTestSummaryProps {
  testDetails?: TestDetails;
  showDescription?: boolean;
  showProgress?: boolean;
  className?: string;
}

export function PartTestSummary({
  testDetails,
  showDescription = true,
  showProgress = false,
  className = '',
}: PartTestSummaryProps) {
  const dispatch = useTestRunnerDispatch();
  const navigate = useNavigate();
  const sessionToken = useTestRunnerSelector(selectSessionToken); // Replace with actual method if needed

  const { answeredCount = 0, totalQuestions = 0, totalTime = 0 } = useTestRunnerSelector(selectTestProgress) || {};

  const [showCriticalWarning, setShowCriticalWarning] = useState(false);
  const [showFinalWarning, setShowFinalWarning] = useState(false);
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);

  const thresholdTriggered = useRef(false);
  const finalFiveSecTriggered = useRef(false);

  if (!testDetails) {
    return (
      <div className={`p-6 rounded-lg shadow-sm ${className}`}>
        <VTypography as="h4" className="text-theme-secondary">
          Loading test details...
        </VTypography>
      </div>
    );
  }

  const detailItems = [
    { label: 'Total Sections', value: testDetails.totalSections },
    { label: 'Total Questions', value: testDetails.totalQuestions },
    { label: 'Level', value: testDetails.experienceLevel.name },
    {
      label: 'Total Marks',
      value: testDetails.sections.flatMap((x) => x.questions).reduce((a, x) => a + x.marks, 0),
    },
    { label: 'Duration', value: formatDuration(totalTime.e) },
  ];

  const handleTimerComplete = async () => {
    console.log('Test time has expired!');
    setShowFinalWarning(true);

    if (!sessionToken) return;

    setIsSubmittingTest(true);
    try {
      dispatch(submitTestSession(sessionToken));
      toast.success('Test submitted successfully');
      navigate(TestFlowRoutes.TEST_SUBMITTED);
    } catch (error) {
      console.error('Error submitting test on timeout:', error);
      toast.error('Failed to submit test');
    } finally {
      setIsSubmittingTest(false);
    }
  };

  const handleTimerTick = (remainingSeconds: number) => {
    const criticalThreshold = 5 * 60;

    if (remainingSeconds <= criticalThreshold && !thresholdTriggered.current) {
      thresholdTriggered.current = true;
      setShowCriticalWarning(true);
    }

    if (remainingSeconds > criticalThreshold) {
      thresholdTriggered.current = false;
    }

    if (remainingSeconds <= 5 && !finalFiveSecTriggered.current) {
      finalFiveSecTriggered.current = true;
      setShowFinalWarning(true);
    }

    if (remainingSeconds > 5) {
      finalFiveSecTriggered.current = false;
    }
  };

  const handleAcknoledgeCriticalWarning = () => {
    setShowCriticalWarning(false);
  };

  return (
    <div className={`flex justify-between ${className}`}>
      {/* Left: Test Info */}
      <div className="flex flex-col gap-3 flex-1">
        <div>
          <VTypography as="h4" className="text-theme-primary font-semibold mb-1 text-lg">
            {testDetails.title}
          </VTypography>
          {showDescription && (
            <VTypography as="p" className="text-theme-secondary text-sm">
              Description: {testDetails.description}
            </VTypography>
          )}
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          {detailItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <VTypography as="p" className="text-theme-secondary text-sm tracking-wider">
                {item.label}:
              </VTypography>
              <VTypography as="span" className="text-theme-primary font-medium">
                {item.value}
              </VTypography>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Timer & Progress */}
      {showProgress && (
        <div className="flex gap-8 items-center">
          <div className="min-w-[300px] mt-6">
            <VProgressBar label="Progress" completed={answeredCount} outOf={totalQuestions} />
          </div>
          <div className="min-w-[100px] pt-8">
            <Timer mode="compact" duration={totalTime} onTick={handleTimerTick} onComplete={handleTimerComplete} />
          </div>
        </div>
      )}

      {/* 5-min Warning Modal */}
      <ConfirmExitTestModal
        title="Final Warning: Time is Running Out"
        message="You have less than 5 minutes left to complete your test."
        subMessages={[
          'Please review your answers.',
          'Ensure all responses are saved.',
        ]}
        showFooter={true}
        hideCancelButton={true}
        open={showCriticalWarning}
        onAccept={handleAcknoledgeCriticalWarning}
        acceptButtonLabel="Acknowledge"
        okButtonClasses="!bg-theme-positive !border-theme-positive"
        onReject={() => setShowCriticalWarning(false)}
      />

      {/* Final 5-Second Modal */}
      <ConfirmExitTestModal
        title="Time is Up"
        message="Your time has ended. Submitting your test automatically..."
        subMessages={['Please wait while we finalize your submission.']}
        showFooter={false}
        hideCancelButton={true}
        open={showFinalWarning}
        onAccept={() => {}}
        acceptButtonLabel={isSubmittingTest ? 'Submitting...' : 'Please wait...'}
        okButtonClasses="!bg-theme-positive !border-theme-positive pointer-events-none"
        onReject={() => {}}
      />
    </div>
  );
}
