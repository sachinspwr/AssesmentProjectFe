import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { IndustryResponseDTO } from '@dto/response/industry-response.dto';
import { IndustryRequestDTO } from '@dto/request/industry.request.dto';

interface IndustryState {
  industries: IndustryResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: IndustryState = {
  industries: [],
  loading: false,
  error: null,
};

// Create the slice
const industrySlice = createSlice({
  name: 'industries',
  initialState,
  reducers: {},
});

export const selectIndustries = (state: RootState) => state.industries;
export default industrySlice.reducer;

export const industryApiSlice = createApi({
  reducerPath: 'industries-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchIndustries: builder.query<IndustryResponseDTO[], void>({
      query: () => ({
        url: '/industries',
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

    addIndustry: builder.mutation<IndustryResponseDTO,{ newIndustry: IndustryRequestDTO }>({
          query: ({ newIndustry }) => ({
            url: `/industries`,
            method: 'POST',
            body: newIndustry,
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Industry Added Successfully!');
          },
        }),
    
        updateIndustry: builder.mutation<IndustryResponseDTO,{ id: string; data: IndustryRequestDTO }>({
          query: ({ id, data }) => ({
            url: `/industries/${id}`,
            method: 'PUT',
            body: data,
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Industry Updated Successfully!');
          },
        }),
    
        deleteIndustry: builder.mutation<boolean, { id: string }>({
          query: ({ id }) => ({
            url: `/industries/${id}`,
            method: 'DELETE',
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Industry Deleted Successfully!');
          },
        }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchIndustriesQuery, useAddIndustryMutation, useDeleteIndustryMutation, useUpdateIndustryMutation } = industryApiSlice;
