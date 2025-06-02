import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiPath } from 'test-runner/core';
import { testRunnerBaseQuery } from 'test-runner/core/test-runner-base-query';

export const participantApi = createApi({
  reducerPath: 'participants-api',
  baseQuery: testRunnerBaseQuery,
  endpoints: (builder) => ({
    fetchParticipantToken: builder.mutation({
      query: ({ token, testId }) => ({
        url: ApiPath.FETCH_PARTICIPANT_TOKEN,
        method: 'POST',
        body: { testId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    registerParticipant: builder.mutation({
      query: ({ token, registrationData }) => ({
        url: ApiPath.REGISTER_PARTICIPANT,
        method: 'POST',
        body: registrationData, // Don't wrap it again
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),

    submitFeedback: builder.mutation({
        query: ({ sessionToken, feedbackData }) => ({
        url: ApiPath.SUBMIT_TEST_FEEDBACK,
        method: 'POST',
        body: feedbackData, // Directly use feedbackData as body
        headers: { Authorization: `Bearer ${sessionToken}` },
      }),
    }),
  }),
});

export const { useFetchParticipantTokenMutation, useRegisterParticipantMutation , useSubmitFeedbackMutation } = participantApi;
