import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { IndustryRoleResponseDTO } from '@dto/response/industry-role-response.dto';
import { IndustryRoleRequestDTO } from '@dto/request/industry-role.request.dto';

interface IndustryRoleState {
  industryroles: IndustryRoleResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: IndustryRoleState = {
  industryroles: [],
  loading: false,
  error: null,
};

// Create the slice
const industryroleSlice = createSlice({
  name: 'industryroles',
  initialState,
  reducers: {},
});

export const selectIndustryRoles = (state: RootState) => state.industryroles;
export default industryroleSlice.reducer;

export const industryrolesApiSlice = createApi({
  reducerPath: 'industry-roles-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchIndustryRoles: builder.query<IndustryRoleResponseDTO[], string>({
      query: (domainId) => ({
        url: `/industries/${domainId}/roles`,
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

    addIndustryRole: builder.mutation<IndustryRoleResponseDTO,{ domainId: string; newIndustryRole: IndustryRoleRequestDTO }
        >({
          query: ({ domainId, newIndustryRole }) => ({
            url: `/industries/${domainId}/roles`,
            method: 'POST',
            body: newIndustryRole,
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Industry Role Added Successfully!');
          },
        }),
    
        updateIndustryRole: builder.mutation<
          IndustryRoleResponseDTO,
          { domainId: string; id: string; data: IndustryRoleRequestDTO }
        >({
          query: ({ domainId, id, data }) => ({
            url: `/industries/${domainId}/roles/${id}`,
            method: 'PUT',
            body: data,
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Industry Role Updated Successfully!');
          },
        }),
    
        deleteIndustryRole: builder.mutation<boolean, { domainId: string; id: string }>({
          query: ({ domainId, id }) => ({
            url: `/industries/${domainId}/roles/${id}`,
            method: 'DELETE',
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Industry Role Deleted Successfully!');
          },
        }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchIndustryRolesQuery, useAddIndustryRoleMutation, useUpdateIndustryRoleMutation, useDeleteIndustryRoleMutation } = industryrolesApiSlice;
