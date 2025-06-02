import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { VButton } from '@components/atoms';
import {
  selectCurrentSection,
  selectSectionPaginationState,
  useTestRunnerDispatch,
  useTestRunnerSelector,
} from 'test-runner/store';
import { saveAnswer, submitTestSession } from 'test-runner/middleware/workflow.middleware';
import { useCurrentAnswer } from 'test-runner/hooks/use-current-answer.hook';
import {
  selectCurrentQuestionId,
  selectCurrentSectionId,
} from 'test-runner/store/session/navigation/navigation.selector';
import { selectSessionToken } from 'test-runner/store/participant';
import { navigateToQuestion, setAnswer } from 'test-runner/store/session';
import { ConfirmExitTestModal } from 'test-runner/components/submit';
import { TestFlowRoutes } from 'test-runner/core';
import { selectCurrentQuestionAnswer } from 'test-runner/store/session/answer';

export const SectionQuestionNavigator = React.memo(() => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmittingTest, setIsSubmittingTest] = React.useState(false);
  const dispatch = useTestRunnerDispatch();
  const navigate = useNavigate();

  // Select data from Redux store
  const sessionToken = useTestRunnerSelector(selectSessionToken);
  const currentSection = useTestRunnerSelector(selectCurrentSection);
  const currentSectionId = useTestRunnerSelector(selectCurrentSectionId);
  const currentQuestionId = useTestRunnerSelector(selectCurrentQuestionId);
  const { currentPage, totalPages, pages } = useTestRunnerSelector(selectSectionPaginationState);
  const currentAnswer = useCurrentAnswer();

  const isLastQuestion = currentPage === totalPages;

  // Save answer to both answers slice and API
  const userAnswer = useTestRunnerSelector(React.useCallback(selectCurrentQuestionAnswer, []));

  const saveCurrentAnswer = React.useCallback(async () => {
    if (!currentQuestionId || !currentAnswer) return;

    try {
      // Save to Redux answers slice
      dispatch(
        setAnswer({
          questionId: currentQuestionId,
          answer: JSON.stringify(currentAnswer),
        })
      );

      // Save to API if we have a session token
      if (sessionToken && currentSectionId) {
        await dispatch(saveAnswer(sessionToken, currentSectionId, currentQuestionId, currentAnswer));
      }
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  }, [currentQuestionId, currentAnswer, sessionToken, currentSectionId, dispatch]);

  const handleNavigation = React.useCallback(
    async (direction: 'prev' | 'next') => {
      if (!currentSection || !pages.length) return;

      // Save current answer before navigating
      await saveCurrentAnswer();

      const currentIndex = pages.findIndex((p) => p.id === currentQuestionId);
      if (currentIndex === -1) return;

      const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= pages.length) return;

      dispatch(
        navigateToQuestion({
          sectionId: currentSection.id,
          questionId: pages[newIndex].id,
          eventType: 'manual',
        })
      );
    },
    [currentSection, currentQuestionId, pages, dispatch, saveCurrentAnswer]
  );

  const handleSubmitAnswer = React.useCallback(async () => {
    if (!currentSection || !currentQuestionId) return;

    setIsSubmitting(true);
    try {
      // Save to both Redux and API
      await saveCurrentAnswer();
      toast.success('Answer saved');
      handleNavigation('next');
    } catch (error) {
      toast.error('Failed to save answer');
    } finally {
      setIsSubmitting(false);
    }
  }, [currentSection, currentQuestionId, handleNavigation, saveCurrentAnswer]);

  const handleSubmitTest = React.useCallback(async () => {
    if (!sessionToken) return;

    setIsSubmittingTest(true);
    try {
      // Ensure final answer is saved before submission
      await saveCurrentAnswer();

      await dispatch(submitTestSession(sessionToken));
      toast.success('Test submitted successfully');
      navigate(TestFlowRoutes.TEST_SUBMITTED);
    } catch (error) {
      console.log(error);
      toast.error('Failed to submit test');
    } finally {
      setIsSubmittingTest(false);
    }
  }, [sessionToken, dispatch, navigate, saveCurrentAnswer]);

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex gap-2 items-center">
        {currentPage > 1 && (
          <VButton variant="secondary" className="w-56 text-nowrap" onClick={() => handleNavigation('prev')}>
            Back to Previous
          </VButton>
        )}

        <VButton
          variant="primary"
          className="w-56 text-nowrap"
          onClick={isLastQuestion ? handleSubmitTest : handleSubmitAnswer}
          disabled={!userAnswer && !isLastQuestion}
          isLoading={isSubmitting}
        >
          {isLastQuestion ? 'Submit Test' : 'Submit & Next'}
        </VButton>

        {!isLastQuestion && (
          <VButton variant="primary" className="w-56 text-nowrap" onClick={() => handleNavigation('next')}>
            Skip to Next
          </VButton>
        )}
      </div>

      {!isLastQuestion && (
        <VButton variant="secondary" className="!w-64" onClick={() => setIsModalOpen(true)}>
          Force to Submit Assessment
        </VButton>
      )}

      <ConfirmExitTestModal
        title="Confirm Force Submit?"
        message="Are you sure you want to submit the test now?"
        subMessages={[
          'You will not be able to make any further changes to your answers after submission.',
          'If your test policy allows, you may use the same link to continue the test later.',
          "Make sure you've attempted all questions before submitting.",
        ]}
        isAcceptLoading={isSubmittingTest}
        open={isModalOpen}
        onAccept={handleSubmitTest}
        acceptButtonLabel="Submit"
        onReject={() => setIsModalOpen(false)}
      />
    </div>
  );
});
