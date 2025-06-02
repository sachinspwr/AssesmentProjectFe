import React, { useRef, useCallback,  useEffect } from 'react';
import { VTabs, VTabsRef } from '@components/organisms';
import { useDispatch } from 'react-redux';
import { selectTestDetails, useTestRunnerSelector } from 'test-runner/store';
import { incrementTime, navigateToQuestion } from 'test-runner/store/session';
import TestSection from 'test-runner/components/test-interface/section/test-section.component';
import {
  selectCurrentPosition,
  selectLastQuestionForSection,
} from 'test-runner/store/session/navigation/navigation.selector';

function TestInterfacePage() {
  const testDetails = useTestRunnerSelector(selectTestDetails);
  const dispatch = useDispatch();
  const vTabsRef = useRef<VTabsRef>(null);
  const { sections = [] } = testDetails ?? {};
  const currentPosition = useTestRunnerSelector(selectCurrentPosition);
  
  // Timer implementation with useRef for stable references
  const activeSectionIdRef = useRef<string | null>(null);
  const sectionEntryTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize this selector to prevent unnecessary recalculations
  const lastQuestionsBySection = useTestRunnerSelector((state) =>
    sections.reduce(
      (acc, section) => {
        acc[section.id] = selectLastQuestionForSection(state, section.id);
        return acc;
      },
      {} as Record<string, string | undefined>
    ),
  );

  // Initialize timing on first mount
  useEffect(() => {
    if (sections.length > 0 && !activeSectionIdRef.current) {
      const initialSectionId = sections[0].id;
      activeSectionIdRef.current = initialSectionId;
      sectionEntryTimeRef.current = Date.now();
      startTimer();
    }

    return () => {
      stopTimer();
    };
  }, [sections]);

  const startTimer = () => {
    stopTimer(); // Clear any existing timer
    timerRef.current = setInterval(() => {
      if (activeSectionIdRef.current) {
        const elapsedSeconds = Math.floor((Date.now() - sectionEntryTimeRef.current) / 1000);
        if (elapsedSeconds > 0) {
          dispatch(incrementTime({ 
            sectionId: activeSectionIdRef.current, 
            elapsedSeconds: 1 // Increment by 1 second
          }));
          sectionEntryTimeRef.current = Date.now(); // Reset the timer
        }
      }
    }, 1000); // Update every second
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTabChange = useCallback(
    (_: number, __?: string, nextSectionId?: string) => {
      if (!nextSectionId) return;

      // Save time for previous section
      if (activeSectionIdRef.current) {
        const elapsedSeconds = Math.floor((Date.now() - sectionEntryTimeRef.current) / 1000);
        if (elapsedSeconds > 0) {
          dispatch(incrementTime({ 
            sectionId: activeSectionIdRef.current, 
            elapsedSeconds 
          }));
        }
      }

      // Update to new section
      activeSectionIdRef.current = nextSectionId;
      sectionEntryTimeRef.current = Date.now();

      // Navigate to question logic
      const selectedSection = sections.find((s) => s.id === nextSectionId);
      if (!selectedSection) return;

      const lastQuestionId = lastQuestionsBySection[nextSectionId];
      const targetQuestionId = lastQuestionId || selectedSection.questions?.[0]?.id;

      if (currentPosition?.sectionId === nextSectionId && currentPosition?.questionId === targetQuestionId) {
        return;
      }

      if (targetQuestionId) {
        dispatch(
          navigateToQuestion({
            sectionId: nextSectionId,
            questionId: targetQuestionId,
            eventType: 'manual',
          })
        );
      }
    },
    [sections, dispatch, lastQuestionsBySection, currentPosition]
  );

  // Ensure time is saved if user leaves
  useEffect(() => {
    const handleUnload = () => {
      if (activeSectionIdRef.current) {
        const elapsedSeconds = Math.floor((Date.now() - sectionEntryTimeRef.current) / 1000);
        if (elapsedSeconds > 0) {
          dispatch(incrementTime({ 
            sectionId: activeSectionIdRef.current, 
            elapsedSeconds 
          }));
        }
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [dispatch]);

  // Memoize tabs to prevent unnecessary recreations
  const tabs = React.useMemo(() => 
    sections.map(({ id, name }) => ({
      id,
      name: id,
      label: name,
      content: <TestSection key={id} />,
    })),
    [sections]
  );

  return (
    <div className="">
      <VTabs
        ref={vTabsRef}
        tabs={tabs}
        onTabChange={handleTabChange}
        fixedHeader
        stickyOffset={105}
        classNames={{
          header: '!border-transperant',
          activeTab: 'text-blue-600 border-blue-500',
        }}
      />
    </div>
  );
}

export default TestInterfacePage;
