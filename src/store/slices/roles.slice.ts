import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { RolesResponseDTO } from '@dto/response/roles.response.dto';
import { RolesRequestDTO } from '@dto/request/roles.request.dto';

interface RolesState {
  roles: RolesResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

// Create the slice
const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
});

export const selectRoles = (state: RootState) => state.roles;
export default rolesSlice.reducer;

export const rolesApiSlice = createApi({
  reducerPath: 'roles-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchRoles: builder.query<RolesResponseDTO[], void>({
      query: () => ({
        url: `/roles`,
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

    fetchRoleById: builder.query<RolesResponseDTO, string>({
      query: (id) => ({
        url: `/roles/${id}`,
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


    addRoles: builder.mutation<RolesResponseDTO, { newRole: RolesRequestDTO }>({
      query: ({ newRole }) => ({
        url: `/roles`,
        method: 'POST',
        body: newRole,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Role Added Successfully!');
      },
    }),

    updateRole: builder.mutation<RolesResponseDTO, { id: string; data: RolesRequestDTO }
    >({
      query: ({ id, data }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Role Updated Successfully!');
      },
    }),

    deleteRole: builder.mutation<boolean, { id: string }>({
      query: ({ id }) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Role Deleted Successfully!');
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchRolesQuery,
  useAddRolesMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useFetchRoleByIdQuery
} = rolesApiSlice;

