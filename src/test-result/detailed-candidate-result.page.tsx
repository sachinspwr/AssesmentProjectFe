import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { VStatus } from '@components/atoms';
import { VLoader } from '@components/molecules';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { useGetDetailedResultQuery } from 'store/slices/test-result.slice';

import { generateResultPDF } from './generateResultPDF';
import DynamicQuestionModal from './dynamic-question-modal';
import AssessmentQuestionTable from './asssessment-question-table';

import CandidateProfileDetails from './components/candidate-profile-details.component';

interface DetailedCandidateTestResultpageProps {
  className?: string;
  hideBackButton?: boolean;
}

export default function DetailedCandidateTestResultPage({ className }: DetailedCandidateTestResultpageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionInfo, setQuestionInfo] = useState({ sectionId: '', questionId: '' });

  const location = useLocation();
  const useDummyData = location.state?.useDummyData ?? false;

  const { id: resultId } = useParams<{ id: string }>();

  const { data: detailedResultDataFromApi, isLoading: detailedLoading } = useGetDetailedResultQuery({ resultId });

  const finalResultData = detailedResultDataFromApi;

  const handleReviewQuestion = ({ questionId, sectionId }: { questionId: string; sectionId: string }) => {
    setQuestionInfo({ questionId, sectionId });
    setIsModalOpen(true);
  };

  if (detailedLoading && !useDummyData) {
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
              outOf={section?.cutoffScore ?? 0}
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
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              sectionId={questionInfo.sectionId}
              questionId={questionInfo.questionId}
              detailedResultData={finalResultData}
            />
          </>
        )}
      </div>
    </div>
  );
}
