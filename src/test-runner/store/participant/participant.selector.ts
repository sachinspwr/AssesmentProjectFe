import { TestRunnerState } from '../test-runner.store';

export const selectParticipant = (state: TestRunnerState) => state.participant;

export const selectLoading = (state: TestRunnerState) => state.participant.loading;
export const selectError = (state: TestRunnerState) => state.participant.error;
export const selectToken = (state: TestRunnerState) => state.participant.token;
export const selectRegistrationRequired = (state: TestRunnerState) => state.participant.registrationRequired;
export const selectRegistrationFields = (state: TestRunnerState) => state.participant.registrationFields;
export const selectTestDetails = (state: TestRunnerState) => state.participant.testDetails;
export const selectSession = (state: TestRunnerState) => state.participant.session;
export const selectResult = (state: TestRunnerState) => state.participant.result;
export const selectLastSync = (state: TestRunnerState) => state.participant.lastSync;
export const selectIsSubmitting = (state: TestRunnerState) => state.participant.isSubmitting;
export const selectAcceptedPrivacyPolicy = (state: TestRunnerState) => state.participant.acceptedPrivacyPolicy;
export const selectSessionToken = (state: TestRunnerState) => state.participant.session?.token ?? null;
export const selectLinkToken = (state: TestRunnerState) => state.participant.linkToken;