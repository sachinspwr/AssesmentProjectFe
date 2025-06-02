import { createSelector } from '@reduxjs/toolkit';
import { TestRunnerState } from 'test-runner/store/test-runner.store';

export const selectNavigationHistory = (state: TestRunnerState) => state.navigation.history;

export const selectCurrentPosition = (state: TestRunnerState) => state.navigation.currentPosition;

export const selectNavigationType = (state: TestRunnerState) => state.navigation.navigationType;

export const selectCurrentSectionId = (state: TestRunnerState) => state.navigation.currentPosition.sectionId;

export const selectCurrentQuestionId = (state: TestRunnerState) => state.navigation.currentPosition.questionId;

export const selectCurrentConfidence = (state: TestRunnerState) => state.navigation.currentPosition.confidence;

// Add to your navigation selectors file
export const selectLastQuestionForSection = createSelector(
  [(state: TestRunnerState) => state.navigation.history, (_, sectionId: string) => sectionId],
  (history, sectionId) => {
    const sectionEvents = history.filter(event => event.sectionId === sectionId);
    return sectionEvents[sectionEvents.length - 1]?.questionId || null;
  }
);

export const selectHasVisitedSection = createSelector(
  [(state: TestRunnerState) => state.navigation.history, (_, sectionId: string) => sectionId],
  (history, sectionId) => history.some(event => event.sectionId === sectionId)
);
