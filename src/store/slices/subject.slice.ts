import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { SubjectResponseDTO } from '@dto/response/subject-response.dto';
import { SubjectRequestDTO } from '@dto/request/subject.request.dto';

interface SubjectsState {
  subjects: SubjectResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: SubjectsState = {
  subjects: [],
  loading: false,
  error: null,
};

// Create the slice
const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {},
});

export const selectSubjects = (state: RootState) => state.subjects;
export default subjectsSlice.reducer;

export const subjectsApiSlice = createApi({
  reducerPath: 'subjects-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchSubjects: builder.query<SubjectResponseDTO[], void>({
      query: () => ({
        url: '/subjects',
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

    addSubject: builder.mutation<SubjectResponseDTO,{ newSubject: SubjectRequestDTO }>({
              query: ({ newSubject }) => ({
                url: `/subjects`,
                method: 'POST',
                body: newSubject,
              }),
              onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api, 'Subject Added Successfully!');
              },
            }),
        
            updateSubject: builder.mutation<SubjectResponseDTO,{ id: string; data: SubjectRequestDTO }>({
              query: ({ id, data }) => ({
                url: `/subjects/${id}`,
                method: 'PUT',
                body: data,
              }),
              onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api, 'Subject Updated Successfully!');
              },
            }),
        
            deleteSubject: builder.mutation<boolean, { id: string }>({
              query: ({ id }) => ({
                url: `/subjects/${id}`,
                method: 'DELETE',
              }),
              onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api, 'Subject Deleted Successfully!');
              },
            }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchSubjectsQuery, useAddSubjectMutation, useUpdateSubjectMutation, useDeleteSubjectMutation } = subjectsApiSlice;
