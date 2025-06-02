import { TestResponseObjDTO, TestResultResponseDTO } from '@dto/response';
import { PaginatedResponse } from '@dto/response/pagination-response.dto';
import { UserDashbaordSummaryDTO } from '@dto/response/user-dashboard-summary.dto';
import { UserTestResults } from '@dto/response/user-test-results-response.dto';
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

    getAllTestsGivenByUser: builder.query<PaginatedResponse<UserTestResults>, { userId: string }>({
      query: ({ userId }) => ({ url: `/tests/:testId/results/users/${userId}`, method: 'GET' }),
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
  }),
});

export const {
  useFetchBriefResultQuery,
  useGetDetailedResultQuery,
  useGetAllTestsGivenByUserQuery,
  useGetAllTestsSummaryByUserQuery,
} = testResultApiSlice;
