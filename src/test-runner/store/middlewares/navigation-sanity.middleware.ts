import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import {
  selectCurrentSectionId,
  selectCurrentQuestionId,
  selectNavigationHistory,
} from '../session/navigation/navigation.selector';
import { navigateToQuestion } from '../session';

// List of actions that might affect navigation state
const NAVIGATION_RELATED_ACTIONS = new Set([
  'navigation/navigateToQuestion',
  'navigation/rehydrateNavigation',
  'session/initializeTestFlow',
  // Add other relevant navigation action types here
]);

export const navigationSanityMiddleware: Middleware = 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (store: MiddlewareAPI) => (next) => (action: any) => {
    const result = next(action);

    if (!NAVIGATION_RELATED_ACTIONS.has(action.type)) {
      return result;
    }

    try {
      const state = store.getState();

      // Get current section and question from navigation state
      const currentSectionId = selectCurrentSectionId(state);
      const currentQuestionId = selectCurrentQuestionId(state);
      const navigationHistory = selectNavigationHistory(state);

      if (!currentSectionId) {
        // No current section selected, nothing to fix
        return result;
      }

      // Get all questionIds visited in the current section (from navigation history)
      const questionsInSection = navigationHistory
        .filter(event => event.sectionId === currentSectionId)
        .map(event => event.questionId)
        .filter(Boolean); // remove any falsy values

      // If no questions recorded for this section in history, do nothing
      if (questionsInSection.length === 0) {
        return result;
      }

      // Check if current questionId is valid (exists in questionsInSection)
      const isValidQuestion = currentQuestionId && questionsInSection.includes(currentQuestionId);

      if (!isValidQuestion) {
        const firstValidQuestionId = questionsInSection[0];
        if (!firstValidQuestionId) {
          console.warn(`No valid questions found in navigation history for section ${currentSectionId}`);
          return result;
        }

        // Prevent infinite loop: don't dispatch if action is already navigating to that question
        if (
          action.type !== 'navigation/navigateToQuestion' ||
          action.payload.questionId !== firstValidQuestionId
        ) {
          store.dispatch(
            navigateToQuestion({
              sectionId: currentSectionId,
              questionId: firstValidQuestionId,
              eventType: 'auto',
            })
          );
        }
      }
    } catch (error) {
      console.error('Navigation sanity middleware error:', error);
      // Fail gracefully without breaking the app
    }

    return result;
  };