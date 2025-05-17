import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VPagination from '@components/organisms/pagination/v-pagination.organism';
import { TestSectionResponseDTO } from '@dto/response/test-section-response.dto';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/store';
import { QuestionTypeRenderer } from './question-type-renderer.component';
import InterviewGuidelines from './interview-guidelines.component';
import TestNavigationButtons from './test-navigation-buttons.component';
import { useSelector } from 'react-redux';
import { setCurrentQuestionIndexForSection, setSelectedSection } from 'store/slices/test-runner.slice';
import { useDispatch } from 'react-redux';

interface SectionDetailsProps {
  sectionId?: string;
}
const TestSectionSummary = ({ sectionId }: SectionDetailsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const currentIndex = useAppSelector(
    (state) => state.testRunner.sections.find((s) => s.sectionId === sectionId)?.currentQuestionIndex ?? 0
  );
  useEffect(() => {
    dispatch(setSelectedSection(sectionId as string));
  }, [sectionId]);

  useEffect(() => {
    setCurrentPage(currentIndex + 1); // Pages are 1-based
  }, [sectionId, currentIndex]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [currentPage]);

  const sectionDetails = useAppSelector((state) =>
    state.testRunner.testDetails?.testSections?.find((section) => section.id === sectionId)
  );

  const questionDetails = sectionDetails?.questions ?? [];
  const currentQuestion = questionDetails[currentPage - 1];

  const handlePageChange = (page: number) => {
    if (sectionId) {
      dispatch(setCurrentQuestionIndexForSection({ sectionId, index: page - 1 }));
    }
    setCurrentPage(page);
  };
  return (
    <>
      <div>
        <VTypography as="h4" className="font-bold">
          {sectionDetails?.name}
        </VTypography>
        <VTypography as="small" color="muted" className="mt-3">
          {sectionDetails?.description}
        </VTypography>
        <div className="mt-5 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <div>
              <VTypography as="small" color="muted">
                Total Question:
                <VTypography as="small" className="font-semibold">
                  {sectionDetails?.questions?.length}
                </VTypography>
              </VTypography>
            </div>
            <div>
              <VTypography as="small" color="muted">
                Time:
                <VTypography as="small" className="font-semibold">
                  {sectionDetails?.cutoffScore}
                </VTypography>
              </VTypography>
            </div>
          </div>
          <div>
            <VPagination
              totalPages={questionDetails.length}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              maxVisiblePages={5}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        {questionDetails.length > 0 && currentQuestion && (
          <div key={currentQuestion.id}>
            <QuestionTypeRenderer question={currentQuestion} index={currentPage} />
            <InterviewGuidelines />
            <TestNavigationButtons key={currentQuestion.id} totalQuestions={questionDetails.length} />
          </div>
        )}
      </div>
    </>
  );
};

export default TestSectionSummary;
