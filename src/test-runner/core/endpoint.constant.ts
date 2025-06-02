// Define all endpoints in one place
export const ApiPath = {
  FETCH_PARTICIPANT_TOKEN: '/participants/token',
  REGISTER_PARTICIPANT: '/participants/register',
  INITIALIZE_SESSION: '/test-sessions',
  FETCH_TEST_DETAILS: '/test-sessions/test',
  SAVE_ANSWER: '/test-sessions/answer',
  SYNC_TEST_STATE: '/test-sessions/heartbeat',
  SUBMIT_TEST_SESSION: '/test-sessions/submit',
  RESUME_SESSION: '/test-sessions/me',
  SUBMIT_TEST_FEEDBACK: '/test-feedback',
};



export const TestFlowRoutes = {
  ENTRY: "/participant/entry",
  PARTICIPANT_REGISTRATION: "/participant/register",
  TEST_OVERVIEW: "/participant/test-overview",

  PRIVACY_POLICY: '/participant/privacy-policy',
  PRIVACY_POLICY_REJECTED: '/participant/privacy-rejected',

  TEST_INTERFACE: "/participant/test",
  SUBMISSION_CONFIRMATION: "/participant/confirm-submission",

  TEST_SUBMITTED: "/participant/submitted",
  TEST_RESULTS: "/participant/results",
  TEST_FEEDBACK: "/participant/test-feedback",

  // Test Canceled
  TEST_CANCELLED: "/participant/test-cancelled",
  TEST_SIGNOFF: "/participant/sign-off",

  // Error States
  ERROR_ACCESS_DENIED: "/participant/access-denied",
  ERROR_FORBIDDEN: "/participant/forbidden",
  ERROR_TOKEN_INVALID: "/participant/token-invalid",
  ERROR_SESSION_EXPIRED: "/participant/session-expired",


};
