import { TestResponseObjDTO, TestResultResponseDTO } from '@dto/response';
import { GuestInviterSummaryResponseDTO } from '@dto/response/guest-inviter-summury.response.dto';
import { PaginatedResponse } from '@dto/response/pagination-response.dto';
import { UserDashbaordSummaryDTO } from '@dto/response/user-dashboard-summary.dto';
import { InvitedUserTestResultResponseDTO, UserTestResultResponseDTO } from '@dto/response/user-test-result.response.dto';
import { createApi } from '@reduxjs/toolkit/query/react';
import { handleApiError } from 'api/api.error';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';

export const testResultApiSlice = createApi({
  reducerPath: 'test-result-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchBriefResult: builder.query<PaginatedResponse<TestResponseObjDTO>, { testId: string; participantId: string }>({
      query: ({ testId, participantId }) => ({
        url: `/tests/${testId}/results/participants/${participantId}`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getDetailedResult: builder.query<TestResultResponseDTO, { resultId: string }>({
      query: ({ resultId }) => ({ url: `/test-results/${resultId}`, method: 'GET' }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getAllTestsGivenByUser: builder.query<PaginatedResponse<UserTestResultResponseDTO>, void>({
      query: () => ({ url: `/test-results/users`, method: 'GET' }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getAllTestsSummaryByUser: builder.query<UserDashbaordSummaryDTO, void>({
      query: () => ({ url: `/dashboard/test-summary`, method: 'GET' }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getInvitedParticipantsResultSummary: builder.query<GuestInviterSummaryResponseDTO, void>({
      query: () => ({
        url: '/dashboard/invited-participants/result-summary',
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getAllTestResultsGivenByInvitedUser: builder.query<PaginatedResponse<InvitedUserTestResultResponseDTO>, void>({
      query: () => ({ url: `/test-results/invited-participants`, method: 'GET' }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
    
    getTestsByStatus: builder.query<PaginatedResponse<UserTestResultResponseDTO>, { status: string }>({
      query: ({ status }) => ({
        url: `/test-results/users`,
        method: 'GET',
        params: { status },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getFilteredTestResults: builder.query<PaginatedResponse<UserTestResultResponseDTO>, Record<string, string | number>>({
      query: (params) => ({
        url: `/test-results/users`,
        method: 'GET',
        params, // Pass the whole query param object
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
    
  })    
});

export const {
  useFetchBriefResultQuery,
  useGetDetailedResultQuery,
  useGetAllTestsGivenByUserQuery,
  useGetAllTestsSummaryByUserQuery,
  useGetTestsByStatusQuery,
  useGetInvitedParticipantsResultSummaryQuery,
  useGetAllTestResultsGivenByInvitedUserQuery,
  useGetFilteredTestResultsQuery
} = testResultApiSlice;
