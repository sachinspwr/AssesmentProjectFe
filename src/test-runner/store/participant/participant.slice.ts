import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationField, TestDetails, TestSession, TestResult } from 'test-runner/types';

interface ParticipantError {
  error: string;
  statusCode?: number;
  registrationRequired?: boolean;
  fields?: RegistrationField[];
}

export interface ParticipantState {
  loading: boolean;
  error: string | null;
  token: string | null;
  linkToken: string | null;
  registrationRequired: boolean;
  registrationFields: RegistrationField[];
  testDetails: TestDetails | null;
  session: TestSession | null;
  result: TestResult | null;
  lastSync: number | null;
  isSubmitting: boolean;
  acceptedPrivacyPolicy?: boolean;
}

const initialState: ParticipantState = {
  loading: false,
  error: null,
  token: null,
  linkToken: null,
  registrationRequired: false,
  registrationFields: [],
  testDetails: null,
  session: null,
  result: null,
  lastSync: null,
  isSubmitting: false,
  acceptedPrivacyPolicy: undefined, // not answered yet
};

const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    // --- Link TOken ---
    setLinkToken: (state, action: PayloadAction<string>) => {
      state.linkToken = action.payload;
    },
    clearLinkToken: (state) => {
      state.linkToken = null;
    },

    // --- Token Validation ---
    fetchTokenRequest: (state, action: PayloadAction<{ token: string; testId?: string }>) => {
      state.loading = true;
      state.error = null;
      state.token = action.payload.token;
    },
    fetchTokenSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.registrationRequired = false;
    },
    fetchTokenFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
      if (action.payload.registrationRequired) {
        state.registrationRequired = true;
        state.registrationFields = action.payload.fields ?? [];
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRegistrationRequired: (state, action: PayloadAction<RegistrationField[]>) => {
      state.registrationRequired = true;
      state.registrationFields = action.payload;
    },
    // --- Registration ---
    registerParticipantRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerParticipantSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.registrationRequired = false;
    },
    registerParticipantFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // --- Test Session ---
    initializeTestSessionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    initializeTestSessionSuccess: (state, action: PayloadAction<TestSession>) => {
      state.loading = false;
      state.session = action.payload;
    },
    initializeTestSessionFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // --- Test Details ---
    fetchTestDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTestDetailsSuccess: (state, action: PayloadAction<TestDetails>) => {
      state.loading = false;
      state.testDetails = action.payload;
    },
    fetchTestDetailsFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // ----Ask policy----
    acceptPrivacyPolicy: (state) => {
      state.acceptedPrivacyPolicy = true;
    },
    rejectPrivacyPolicy: (state) => {
      state.acceptedPrivacyPolicy = false;
    },
    resetRejectPrivacyPolicy: (state) => {
      state.acceptedPrivacyPolicy = undefined;
    },

    // --- Save Answer ---
    saveAnswerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    saveAnswerSuccess: (state) => {
      state.loading = false;
    },
    saveAnswerFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // --- Sync State ---
    syncTestStateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    syncTestStateSuccess: (state, action: PayloadAction<{ lastSynced: string; stateVersion: string }>) => {
      state.loading = false;
      state.lastSync = new Date(action.payload.lastSynced).getTime();
    },
    syncTestStateFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // --- Submit ---
    submitTestSessionRequest: (state) => {
      state.isSubmitting = true;
      state.error = null;
    },
    submitTestSessionSuccess: (state, action: PayloadAction<TestResult>) => {
      state.isSubmitting = false;
      state.result = action.payload;
    },
    submitTestSessionFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.isSubmitting = false;
      state.error = action.payload.error;
    },

    // --- Resume Session ---
    resumeTestSessionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    resumeTestSessionSuccess: (state, action: PayloadAction<TestSession>) => {
      state.loading = false;
      state.session = action.payload;
    },
    resumeTestSessionFailure: (state, action: PayloadAction<ParticipantError>) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  setLinkToken,
  clearLinkToken,
  fetchTokenRequest,
  fetchTokenSuccess,
  fetchTokenFailure,
  registerParticipantRequest,
  registerParticipantSuccess,
  registerParticipantFailure,
  initializeTestSessionRequest,
  initializeTestSessionSuccess,
  initializeTestSessionFailure,
  fetchTestDetailsRequest,
  fetchTestDetailsSuccess,
  fetchTestDetailsFailure,
  saveAnswerRequest,
  saveAnswerSuccess,
  saveAnswerFailure,
  syncTestStateRequest,
  syncTestStateSuccess,
  syncTestStateFailure,
  submitTestSessionRequest,
  submitTestSessionSuccess,
  submitTestSessionFailure,
  resumeTestSessionRequest,
  resumeTestSessionSuccess,
  resumeTestSessionFailure,
  acceptPrivacyPolicy,
  rejectPrivacyPolicy,
  resetRejectPrivacyPolicy,
} = participantSlice.actions;

export const participantReducer = participantSlice.reducer;
