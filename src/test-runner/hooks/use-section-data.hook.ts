// section-hooks.ts
import React from 'react';
import { useEffect, useMemo, useCallback } from 'react';
import { 
  setCurrentQuestionIndexForSection,
  setSelectedSection
} from 'store/slices/test-runner.slice';
import { 
  useTestRunnerDispatch,
  useTestRunnerSelector,
  selectSyncData,
  selectTestDetails,
} from 'test-runner/store';
import { selectCurrentQuestionForSection } from 'test-runner/store/session/navigation/navigation.selector';

export const useSectionNavigation = (currentPage: number) => {
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  return { scrollToTop: () => window.scrollTo(0, 0) };
};

export const useSectionData = (sectionId?: string) => {
  const dispatch = useTestRunnerDispatch();
  const syncData = useTestRunnerSelector(selectSyncData);
  const testDetails = useTestRunnerSelector(selectTestDetails);
  const currentIndex = useTestRunnerSelector((state) => 
    selectCurrentQuestionForSection(state, sectionId)
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const sectionDetails = useMemo(
    () => testDetails?.sections?.find((section) => section.id === sectionId),
    [testDetails?.sections, sectionId]
  );

  const questionDetails = sectionDetails?.questions ?? [];
  const { answers = {} as any, timers = {} as any } = syncData?.stateSnapshot ?? {};

  const currentQuestion = useMemo(() => {
    if (!questionDetails.length || currentPage < 1 || currentPage > questionDetails.length) {
      return null;
    }
    return questionDetails[currentPage - 1];
  }, [questionDetails, currentPage]);

  const answeredCount = useMemo(
    () => questionDetails.filter((q) => answers[q.id]).length,
    [questionDetails, answers]
  );

  const sectionTimeSpent = useMemo(
    () => timers.sectionTimeSpent?.[sectionId ?? ''] ?? 0,
    [timers.sectionTimeSpent, sectionId]
  );

  useEffect(() => {
    if (sectionId) {
      dispatch(setSelectedSection(sectionId));
    }
  }, [sectionId, dispatch]);

  useEffect(() => {
    const safePage = Math.max(1, Math.min(currentIndex + 1, questionDetails.length));
    setCurrentPage(safePage);
  }, [currentIndex, questionDetails.length]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (!sectionId) return;

      const safePage = Math.max(1, Math.min(page, questionDetails.length));
      
      dispatch(
        setCurrentQuestionIndexForSection({
          sectionId,
          index: safePage - 1,
        })
      );
      setCurrentPage(safePage);
    },
    [dispatch, questionDetails.length, sectionId]
  );

  return {
    sectionDetails,
    questionDetails,
    currentQuestion,
    currentPage,
    answeredCount,
    sectionTimeSpent,
    syncData,
    handlePageChange
  };
};