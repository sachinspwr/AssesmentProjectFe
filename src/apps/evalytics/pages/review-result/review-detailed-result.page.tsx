import { VStatus } from '@components/atoms';
import { VProgressBar } from '@components/molecules/progress-bar/v-progress-bar.mol';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { TestResponseDTO, TestResultResponseDTO } from '@dto/response';
import { DifficultyLevel, QuestionType, TestQuestionFormat, TestStatus } from '@utils/enums';
import { useState } from 'react';
import AssessmentQuestionTable from 'test-result/asssessment-question-table';
import CandidateProfileDetails from 'test-result/components/candidate-profile-details.component';
import DynamicQuestionModal from 'test-result/dynamic-question-modal';
import ReviewResultRating from '../../components/review-result-rating.component';

function ReviewDetailedResultpage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionInfo, setQuestionInfo] = useState({ sectionId: '', questionId: '' });

  
  const handleReviewQuestion = ({ questionId, sectionId }: { questionId: string; sectionId: string }) => {
    setQuestionInfo({ questionId, sectionId });
    setIsModalOpen(true);
  };

  return (
    <>
      <CandidateProfileDetails
        testResults={reviewDetailedResultData}
        showBackButton={true}
        statusElement={
          <VStatus
            className="w-[217px] h-[32px] px-4 py-2 whitespace-nowrap"
            label="3 questions pending"
            type="warning"
          />
        }
      />

      <div className="border border-theme-default my-5" />

      {/* Section Wise Performance */}
      <VOverview title="Section-wise performance" titleClassName="text-sm">
        <div className="px-5 flex flex-col gap-5 pb-5">
          {reviewDetailedResultData?.test?.testSections?.map((section) => (
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
        {reviewDetailedResultData && (
          <>
            <AssessmentQuestionTable
              detailedResultData={reviewDetailedResultData}
              onReviewQuestion={handleReviewQuestion}
            />
            <DynamicQuestionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              sectionId={questionInfo.sectionId}
              questionId={questionInfo.questionId}
              detailedResultData={reviewDetailedResultData}
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4"></div>

      <ReviewResultRating />
    </>
  );
}

export default ReviewDetailedResultpage;
