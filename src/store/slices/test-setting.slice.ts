import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TestSettingRequestDTO } from '@dto/request/test-setting-request.dto';
import { TestSettingOptionResponseDTO } from '@dto/response';
import { TEST_TAG } from './test-assessment.slice';

// Define tag types
const TEST_SETTING_TAG = 'TestSetting' as const;

// Define initial state
interface TestSettingsState {
  loading: boolean;
  error: string | null;
}

const initialState: TestSettingsState = {
  loading: false,
  error: null,
};

const testSettingsSlice = createSlice({
  name: 'testSettings',
  initialState,
  reducers: {},
});

export default testSettingsSlice.reducer;

export const testSettingsApiSlice = createApi({
  reducerPath: 'test-settings-api',
  baseQuery: axiosBaseQuery,
  tagTypes: [TEST_SETTING_TAG, TEST_TAG], // Include both tag types
  endpoints: (builder) => ({
    fetchTestSettings: builder.query<TestSettingOptionResponseDTO[], string>({
      query: (testId) => ({
        url: `/tests/${testId}/settings`,
        method: 'GET',
      }),
      providesTags: (result, error, testId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TEST_SETTING_TAG, id } as const)),
              { type: TEST_SETTING_TAG, id: `TEST-${testId}` } as const,
            ]
          : [{ type: TEST_SETTING_TAG, id: `TEST-${testId}` } as const],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    assignTestSettings: builder.mutation<TestSettingOptionResponseDTO[], { testId: string; data: TestSettingRequestDTO[] }>({
      query: ({ testId, data }) => ({
        url: `/tests/${testId}/settings/bulk`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_SETTING_TAG, id: `TEST-${testId}` },
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

    updateTestSettings: builder.mutation<TestSettingOptionResponseDTO[], { testId: string; data: TestSettingRequestDTO[] }>({
      query: ({ testId, data }) => ({
        url: `/tests/${testId}/settings/bulk`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { testId }) => [
        { type: TEST_SETTING_TAG, id: `TEST-${testId}` },
        { type: TEST_TAG, id: testId }, // Also invalidate the parent test
      ],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Test settings updated successfully');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
  }),
});

export const { 
  useFetchTestSettingsQuery, 
  useAssignTestSettingsMutation, 
  useUpdateTestSettingsMutation 
} = testSettingsApiSlice;