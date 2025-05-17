import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { ExperienceLevelResponseDTO } from '@dto/response/experience-level-response.dto';
import { ExperienceLevelRequestDTO } from '@dto/request/experience-level.request.dto';

interface ExperienceLevelState {
  experience: ExperienceLevelResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: ExperienceLevelState = {
  experience: [],
  loading: false,
  error: null,
};

// Create the slice
const experiencelevelSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
});

export const selectExperienceLevel = (state: RootState) => state.experience;
export default experiencelevelSlice.reducer;

export const experienceLevelApiSlice = createApi({
  reducerPath: 'experience-level-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchExperienceLevel: builder.query<ExperienceLevelResponseDTO[], void>({
      query: () => ({
        url: '/experience-levels',
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

    addExperienceLevel: builder.mutation<ExperienceLevelResponseDTO,{ newExperienceLevel: ExperienceLevelRequestDTO }>({
                  query: ({ newExperienceLevel }) => ({
                    url: `/experience-levels`,
                    method: 'POST',
                    body: newExperienceLevel,
                  }),
                  onQueryStarted: async (arg, api) => {
                    await handleQueryResponse(arg, api, 'Experience Level Added Successfully!');
                  },
                }),
            
                updateExperienceLevel: builder.mutation<ExperienceLevelResponseDTO,{ id: string; data: ExperienceLevelRequestDTO }>({
                  query: ({ id, data }) => ({
                    url: `//experience-levels/${id}`,
                    method: 'PUT',
                    body: data,
                  }),
                  onQueryStarted: async (arg, api) => {
                    await handleQueryResponse(arg, api, 'Experience Level Updated Successfully!');
                  },
                }),
            
                deleteExperienceLevel: builder.mutation<boolean, { id: string }>({
                  query: ({ id }) => ({
                    url: `//experience-levels/${id}`,
                    method: 'DELETE',
                  }),
                  onQueryStarted: async (arg, api) => {
                    await handleQueryResponse(arg, api, 'Experience Level Deleted Successfully!');
                  },
                }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchExperienceLevelQuery, useAddExperienceLevelMutation, useUpdateExperienceLevelMutation, useDeleteExperienceLevelMutation } = experienceLevelApiSlice;
