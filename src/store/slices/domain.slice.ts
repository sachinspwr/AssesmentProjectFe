import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { DomainRequestDTO } from '@dto/request/domain.request.dto';


interface DomainState {
  domains: DomainResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: DomainState = {
  domains: [],
  loading: false,
  error: null,
};

// Create the slice
const domainsSlice = createSlice({
  name: 'domains',
  initialState,
  reducers: {},
});

export const selectDomains = (state: RootState) => state.domains;
export default domainsSlice.reducer;

export const domainsApiSlice = createApi({
  reducerPath: 'domains-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchDomains: builder.query<DomainResponseDTO[], void>({
      query: () => ({
        url: '/domains',
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

    addDomains: builder.mutation<DomainResponseDTO,{ newDomain: DomainRequestDTO }>({
              query: ({ newDomain }) => ({
                url: `/domains`,
                method: 'POST',
                body: newDomain,
              }),
              onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api, 'Domain Added Successfully!');
              },
            }),
        
            updateDomain: builder.mutation<DomainResponseDTO,{ id: string; data: DomainRequestDTO }>({
              query: ({ id, data }) => ({
                url: `/domains/${id}`,
                method: 'PUT',
                body: data,
              }),
              onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api, 'Domain Updated Successfully!');
              },
            }),
        
            deleteDomain: builder.mutation<boolean, { id: string }>({
              query: ({ id }) => ({
                url: `/domains/${id}`,
                method: 'DELETE',
              }),
              onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api, 'Domain Deleted Successfully!');
              },
            }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchDomainsQuery, useAddDomainsMutation, useDeleteDomainMutation, useUpdateDomainMutation } = domainsApiSlice;