import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { TestSettingOptionResponseDTO } from '@dto/response/test-setting-option.response.dto';
import { TestSettingOptionRequestDTO } from '@dto/request/test-setting-option.request.dto';

interface testSettingOptionState {
  settings: TestSettingOptionResponseDTO | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: testSettingOptionState = {
  settings: null,
  loading: false,
  error: null,
};

// Create the slice
const testSettingOptionSlice = createSlice({
  name: 'testSettingOption',
  initialState,
  reducers: {},
});

export default testSettingOptionSlice.reducer;

export const testSettingOptionApiSlice = createApi({
  reducerPath: 'test-setting-option-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchTestSettingsOption: builder.query<TestSettingOptionResponseDTO[], { testId: string }>({
      query: ({ testId }) => ({
        url: `/tests/${testId}/setting-options`,
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

    addTestSettingOption: builder.mutation<
      TestSettingOptionResponseDTO,
      { testId: string; newSetting: TestSettingOptionRequestDTO }
    >({
      query: ({ testId, newSetting }) => ({
        url: `/tests/${testId}/setting-options`,
        method: 'POST',
        body: newSetting,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Setting Added Successfully!');
      },
    }),

    updateTestSettingOption: builder.mutation<
      TestSettingOptionResponseDTO,
      { testId: string; id: string; data: TestSettingOptionRequestDTO }
    >({
      query: ({ testId, id, data }) => ({
        url: `/tests/${testId}/setting-options/${id}`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Setting Updated Successfully!');
      },
    }),

    deleteTestSettingsOption: builder.mutation<boolean, { testId: string; id: string }>({
      query: ({ testId, id }) => ({
        url: `/tests/${testId}/setting-options/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Setting Deleted Successfully!');
      },
    }),
  }),
});

export const {
  useFetchTestSettingsOptionQuery,
  useDeleteTestSettingsOptionMutation,
  useAddTestSettingOptionMutation,
  useUpdateTestSettingOptionMutation,
} = testSettingOptionApiSlice;
