import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {  VStatus } from '@components/atoms';
import {  VLoader } from '@components/molecules';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { useFetchBriefResultQuery, useGetDetailedResultQuery } from 'store/slices/test-result.slice';

import { generateResultPDF } from './generateResultPDF';
import DynamicQuestionModal from './dynamic-question-modal';
import AssessmentQuestionTable from './asssessment-question-table';

import CandidateProfileDetails from './components/candidate-profile-details.component';

interface DetailedCandidateTestResultpageProps {
  className?: string;
  hideBackButton?: boolean;
}

export default function DetailedCandidateTestResultPage({
  className,
}: DetailedCandidateTestResultpageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionInfo, setQuestionInfo] = useState({ sectionId: '', questionId: '' });

  const { testId, participantId } = useParams<{ testId: string; participantId: string }>();
  const location = useLocation();
  const useDummyData = location.state?.useDummyData ?? false;

  const { data: briefResultData, isLoading } = useFetchBriefResultQuery({
    testId: testId!,
    participantId: participantId!,
  });

  const resultId = briefResultData?.data?.[0]?.id ?? '';

  const { data: detailedResultDataFromApi, isLoading: detailedLoading } = useGetDetailedResultQuery(
    { testId: testId!, resultId },
    { skip: !resultId }
  );

  
  const finalResultData = detailedResultDataFromApi;

  console.log("Data from Api : ", finalResultData);
  
  const handleReviewQuestion = ({ questionId, sectionId }: { questionId: string; sectionId: string }) => {
    setQuestionInfo({ questionId, sectionId });
    setIsModalOpen(true);
  };


  if (isLoading || (detailedLoading && !useDummyData)) {
    return <VLoader position="global" />;
  }

  return (
    <div className={className}>
      
      <CandidateProfileDetails
        user={finalResultData?.user}
        test={finalResultData?.test}
        testResults={finalResultData?.testResults[0]}
        onDownload={() => generateResultPDF(finalResultData!)}
        statusElement={
          <VStatus
            className="w-7 h-7 px-3"
            label={finalResultData?.testResults[0].isPassed ? "Pass" : "Fail"}
            type={finalResultData?.testResults[0].isPassed ? "positive" : "negative"}
          />
        }
      />

      <div className="border border-theme-default my-5" />

      {/* Section Wise Performance */}
      <VOverview title="Section-wise performance" titleClassName="text-sm">
        <div className="px-5 flex flex-col gap-5 pb-5">
          {finalResultData?.test?.testSections?.map((section) => (
            <VProgressBar
              key={section?.id}
              label={section?.name}
              completed={section?.score ?? 0}
              outOf={section?.outOf ?? 0}
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
