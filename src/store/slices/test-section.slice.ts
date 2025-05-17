import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TestSectionRequestDTO } from '@dto/request/test-section-request.dto';
import { TestSectionResponseDTO } from '@dto/response/test-section-response.dto';

// Define the Section State
interface TestSectionState {
  sections: TestSectionResponseDTO[];
}

// Initial State
const initialState: TestSectionState = {
  sections: [],
};

// Create the slice
const testSectionSlice = createSlice({
  name: 'testSection',
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<TestSectionResponseDTO>) => {
      state.sections.push(action.payload);
    },
    updateSection: (state, action: PayloadAction<TestSectionResponseDTO>) => {
      const index = state.sections.findIndex((section) => section.id === action.payload.id);
      if (index !== -1) {
        state.sections[index] = action.payload;
      }
    },
    removeSection: (state, action: PayloadAction<{ sectionId: string }>) => {
      state.sections = state.sections.filter((section) => section.id !== action.payload.sectionId);
    },
  },
});

export const selectTestSections = (state: RootState) => state.testsection;
export const { addSection, updateSection, removeSection } = testSectionSlice.actions;
export default testSectionSlice.reducer;

// Define the API slice
export const testSectionApiSlice = createApi({
  reducerPath: 'test-section-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createTestSection: builder.mutation<TestSectionResponseDTO, { testId: string; sectionData: TestSectionRequestDTO }>({
      query: ({ testId, sectionData }) => ({
        url: `/tests/${testId}/sections`,
        method: 'POST',
        body: sectionData,
      }),
      onQueryStarted: async (sectionData, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
    updateTestSection: builder.mutation<TestSectionResponseDTO, { testId: string; sectionId: string; sectionData: TestSectionRequestDTO }>({
      query: ({ testId, sectionId, sectionData }) => ({
        url: `/tests/${testId}/sections/${sectionId}`,
        method: 'PUT', // Use PUT or PATCH depending on your API
        body: sectionData,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateSection(data)); // Update the section in the state
          toast.success('Section updated successfully.');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
    deleteTestSection: builder.mutation<void, { testId: string; sectionId: string }>({
      query: ({ testId, sectionId }) => ({
        url: `/tests/${testId}/sections/${sectionId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ sectionId }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(removeSection({ sectionId }));
          toast.success('Section deleted successfully.');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
  }),
});

export const {
  useCreateTestSectionMutation,
  useUpdateTestSectionMutation,
  useDeleteTestSectionMutation,
} = testSectionApiSlice;
