import { TestWorkflowState } from 'test-runner/types';
import { TestRunnerState } from './test-runner.store';
import { createSelector } from '@reduxjs/toolkit';
import { selectCurrentSectionId } from './session/navigation/navigation.selector';

const selectSession = (state: TestRunnerState) => state.session;
const selectNavigation = (state: TestRunnerState) => state.navigation;
const selectAnswers = (state: TestRunnerState) => state.answers;
const selectTimers = (state: TestRunnerState) => state.timers;
const selectSecurity = (state: TestRunnerState) => state.security;

export const selectSyncData = createSelector(
  [selectSession, selectNavigation, selectAnswers, selectTimers, selectSecurity],
  (session, navigation, answers, timers, security) => ({
    sequenceNumber: session.sequenceNumber,
    activityStatus: session.activityStatus,
    clientTimestamp: session.clientTimestamp,
    stateSnapshot: {
      navigation,
      answers,
      timers,
    },
    securityEvents: security,
  })
);

// selectors.ts
export const selectWorkflowState = (state: TestRunnerState): TestWorkflowState => {
  const { participant } = state;

  if (!participant) {
    console.warn('Participant state not initialized');
    return TestWorkflowState.INITIAL;
  }

  const { token, registrationRequired, testDetails, session, result, error } = participant;

  // If auth error detected (invalid token)
  if (error) {
    return TestWorkflowState.AUTH_ERROR;
  }

  // No participant token yet, probably initial or fetching token
  if (!token) {
    // You can refine here if you have a loading flag for participant token fetch
    return TestWorkflowState.PARTICIPANT_TOKEN_FETCHING;
  }

  // If registration is required before token acquisition
  if (registrationRequired) {
    return TestWorkflowState.REGISTRATION_REQUIRED;
  }

  // Participant token acquired, create test session next
  if (token && !session) {
    return TestWorkflowState.PARTICIPANT_TOKEN_ACQUIRED;
  }

  // Session created but no testDetails yet (fetching test config)
  if (session && !testDetails) {
    return TestWorkflowState.SESSION_CREATED;
  }

  // Test details loaded → show test overview/landing page
  if (testDetails && session?.status === 'NotStarted') {
    return TestWorkflowState.TEST_OVERVIEW;
  }

  // Test started
  if (session?.status === 'Started') {
    return TestWorkflowState.TEST_OVERVIEW;
  }

  // Test submitted but not completed yet
  if (session?.status === 'Submitted') {
    // Assuming you set some flag for feedbackRequired
    // If no feedback, then either show result or sign off
    if (result) {
      return TestWorkflowState.RESULTS_AVAILABLE;
    } else {
      return TestWorkflowState.SIGN_OFF;
    }
  }

  // Fallback
  return TestWorkflowState.INITIAL;
};

// select test details
export const selectTestDetails = (state: TestRunnerState) => state.participant.testDetails;

export const selectTestProgress = createSelector(
  [selectAnswers, selectTestDetails],
  (answers, testDetails) => {
    const sections = testDetails?.sections ?? [];

    let totalQuestions = 0;
    let totalTime = 0;
    let answeredCount = 0;

    for (const section of sections) {
      const questions = section.questions ?? [];
      totalQuestions += questions.length;
      totalTime += questions.reduce((sum, q) => sum + q.timeLimit, 0);
      answeredCount += questions.filter((q) => answers[q.id] !== undefined).length;
    }

    const progressPercentage =
      totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      totalTime,
      answeredCount,
      progressPercentage,
    };
  }
);

//section selectors
export const selectSections = createSelector(selectTestDetails, (test) => test?.sections);

export const selectCurrentSection = createSelector([selectSections, selectCurrentSectionId], (sections, sectionId) =>
  sections?.find((sec) => sec.id === sectionId)
);

export const selectSectionProgress = createSelector(
  [selectCurrentSectionId, selectAnswers, selectTestDetails],
  (sectionId, answers, testDetails) => {
    const section = testDetails?.sections?.find((s) => s.id === sectionId);
    if (!section) return null;

    const totalQuestions = section.questions?.length || 0;
    const totalTime = section.questions.reduce((a, x) => a + x.timeLimit, 0);
    const answeredCount = section.questions?.filter((q) => answers[q.id] !== undefined).length || 0;

    return {
      totalQuestions,
      totalTime,
      answeredCount,
      progressPercentage: Math.round((answeredCount / totalQuestions) * 100),
    };
  }
);

export const selectCurrentQuestion = createSelector(
  [selectCurrentSectionId, selectTestDetails, (state: TestRunnerState) => state.navigation],
  (sectionId, testDetails, navigation) => {
    // Get current position first (most authoritative)
    const currentPos = navigation.currentPosition;

    // Fallback to last history event if current position is empty
    const effectiveQuestionId =
      currentPos.questionId ||
      [...navigation.history].reverse().find((event) => event.sectionId === sectionId)?.questionId;

    if (!sectionId || !effectiveQuestionId || !testDetails?.sections) {
      return null;
    }

    // Find the question in the current section
    const section = testDetails.sections.find((s) => s.id === sectionId);
    return section?.questions?.find((q) => q.id === effectiveQuestionId);
  }
);

export const selectSectionTimeSpent = createSelector(
  [selectCurrentSectionId, (state: TestRunnerState) => state.navigation.history],
  (sectionId, history) => {
    if (!sectionId) return 0;

    // Filter events for this section
    const sectionEvents = history.filter((event) => event.sectionId === sectionId);

    // Calculate time based on event timestamps
    if (sectionEvents.length < 2) return 0;

    let totalTime = 0;
    for (let i = 1; i < sectionEvents.length; i++) {
      const diff = new Date(sectionEvents[i].timestamp).getTime() - new Date(sectionEvents[i - 1].timestamp).getTime();
      totalTime += Math.floor(diff / 1000); // Convert ms to seconds
    }

    return totalTime;
  }
);

export const selectSectionPaginationState = createSelector(
  [selectCurrentSection, (state: TestRunnerState) => state.navigation],
  (section, navigation) => {
    const defaultState = {
      currentPage: 1,
      totalPages: 0,
      pages: [] as Array<{ number: number; id: string }>,
    };

    if (!section || !section.questions?.length) {
      return defaultState;
    }

    // Create pages array: map each question to a page with number and ID
    const pages = section.questions.map((question, index) => ({
      number: index + 1,
      id: question.id,
    }));

    // Find current page based on currentQuestionId
    const currentIndex = navigation.currentPosition?.questionId
      ? section.questions.findIndex((q) => q.id === navigation.currentPosition.questionId)
      : -1;

    const currentPage = currentIndex >= 0 ? currentIndex + 1 : 1;

    return {
      currentPage,
      totalPages: section.questions.length,
      pages,
    };
  }
);

// In your selectors file
export const selectSafeCurrentQuestion = createSelector(
  [selectCurrentSection, selectNavigation],
  (section, navigation) => {
    if (!section || !navigation?.currentPosition) return null;

    // Return current question if valid
    if (section.questions.some((q) => q.id === navigation.currentPosition.questionId)) {
      return navigation.currentPosition.questionId;
    }

    // Fallback to first question
    return section.questions[0]?.id || null;
  }
);

export const selectTestDetailsLoading = (state: TestRunnerState) => state.participant.loading;
export const selectTestDetailsError = (state: TestRunnerState) => state.participant.error;
