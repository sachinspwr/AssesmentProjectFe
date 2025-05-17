import { VButton } from '@components/atoms';
import { VAlert, VLoader } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VModal } from '@components/organisms';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  nextQuestion,
  prevQuestion,
  useSubmitAnswerMutation,
  useSubmitTestByUserMutation,
} from 'store/slices/test-runner.slice';
import { RootState } from 'store/store';

const TestNavigationButtons = ({ totalQuestions }: { totalQuestions: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitAnswer, { isLoading }] = useSubmitAnswerMutation();
  const [submitTestByUser, { isLoading: submitTestIsLoading, isSuccess, error }] = useSubmitTestByUserMutation();
  const selectedSectionId = useSelector((state: RootState) => state.testRunner.selectedSectionId);

  const sectionState = useSelector((state: RootState) =>
    state.testRunner.sections.find((s) => s.sectionId === selectedSectionId)
  );

  const currentIndex = sectionState?.currentQuestionIndex ?? 0;
  const questionIds = useSelector(
    (state: RootState) =>
      state.testRunner.testDetails?.testSections
        ?.find((s) => s.id === selectedSectionId)
        ?.questions?.map((q) => q.id) ?? []
  );

  const currentQuestionId = questionIds[currentIndex];

  const currentAnswer = sectionState?.userAnswers?.[currentQuestionId]?.answer;

  const handleSubmitAndNext = async () => {
    if (!selectedSectionId) return;
    try {
      await submitAnswer().unwrap();
      toast.success('Answer submitted!');
      dispatch(nextQuestion({ sectionId: selectedSectionId, totalQuestions }));
    } catch (error) {
      toast.error('Failed to submit answer');
    }
  };

  const handleSkipAndNext = () => {
    if (!selectedSectionId) return;
    console.log(`handleNext${selectedSectionId} toatl qu ${totalQuestions}`);
    dispatch(nextQuestion({ sectionId: selectedSectionId, totalQuestions }));
  };

  const handlePrev = () => {
    console.log('handleNext' + { sectionId: selectedSectionId });
    if (!selectedSectionId) return;
    dispatch(prevQuestion({ sectionId: selectedSectionId }));
  };

  const handleSubmitTest = async () => {
    try {
      await submitTestByUser().unwrap();
      toast.success('Test submitted successfully');
      navigate('/test-runner/sign-off');
      // maybe navigate or show success alert
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        {currentIndex > 0 && (
          <VButton variant="secondary" className={'w-56 text-nowrap'} onClick={handlePrev}>
            Back to Prev
          </VButton>
        )}

        <VButton
          variant="primary"
          className={'w-56 text-nowrap'}
          onClick={handleSubmitAndNext}
          disabled={!currentAnswer}
        >
          {isLoading ? (
            <VLoader size="sm" />
          ) : currentIndex === totalQuestions - 1 ? (
            'Submit'
          ) : (
            'Submit & Next Question'
          )}
          {/* {isLoading ? <VLoader size="sm" /> : 'Submit & Next Question'} */}
        </VButton>

        {currentIndex < totalQuestions - 1 && (
      <VButton variant="primary" className={'w-56 text-nowrap'} onClick={handleSkipAndNext}>
        Skip to Next Question
      </VButton>
    )}

        {/* <VButton variant="primary" className={'w-56 text-nowrap'} onClick={handleSkipAndNext}>
          Skip to Next Question
        </VButton> */}
      </div>

      <div>
        <VButton variant="secondary" onClick={() => setIsModalOpen(!isModalOpen)}>
          Force to Submit Assessment
        </VButton>
      </div>
      <VModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        title="Submit Test"
        width={40}
        showFooter={false}
        onSubmit={() => {}}
      >
        <VTypography as="h5" className="font-semibold">
          Are you sure you want to submit your test? Once submitted, you cannot make any further changes.
        </VTypography>
        {/* <div className="mt-10 mb-5 flex justify-between items-center"> */}
        {/* <div>
            <VButton variant="primary" className={'w-60'}>
              Go to the Test Section 2
            </VButton>
          </div> */}
        <div className="mt-10 mb-5 flex gap-5 justify-end">
          <VButton variant="secondary" className={'!w-28 text-nowrap'} onClick={() => setIsModalOpen(!isModalOpen)}>
            Cancel
          </VButton>
          <VButton
            variant="primary"
            className={'!w-56 text-nowrap'}
            onClick={handleSubmitTest}
            disabled={submitTestIsLoading}
          >
            {submitTestIsLoading ? <VLoader size="sm" /> : 'Submit Assignment'}
          </VButton>
          {/* </div> */}
        </div>
      </VModal>
    </div>
  );
};

export default TestNavigationButtons;
