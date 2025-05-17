import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { TestInstructionOptionResponseDTO } from '@dto/response/test-instruction-option-response.dto';
import { TestInstructionOptionRequestDTO } from '@dto/request/test-instruction-option.request.dto';

interface TestInstructionsOptionState {
  instructions: TestInstructionOptionResponseDTO[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: TestInstructionsOptionState = {
  instructions: [],
  loading: false,
  error: null,
};

// Create the slice
const testInstructionsOptionSlice = createSlice({
  name: 'testInstructionsOption',
  initialState,
  reducers: {},
});

export default testInstructionsOptionSlice.reducer;

export const testInstructionsOptionApiSlice = createApi({
  reducerPath: 'test-instructions-option-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchTestInstructionsOption: builder.query<TestInstructionOptionResponseDTO[], { testId: string }>({
      query: ({ testId }) => ({
        url: `/tests/${testId}/instruction-options`,
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

    addTestInstructionOption: builder.mutation<
      TestInstructionOptionResponseDTO,
      { testId: string; newTestInstruction: TestInstructionOptionRequestDTO }
    >({
      query: ({ testId, newTestInstruction }) => ({
        url: `/tests/${testId}/instruction-options`,
        method: 'POST',
        body: newTestInstruction,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Instruction Added Successfully!');
      },
    }),

    updateTestInstructionOption: builder.mutation<
      TestInstructionOptionResponseDTO,
      { testId: string; id: string; data: TestInstructionOptionRequestDTO }
    >({
      query: ({ testId, id, data }) => ({
        url: `/tests/${testId}/instruction-options/${id}`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Instruction Updated Successfully!');
      },
    }),

    deleteInstructionsOption: builder.mutation<boolean, { testId: string; id: string }>({
      query: ({ testId, id }) => ({
        url: `/tests/${testId}/instruction-options/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Instruction Deleted Successfully!');
      },
    }),
  }),
});

export const {
  useFetchTestInstructionsOptionQuery,
  useDeleteInstructionsOptionMutation,
  useAddTestInstructionOptionMutation,
  useUpdateTestInstructionOptionMutation,
} = testInstructionsOptionApiSlice;
