import { VModal } from '@components/organisms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useMemo } from 'react';
import { TestResultResponseDTO } from '@dto/response';
import { VLabelledInput } from '@components/molecules/index';
import { VButton } from '@components/atoms';
import ManageQuestionPreviewpage from '@components/pages/question/manage-question-preview.page';

function DynamicQuestionModal({
  isOpen,
  onClose,
  sectionId,
  questionId,
  detailedResultData,
}: {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  questionId: string;
  detailedResultData: TestResultResponseDTO;
}) {
  const section = detailedResultData?.test?.testSections?.find((sec) => sec.id === sectionId);
  const question = section?.question?.find((q) => q.id === questionId);
  const answer = detailedResultData?.testQuestionAnswer.find(
    (ans) => ans.sectionId === sectionId && ans.questionId === questionId
  );

  const selectedValues = useMemo(() => {
    return Array.isArray(answer?.answerText) ? answer.answerText : answer?.answerText?.split(',') || [];
  }, [answer]);

  const correctAnswers = useMemo(() => {
    return question?.correctAnswer?.split(',')?.map((opt) => opt.trim()) || [];
  }, [question]);


  if (!section || !question) return null;

  return (
    <VModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div>
          <VTypography>Question & Answer Overview</VTypography>
          <div className="flex gap-5 items-center mt-2">
            <VTypography color="muted" className="text-xs">
              Marks:{' '}
              <span className="text-theme-primary">
                {answer?.finalMarks ?? 0}/{question?.marks}
              </span>
            </VTypography>
            <VTypography color="muted" className="text-xs">
              Time Limit: <span className="text-theme-primary">{question?.timeLimit ?? 0} sec</span>
            </VTypography>
            <VTypography color="muted" className="text-xs">
              Difficulty Level: <span className="text-theme-primary">{question?.difficulty}</span>
            </VTypography>
          </div>
        </div>
      }
      width={50}
      showFooter={false}
    >
      <ManageQuestionPreviewpage
        type={question?.type ?? ''}
        formData={question}
        mode="review"
        selectedAnswers={selectedValues}
        correctAnswers={correctAnswers}
      />

    <div className="border-b theme-border-default mt-4"></div>
        <div className="flex flex-col gap-2">
          <VTypography as="h6" color="primary" className="mt-2">
            Add score for this question
          </VTypography>
          <VLabelledInput name="score" label="Score" placeholder="Enter Score" required className="w-96" />
            <div className="flex flex-row gap-4 mt-2">
              <VButton variant="secondary" className="!w-[100px]" onClick={onClose}>
                Cancel
              </VButton>
              <VButton variant="primary" className="!w-[170px]">Review & Submit</VButton>
            </div>
          </div>
    </VModal>
  );
}

export default DynamicQuestionModal;
