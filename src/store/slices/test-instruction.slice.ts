import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TestInstructionRequestDTO } from '@dto/request/test-instruction-request.dto';
import { TestInstructionOptionResponseDTO } from '@dto/response/test-instruction-option-response.dto';
import { TEST_TAG } from './test-assessment.slice';

// Define initial state
interface TestInstructionsState {
  loading: boolean;
  error: string | null;
}

const initialState: TestInstructionsState = {
  loading: false,
  error: null,
};

// Create the slice
const testInstructionsSlice = createSlice({
  name: 'testInstructions',
  initialState,
  reducers: {},
});

export default testInstructionsSlice.reducer;

export const TEST_INSTRUCTIONS_TAG = 'TestInstructions' as const;

export const testInstructionsApiSlice = createApi({
  reducerPath: 'test-instructions-api',
  baseQuery: axiosBaseQuery,
  tagTypes: [TEST_INSTRUCTIONS_TAG, TEST_TAG], // Include both tag types
  endpoints: (builder) => ({
    fetchTestInstructions: builder.query<TestInstructionOptionResponseDTO[], string>({
      query: (testId) => ({
        url: `/tests/${testId}/instructions`,
        method: 'GET',
      }),
      providesTags: (result, error, testId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TEST_INSTRUCTIONS_TAG, id })),
              { type: TEST_INSTRUCTIONS_TAG, id: `TEST-${testId}-LIST` },
            ]
          : [{ type: TEST_INSTRUCTIONS_TAG, id: `TEST-${testId}-LIST` }],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    createTestInstructions: builder.mutation<
      TestInstructionOptionResponseDTO[],
      { testId: string; data: TestInstructionRequestDTO[] }
    >({
      query: ({ testId, data }) => ({
        url: `/tests/${testId}/instructions/bulk`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_INSTRUCTIONS_TAG, id: `TEST-${testId}-LIST` },
        { type: TEST_TAG, id: testId }, // Also invalidate the test itself
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
    
    updateTestInstructions: builder.mutation<
      TestInstructionOptionResponseDTO[],
      { testId: string; data: TestInstructionRequestDTO[] }
    >({
      query: ({ testId, data }) => ({
        url: `/tests/${testId}/instructions/bulk`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_INSTRUCTIONS_TAG, id: `TEST-${testId}-LIST` },
        { type: TEST_TAG, id: testId }
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
  }),
});

export const { useFetchTestInstructionsQuery, useCreateTestInstructionsMutation, useUpdateTestInstructionsMutation } =
  testInstructionsApiSlice;