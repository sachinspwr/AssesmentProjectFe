import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiPath } from 'test-runner/core';
import { testRunnerBaseQuery } from 'test-runner/core/test-runner-base-query';

export const testSessionApi = createApi({
  reducerPath: 'test-session-api',
  baseQuery: testRunnerBaseQuery,
  endpoints: (builder) => ({
    initializeTestSession: builder.mutation({
      query: ({ token }) => ({
        url: ApiPath.INITIALIZE_SESSION,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    fetchTestDetails: builder.query({
      query: (sessionToken) => ({
        url: ApiPath.FETCH_TEST_DETAILS,
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionToken}` },
      }),
    }),

    saveAnswer: builder.mutation({
      query: ({ sessionToken, sectionId, questionId, answer }) => ({
        url: ApiPath.SAVE_ANSWER,
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionToken}` },
        body: { sectionId, questionId, answer },
      }),
    }),

    syncTestState: builder.mutation({
      query: ({ sessionToken, syncData }) => ({
        url: ApiPath.SYNC_TEST_STATE,
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionToken}` },
        body: syncData,
      }),
    }),

    submitTestSession: builder.mutation({
      query: ({ sessionToken, stateSnapshot }) => ({
        url: ApiPath.SUBMIT_TEST_SESSION,
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionToken}` },
        body: { stateSnapshot },
      }),
    }),
    
    resumeTestSession: builder.query({
      query: (sessionToken) => ({
        url: ApiPath.RESUME_SESSION,
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionToken}` },
      }),
    }),
  }),
});

export const {
  useInitializeTestSessionMutation,
  useFetchTestDetailsQuery,
  useSaveAnswerMutation,
  useSyncTestStateMutation,
  useSubmitTestSessionMutation,
  useResumeTestSessionQuery,
} = testSessionApi;
