import {  VFormFieldData } from '@types';
import { useEffect } from 'react';
import {
  fetchParticipantToken,
  registerParticipant,
  initializeTestSession,
  fetchTestDetails,
  syncTestState,
  saveAnswer,
  submitTestSession,
  resumeTestSession,
} from 'test-runner/middleware/workflow.middleware';
import { useTestRunnerDispatch, useTestRunnerSelector } from 'test-runner/store';
import {
  navigateToQuestion,
  incrementSequence,
  recordTabSwitch,
  recordFullscreenExit,
  recordFaceDetection,
  incrementTime,
} from 'test-runner/store/session';

import { RegistrationField, TestDetails, TestSession, TestResult } from 'test-runner/types';

interface UseTestWorkflowReturn {
  token: string | null;
  registrationRequired: boolean;
  registrationFields: RegistrationField[];
  testDetails: TestDetails | null;
  session: TestSession | null;
  result: TestResult | null;
  loading: boolean;
  error: string | null;
  isSubmitting: boolean;
  currentPosition: {
    sectionId: string;
    questionId: string;
  };
  answers: Record<string, string>;
  security: {
    fullscreenExits: number;
    tabSwitches: number;
    faceDetection: {
      attempts: number;
      verified: boolean;
    };
  };
  timers: {
    sectionTimeSpent: Record<string, number>;
    totalElapsed: number;
  };
  lastSync: number | null;

  startTestFlow: (token: string, testId?: string) => void;
  registerParticipant: (registrationData: VFormFieldData) => void;
  navigateQuestion: (sectionId: string, questionId: string) => void;
  submitAnswer: (sectionId: string, questionId: string, answer: string) => void;
  submitTest: () => void;
  resumeTestSession: (sessionToken: string) => void;
  handleTabSwitch: () => void;
  handleFullscreenExit: () => void;
  handleFaceDetection: (verified: boolean) => void;
  incrementTime: (sectionId: string, elapsedSeconds: number) => void;
}

export const useTestWorkflow = (): UseTestWorkflowReturn => {
  const dispatch = useTestRunnerDispatch();
  const participantState = useTestRunnerSelector((state) => state.participant);
  const {
    token,
    linkToken,
    registrationRequired,
    registrationFields,
    testDetails,
    session,
    result,
    loading,
    error,
    isSubmitting,
    lastSync,
  } = participantState;

  const { currentPosition } = useTestRunnerSelector((state) => state.navigation);
  const answers = useTestRunnerSelector((state) => state.answers);
  const security = useTestRunnerSelector((state) => state.security);
  const timers = useTestRunnerSelector((state) => state.timers);

  // Initialize test flow
  const startTestFlow = (token: string, testId?: string) => {
    dispatch(fetchParticipantToken(token, testId));
  };

  // Handle registration
  const registerParticipantAction = (registrationData: VFormFieldData)=> {
    if (!linkToken) return;
    return dispatch(registerParticipant(linkToken, registrationData));
  };

  // Initialize test session after token validation/registration
  useEffect(() => {
    if (token && !registrationRequired && !session) {
      dispatch(initializeTestSession(token));
    }
  }, [token, registrationRequired, session, dispatch]);

  // Fetch test details after session initialization
  useEffect(() => { 
    if (session?.token && !testDetails) {
      dispatch(fetchTestDetails(session.token));
    }
  }, [session, testDetails, dispatch]);

  // Auto-sync state every 30 seconds
  useEffect(() => {
    if (!session?.token) return;

    const syncInterval = setInterval(() => {
      dispatch(syncTestState(session.token));
    }, 30000);

    return () => clearInterval(syncInterval);
  }, [session?.token, dispatch]);

  // Handle answer submission
  const submitAnswerAction = (sectionId: string, questionId: string, answer: string) => {
    if (!session?.token) return;
    dispatch(saveAnswer(session.token, sectionId, questionId, answer));
  };

  // Handle test submission
  const submitTestAction = () => {
    if (!session?.token) return;
    dispatch(submitTestSession(session.token));
  };

  // Resume test session
  const resumeTestSessionAction = (sessionToken: string) => {
    dispatch(resumeTestSession(sessionToken));
  };

  return {
    token,
    registrationRequired,
    registrationFields,
    testDetails,
    session,
    result,
    loading,
    error,
    isSubmitting,
    currentPosition,
    answers,
    security,
    timers,
    lastSync,
    startTestFlow,
    registerParticipant: registerParticipantAction,
    navigateQuestion: (sectionId: string, questionId: string) => {
      dispatch(navigateToQuestion({ sectionId, questionId, eventType: 'manual' }));
      dispatch(incrementSequence());
    },
    submitAnswer: submitAnswerAction,
    submitTest: submitTestAction,
    resumeTestSession: resumeTestSessionAction,
    handleTabSwitch: () => dispatch(recordTabSwitch()),
    handleFullscreenExit: () => dispatch(recordFullscreenExit()),
    handleFaceDetection: (verified: boolean) => dispatch(recordFaceDetection({ verified })),
    incrementTime: (sectionId: string, elapsedSeconds: number) =>
      dispatch(incrementTime({ sectionId, elapsedSeconds })),
  };
};
