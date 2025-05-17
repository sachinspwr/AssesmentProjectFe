import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TestRegistrationFieldRequestDTO } from '@dto/request/test-registration-field-request.dto';
import { TestRegistrationFieldOptionResponseDTO } from '@dto/response/registration-field-option-response.dto';
import { TEST_TAG } from './test-assessment.slice';

// Define tag types
const REGISTRATION_FIELD_TAG = 'RegistrationField' as const;

// Define initial state
interface TestRegistrationFieldsState {
  loading: boolean;
  error: string | null;
}

const initialState: TestRegistrationFieldsState = {
  loading: false,
  error: null,
};

// Create the slice
const testRegistrationFieldsSlice = createSlice({
  name: 'testRegistrationFields',
  initialState,
  reducers: {},
});

export default testRegistrationFieldsSlice.reducer;

export const testRegistrationFieldsApiSlice = createApi({
  reducerPath: 'test-registration-fields-api',
  baseQuery: axiosBaseQuery,
  tagTypes: [REGISTRATION_FIELD_TAG, TEST_TAG], // Include both tag types
  endpoints: (builder) => ({
    fetchTestRegistrationFields: builder.query<TestRegistrationFieldOptionResponseDTO[], string>({
      query: (testId) => ({
        url: `/tests/${testId}/registration-fields`,
        method: 'GET',
      }),
      providesTags: (result, error, testId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: REGISTRATION_FIELD_TAG, id } as const)),
              { type: REGISTRATION_FIELD_TAG, id: `TEST-${testId}` } as const,
            ]
          : [{ type: REGISTRATION_FIELD_TAG, id: `TEST-${testId}` } as const],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    createTestRegistrationFields: builder.mutation<
      TestRegistrationFieldOptionResponseDTO[],
      { testId: string; data: TestRegistrationFieldRequestDTO[] }
    >({
      query: ({ testId, data }) => ({
        url: `/tests/${testId}/registration-fields/bulk`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: REGISTRATION_FIELD_TAG, id: `TEST-${testId}` },
        { type: TEST_TAG, id: testId }, // Also invalidate the parent test
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

    updateTestRegistrationFields: builder.mutation<
      TestRegistrationFieldOptionResponseDTO[],
      { testId: string; data: TestRegistrationFieldRequestDTO[] }
    >({
      query: ({ testId, data }) => ({
        url: `/tests/${testId}/registration-fields/bulk`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: REGISTRATION_FIELD_TAG, id: `TEST-${testId}` },
        { type: TEST_TAG, id: testId }, // Also invalidate the parent test
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

export const {
  useFetchTestRegistrationFieldsQuery,
  useCreateTestRegistrationFieldsMutation,
  useUpdateTestRegistrationFieldsMutation,
} = testRegistrationFieldsApiSlice;