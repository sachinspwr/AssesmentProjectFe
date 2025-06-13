import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VButton, VStatus } from '@components/atoms';
import { VLoader } from '@components/molecules';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { useGetDetailedResultQuery } from 'store/slices/test-result.slice';

import { generateResultPDF } from './generateResultPDF';
import DynamicQuestionModal from './dynamic-question-modal';
import AssessmentQuestionTable from './asssessment-question-table';

import CandidateProfileDetails from './components/candidate-profile-details.component';
import { useSubmitTestReviewMutation } from 'store/slices/test-review.slice';

interface DetailedCandidateTestResultpageProps {
  className?: string;
  hideBackButton?: boolean;
  mode?: 'review' | 'view';
}

export default function DetailedCandidateTestResultPage({ className, mode }: DetailedCandidateTestResultpageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionInfo, setQuestionInfo] = useState({ sectionId: '', questionId: '' });
  const navigate = useNavigate();
  const [submitTestReview, { isLoading: isSubmitting }] = useSubmitTestReviewMutation();

  const { id: resultId } = useParams<{ id: string }>();

  const { data: detailedResultDataFromApi, isLoading: detailedLoading } = useGetDetailedResultQuery({ resultId });

  const finalResultData = detailedResultDataFromApi;

  console.log('API response : ', finalResultData);

  const sessionId = finalResultData?.session?.id;

  const handleReviewQuestion = ({ questionId, sectionId }: { questionId: string; sectionId: string }) => {
    setQuestionInfo({ questionId, sectionId });
    setIsModalOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!resultId) return;

    try {
      const payload = {
        sessionId: sessionId as string,
      };

      await submitTestReview({ body: payload }).unwrap();

      // Show success feedback or navigate
      navigate(-1); // or to a success page
    } catch (error) {
      console.error('Submission failed:', error);
      // Optionally display error message
    }
  };

  if (detailedLoading) {
    return <VLoader position="global" />;
  }

  return (
    <div className={className}>
      <CandidateProfileDetails
        testResults={finalResultData}
        onDownload={() => generateResultPDF(finalResultData!)}
        statusElement={
          finalResultData ? (
            <VStatus
              className="w-7 h-7 px-3"
              label={finalResultData.isPassed ? 'Pass' : 'Fail'}
              type={finalResultData.isPassed ? 'positive' : 'negative'}
            />
          ) : null
        }
      />

      <div className="border border-theme-default my-5" />

      {/* Section Wise Performance */}
      <VOverview title="Section-wise performance" titleClassName="text-sm">
        <div className="px-5 flex flex-col gap-5 pb-5">
          {finalResultData?.sections?.map((section) => (
            <VProgressBar
              key={section?.id}
              label={section?.title}
              completed={section?.maxScore ?? 0}
              outOf={section?.totalQuestions ?? 0}
            />
          ))}
        </div>
      </VOverview>

      <div className="border border-theme-default my-5" />

      {/* Question Table + Modal */}
      <div className="mt-6">
        {finalResultData && (
          <>
            <AssessmentQuestionTable detailedResultData={finalResultData} onReviewQuestion={handleReviewQuestion} />
            <DynamicQuestionModal
              mode={mode}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              sectionId={questionInfo.sectionId}
              questionId={questionInfo.questionId}
              detailedResultData={finalResultData}
            />
          </>
        )}
      </div>
      {mode === 'review' && (
        <div className="flex flex-row gap-4 my-4">
          <VButton variant="secondary" className="!w-28" onClick={() => navigate(-1)}>
            Cancel
          </VButton>
          <VButton variant="primary" className="!w-40" isLoading={isSubmitting} onClick={handleSubmitReview}>
            Submit
          </VButton>
        </div>
      )}
    </div>
  );
}
