import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { PermissionResponseDTO } from '@dto/response/permission.response.dto';

interface PermissionsState {
  permissions: PermissionResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: PermissionsState = {
  permissions: [],
  loading: false,
  error: null,
};

// Create the slice
const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
});

export const selectPermissions = (state: RootState) => state.permissions;
export default permissionsSlice.reducer;

export const permissionsApiSlice = createApi({
  reducerPath: 'permissions-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchPermissions: builder.query<PermissionResponseDTO[], void>({
      query: () => ({
        url: `/permissions`,
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
  }),
});

// Export hooks for usage in functional components
export const { useFetchPermissionsQuery } = permissionsApiSlice;
