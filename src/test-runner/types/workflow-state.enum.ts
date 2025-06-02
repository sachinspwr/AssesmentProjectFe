import { TestFlowRoutes } from "test-runner/core";

export enum TestWorkflowState {
  INITIAL = 'INITIAL',                     // Before token extraction or unknown state
  PARTICIPANT_TOKEN_FETCHING = 'PARTICIPANT_TOKEN_FETCHING',  // Fetching participant token
  REGISTRATION_REQUIRED = 'REGISTRATION_REQUIRED',            // Show registration form
  PARTICIPANT_TOKEN_ACQUIRED = 'PARTICIPANT_TOKEN_ACQUIRED',  // Got participant token (post reg or direct)
  SESSION_CREATED = 'SESSION_CREATED',
  TEST_OVERVIEW = 'TEST_OVERVIEW',                            // Show test overview/landing with start button
  PRIVACY_POLICY_ACCEPTANCE = 'PRIVACY_POLICY_ACCEPTANCE', 
  TEST_STARTED = 'TEST_STARTED',                              // Test started, questions visible
  TEST_IN_PROGRESS = 'TEST_IN_PROGRESS',                      // Answering questions
  TEST_SUBMITTED = 'TEST_SUBMITTED',                          // Test submitted, awaiting results
  FEEDBACK_REQUIRED = 'FEEDBACK_REQUIRED',                    // Optional feedback page
  RESULTS_AVAILABLE = 'RESULTS_AVAILABLE',                    // Show test results
  SIGN_OFF = 'SIGN_OFF',                                      // Final sign-off page
  AUTH_ERROR = 'AUTH_ERROR',                                  // Invalid token or auth error
}


export const WorkflowStateToRoute: Record<TestWorkflowState, string> = {
  [TestWorkflowState.INITIAL]: TestFlowRoutes.ENTRY,                    // "/test-runner/entry" - start, extract token
  [TestWorkflowState.PARTICIPANT_TOKEN_FETCHING]: TestFlowRoutes.ENTRY,  // "/test-runner/session-setup" - fetching participant token (or loading)
  [TestWorkflowState.AUTH_ERROR]: TestFlowRoutes.ERROR_ACCESS_DENIED,    // "/test-runner/access-denied" - auth error for invalid token
  [TestWorkflowState.REGISTRATION_REQUIRED]: TestFlowRoutes.PARTICIPANT_REGISTRATION,  // "/test-runner/register" - show registration form
  [TestWorkflowState.PARTICIPANT_TOKEN_ACQUIRED]: TestFlowRoutes.ENTRY,      // "/test-runner/session-setup" - participant token acquired, create test session
  [TestWorkflowState.SESSION_CREATED]: TestFlowRoutes.ENTRY,
  [TestWorkflowState.TEST_OVERVIEW]: TestFlowRoutes.TEST_OVERVIEW,   // "/test-runner/begin-test" - test overview page with start button
  [TestWorkflowState.PRIVACY_POLICY_ACCEPTANCE]: TestFlowRoutes.PRIVACY_POLICY,      // "/test-runner/session-setup" - participant token acquired, create test session
  [TestWorkflowState.TEST_STARTED]: TestFlowRoutes.TEST_INTERFACE,       // "/test-runner/test" - test started, questions shown
  [TestWorkflowState.TEST_IN_PROGRESS]: TestFlowRoutes.TEST_INTERFACE,   // "/test-runner/test" - answering questions ongoing
  [TestWorkflowState.TEST_SUBMITTED]: TestFlowRoutes.SUBMISSION_CONFIRMATION, // "/test-runner/confirm-submission" - test submitted, waiting for results or sign off
  [TestWorkflowState.FEEDBACK_REQUIRED]: TestFlowRoutes.TEST_FEEDBACK,   // "/test-runner/feedback" - optional feedback page
  [TestWorkflowState.RESULTS_AVAILABLE]: TestFlowRoutes.TEST_RESULTS,    // "/test-runner/results" - show results
  [TestWorkflowState.SIGN_OFF]: TestFlowRoutes.TEST_SIGNOFF,          // "/test-runner/complete" - final sign off page
};