import { VModal } from '@components/organisms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useMemo } from 'react';
import { TestResultResponseDTO } from '@dto/response';
import ManageQuestionPreviewpage from '@components/pages/question/manage-question-preview.page';
import { VStatus } from '@components/atoms';

function DynamicQuestionModal({
  isOpen,
  onClose,
  sectionId,
  questionId,
  detailedResultData,
  mode
}: {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  questionId: string;
  detailedResultData: TestResultResponseDTO;
  mode?: 'review' | 'view'
}) {
  const section = Array.isArray(detailedResultData?.sections)
    ? detailedResultData.sections.find((sec) => sec.id === sectionId)
    : undefined;

  const question = Array.isArray(section?.questions) ? section.questions.find((q) => q.id === questionId) : undefined;

  const correctAnswers = useMemo(() => {
    return question?.correctAnswer?.split(',')?.map((opt) => opt.trim()) || [];
  }, [question]);

  const selectedAnswers = useMemo(() => {
    return question?.userAnswer
      ? question.userAnswer.split(',').map((opt) => opt.trim())
      : [];
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
                {question?.score ?? 0}/{question?.maxScore}
              </span>
            </VTypography>
            <VTypography color="muted" className="text-xs">
              Time Limit: <span className="text-theme-primary">{question?.timeSpentSeconds ?? 0} sec</span>
            </VTypography>
            <VTypography color="muted" className="text-xs">
              Difficulty Level: <span className="text-theme-primary">{question?.difficulty}</span>
            </VTypography>
            <VStatus 
              label={question?.status} 
              type={ question?.status === "answered" ? 'positive' : 'negative'}/>
          </div>
        </div>
      }
      width={50}
      showFooter={false}
    >
      <ManageQuestionPreviewpage
        type={question?.type ?? ''}
        formData={question}
        mode={mode}
        onClose={onClose}
        selectedAnswers={selectedAnswers}
        correctAnswers={correctAnswers}
      />
    </VModal>
  );
}

export default DynamicQuestionModal;
