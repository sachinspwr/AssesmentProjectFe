import { testSessionApi } from '../store/session/session-api.slice';
import * as participantSlice from 'test-runner/store/participant/participant.slice';
import { incrementSequence, setActivityStatus, setAnswer } from 'test-runner/store/session';
import { selectSyncData } from 'test-runner/store/selector';
import { RegistrationField, TestSession } from 'test-runner/types';
import { TestRunnerApiError } from 'test-runner/core';
import { participantApi } from 'test-runner/store/participant';
import { VFormFieldData } from '@types';
import { AppThunk } from 'test-runner/store';

type ApiErrorPayload = {
  error: string;
  statusCode?: number;
  registrationRequired?: boolean;
  fields?: RegistrationField[];
};

const handleApiError = (
  dispatch: (action: unknown) => void,
  failureAction: (payload: ApiErrorPayload) => unknown,
  error: unknown,
  defaultMessage: string
) => {
  let payload: ApiErrorPayload = {
    error: defaultMessage,
  };

  if (error instanceof TestRunnerApiError) {
    payload = {
      error: typeof error.data === 'string' ? error.data : defaultMessage,
      statusCode: error.meta?.status,
      ...(error.meta?.status === 428 && {
        registrationRequired: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fields: (error.data as any)?.errors?.fields ?? [],
      }),
    };
  } else if (typeof error === 'object' && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as { data?: any; status?: number };
    payload = {
      error: err.data?.message || defaultMessage,
      statusCode: err.status,
      ...(err.status === 428 && {
        registrationRequired: true,
        fields: err.data?.errors?.fields ?? [],
      }),
    };
  }

  dispatch(failureAction(payload));
};

// Thunk actions
export const fetchParticipantToken =
  (token: string, testId?: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await dispatch(
        participantApi.endpoints.fetchParticipantToken.initiate({ token, testId })
      ).unwrap();
      dispatch(participantSlice.fetchTokenSuccess(result));
    } catch (error) {
      handleApiError(
        dispatch,
        participantSlice.fetchTokenFailure,
        error,
        "We couldn't verify your access. Please check your link or try again."
      );
    }
  };

export const registerParticipant =
  (token: string, registrationData: VFormFieldData): AppThunk<Promise<TestSession>> =>
  async (dispatch) => {
    try {
      const result = await dispatch(
        participantApi.endpoints.registerParticipant.initiate({ token, registrationData })
      ).unwrap();

      dispatch(participantSlice.registerParticipantSuccess(result));
      return result; // Return the session data
    } catch (error) {
      handleApiError(dispatch, participantSlice.registerParticipantFailure, error, 'Registration failed');
      throw error; // Re-throw to handle in component
    }
  };

export const initializeTestSession =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await dispatch(testSessionApi.endpoints.initializeTestSession.initiate({ token })).unwrap();
      dispatch(participantSlice.initializeTestSessionSuccess(result));
    } catch (error) {
      console.log(error);
      handleApiError(dispatch, participantSlice.initializeTestSessionFailure, error, 'Session initialization failed');
    }
  };

export const fetchTestDetails =
  (sessionToken: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await dispatch(testSessionApi.endpoints.fetchTestDetails.initiate(sessionToken)).unwrap();
      dispatch(participantSlice.fetchTestDetailsSuccess(result));
    } catch (error) {
      handleApiError(dispatch, participantSlice.fetchTestDetailsFailure, error, 'Failed to fetch test details');
    }
  };

export const saveAnswer =
  (sessionToken: string, sectionId: string, questionId: string, answer: string): AppThunk =>
  async (dispatch, getState) => {
    const {
      security: securityEvents,
      timers: { sectionTimeSpent },
    } = getState();

    try {
      // 1. Update answer value (existing behavior)
      dispatch(setAnswer({ questionId, answer }));

      const result = await dispatch(
        testSessionApi.endpoints.saveAnswer.initiate({
          sessionToken,
          sectionId,
          questionId,
          answer,
          securityEvents,
          timeSpentSeconds: sectionTimeSpent[sectionId] || 0,
        })
      ).unwrap();

      dispatch(incrementSequence());
      dispatch(participantSlice.saveAnswerSuccess(result));
    } catch (error) {
      handleApiError(dispatch, participantSlice.saveAnswerFailure, error, 'Failed to save answer');
    }
  };

export const syncTestState =
  (sessionToken: string): AppThunk =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (dispatch, getState) => {
    try {
      await dispatch(incrementSequence());

      const result = await dispatch(
        testSessionApi.endpoints.syncTestState.initiate({
          sessionToken,
          syncData: selectSyncData(getState()),
        })
      ).unwrap();

      dispatch(
        participantSlice.syncTestStateSuccess({
          lastSynced: new Date().toISOString(),
          stateVersion: result.stateVersion,
        })
      );
    } catch (error) {
      handleApiError(dispatch, participantSlice.syncTestStateFailure, error, 'Sync failed');
    }
  };

export const submitTestSession =
  (sessionToken: string): AppThunk =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  async (dispatch, getState) => {
    try {
      const result = await dispatch(
        testSessionApi.endpoints.submitTestSession.initiate({
          sessionToken,
          stateSnapshot: selectSyncData(getState()).stateSnapshot,
        })
      ).unwrap();

      dispatch(setActivityStatus('ended'));
      dispatch(participantSlice.submitTestSessionSuccess(result));
    } catch (error) {
      handleApiError(dispatch, participantSlice.submitTestSessionFailure, error, 'Submission failed');
      throw error;
    }
  };

export const resumeTestSession =
  (sessionToken: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await dispatch(testSessionApi.endpoints.resumeTestSession.initiate({ sessionToken })).unwrap();
      dispatch(participantSlice.resumeTestSessionSuccess(result));
    } catch (error) {
      handleApiError(dispatch, participantSlice.resumeTestSessionFailure, error, 'Failed to resume session');
      throw error;
    }
  };

export const submitTestFeedback =
  (sessionToken: string, feedbackData: VFormFieldData): AppThunk =>
  async (dispatch) => {
    try {
      const result = await dispatch(
        participantApi.endpoints.submitFeedback.initiate({
          sessionToken,
          feedbackData,
        })
      ).unwrap();

      dispatch(setActivityStatus('ended'));
      dispatch(participantSlice.submitTestSessionSuccess(result));
    } catch (error) {
      handleApiError(dispatch, participantSlice.submitTestSessionFailure, error, 'Feedback submission failed');
      throw error;
    }
  };
