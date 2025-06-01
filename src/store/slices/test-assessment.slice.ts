import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { PaginatedResponse } from '@dto/response/pagination-response.dto';
import { BasicTestDetailRequestDTO, SearchRequestDTO, TestRequestDTO } from '@dto/request';
import { TestRequestsDTO } from '@dto/request/test-requests.dto';
import { TestResponseDTO } from '@dto/response/test-response.dto';
import { Test } from 'models';
import { TestConfigRequestDTO } from '@dto/request/test-config-request.dto';

// **Initial State for Selected Test**
interface TestState {
  selectedTest: Test | null;
}

const initialState: TestState = {
  selectedTest: null,
};

const selectedTestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // Action to set the selected test data
    setSelectedTest: (state, action: PayloadAction<Test>) => {
      state.selectedTest = action.payload;
    },
    // Action to clear the selected test data
    clearSelectedTest: (state) => {
      state.selectedTest = null;
    },
  },
});

export const selectSelectedTest = (state: RootState) => state.test.selectedTest;
export const { setSelectedTest, clearSelectedTest } = selectedTestSlice.actions;
export default selectedTestSlice.reducer;

export const TEST_TAG = 'Test' as const;

export const testAssessmentApiSlice = createApi({
  reducerPath: 'test-assessment-api',
  baseQuery: axiosBaseQuery,
  tagTypes: [TEST_TAG],
  endpoints: (builder) => ({
    fetchTests: builder.query<PaginatedResponse<TestResponseDTO>, { scope: Scope; page: number; limit: number }>({
      query: ({ scope, page, limit }) => {
        const params = new URLSearchParams();
        if (scope !== 'all') params.append('isPublic', String(scope === 'public'));
        if (limit) params.append('limit', String(limit));
        if (page) params.append('page', String(page));

        return {
          url: `/tests?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: TEST_TAG, id })), { type: TEST_TAG, id: 'LIST' }]
          : [{ type: TEST_TAG, id: 'LIST' }],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    fetchTestById: builder.query<TestResponseDTO, string>({
      query: (testId) => ({
        url: `/tests/${testId}`,
        method: 'GET',
      }),
      providesTags: (result, error, testId) => (result ? [{ type: TEST_TAG, id: testId }] : []),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    searchTests: builder.mutation<PaginatedResponse<TestResponseDTO>, SearchRequestDTO<TestRequestDTO>>({
      query: (searchCriteria) => ({
        url: '/tests/search',
        method: 'POST',
        body: searchCriteria,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    createTest: builder.mutation<TestResponseDTO, TestRequestsDTO>({
      query: (testData) => ({
        url: '/tests',
        method: 'POST',
        body: testData,
      }),
      invalidatesTags: [{ type: TEST_TAG, id: 'LIST' }],
      onQueryStarted: async (testData, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    createTestWithBasicDetail: builder.mutation<TestResponseDTO, BasicTestDetailRequestDTO>({
      query: (testData) => ({
        url: '/tests',
        method: 'POST',
        body: testData,
      }),
      invalidatesTags: [{ type: TEST_TAG, id: 'LIST' }],
      onQueryStarted: async (testData, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    patchBasicTestDetail: builder.mutation<TestResponseDTO, { testId: string; testData: BasicTestDetailRequestDTO }>({
      query: ({ testId, testData }) => ({
        url: `/tests/${testId}`,
        method: 'PATCH',
        body: testData,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_TAG, id: testId },
        { type: TEST_TAG, id: 'LIST' },
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    publishTest: builder.mutation<TestResponseDTO, string>({
      query: (testId) => ({
        url: `/tests/${testId}/publish`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, testId) => [
        { type: TEST_TAG, id: testId },
        { type: TEST_TAG, id: 'LIST' },
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    // delete mutation for deleting test
    deleteTest: builder.mutation<boolean, string>({
      query: (testId) => ({
        url: `/tests/${testId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, testId) => [
        { type: TEST_TAG, id: testId },
        { type: TEST_TAG, id: 'LIST' },
      ],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Test Deleted Successfully!');
      },
    }),

    updateTestConfig: builder.mutation<TestResponseDTO, { testId: string; configData: TestConfigRequestDTO }>({
      query: ({ testId, configData }) => ({
        url: `/tests/${testId}/config`,
        method: 'PATCH',
        body: configData,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_TAG, id: testId },
        { type: TEST_TAG, id: 'LIST' },
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    fetchTestsByStatus: builder.query<PaginatedResponse<TestResponseDTO>, { status: string }>({
      query: ({ status }) => {
        return {
          url: `/tests/:id/status?status=${status}`,
          method: 'GET',
        };
      },
      onQueryStarted: handleQueryResponse,
    }),

    approveTest: builder.mutation<TestResponseDTO, string>({
      query: (testId) => ({
        url: `/tests/${testId}/approve`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, testId) => [
        { type: TEST_TAG, id: testId },
        { type: TEST_TAG, id: 'LIST' },
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Test Approved Successfully!');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    rejectTest: builder.mutation<TestResponseDTO, { testId: string; comment: string }>({
      query: ({ testId, comment }) => ({
        url: `/tests/${testId}/reject`,
        method: 'POST',
        body: { comment },
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_TAG, id: testId },
        { type: TEST_TAG, id: 'LIST' },
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Test Rejected with Reason!');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
  }),
});

export const {
  useFetchTestsQuery,
  useFetchTestByIdQuery,
  useSearchTestsMutation,
  useCreateTestMutation,
  useCreateTestWithBasicDetailMutation,
  usePatchBasicTestDetailMutation,
  usePublishTestMutation,
  useDeleteTestMutation,
  useUpdateTestConfigMutation,
  useFetchTestsByStatusQuery,
  useApproveTestMutation,
  useRejectTestMutation,
} = testAssessmentApiSlice;
