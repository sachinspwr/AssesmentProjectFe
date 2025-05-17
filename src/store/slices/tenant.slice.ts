import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TenantResponseDTO } from '@dto/response/tenant.response.dto';

interface TenantState {
  tenants: TenantResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantState = {
  tenants: [],
  loading: false,
  error: null,
};

// Create the slice
const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {},
});

export const selectRoles = (state: RootState) => state.tenants;
export default tenantsSlice.reducer;

export const tenantsApiSlice = createApi({
  reducerPath: 'tenants-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchTenants: builder.query<TenantResponseDTO[], void>({
      query: () => ({
        url: `/tenants`,
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
export const { useFetchTenantsQuery } = tenantsApiSlice;
