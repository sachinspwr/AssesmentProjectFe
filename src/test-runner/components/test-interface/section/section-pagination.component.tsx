import { selectSectionPaginationState, useTestRunnerDispatch, useTestRunnerSelector } from 'test-runner/store';
import VPagination from '@components/organisms/pagination/v-pagination.organism';
import { navigateToQuestion } from 'test-runner/store/session';
import {  selectCurrentSectionId } from 'test-runner/store/session/navigation/navigation.selector';

export function TestSectionPagination() {
  const dispatch = useTestRunnerDispatch();
  const { currentPage, totalPages, pages } = useTestRunnerSelector(selectSectionPaginationState);
  const sectionId = useTestRunnerSelector(selectCurrentSectionId);
  
  // navigate to index matching question
  const onChange = (currentPage: number) => {
    const targetQuestion = pages.find((x) => x.number === currentPage)?.id;

    if(!targetQuestion){
      throw new Error('No question found for page');
    }

    dispatch(
      navigateToQuestion({
        sectionId,
        questionId: targetQuestion,
        eventType: 'manual',
      })
    );
  };

  if (totalPages <= 0) return null;

  return (
    <VPagination
      totalPages={totalPages}
      onPageChange={onChange}
      currentPage={currentPage}
      maxVisiblePages={5}
      containerClassName="sm:!mt-0"
    />
  );
}
