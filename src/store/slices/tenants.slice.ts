import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TenantsResponseDTO } from '@dto/response/tenants.response.dto';
import { TenantsRequestDTO } from '@dto/request/tenants.request.dto';
import { Tenant } from 'models/tenant/tenant.model';
import { BasicTenantDetailsRequestDTO } from '@dto/request/basic-tenant-details.dto';
import { UserRequestDTO } from '@dto/request';
import { UserResponseDTO } from '@dto/response';
import { PaginatedResponse } from '@dto/response/pagination-response.dto';

// **Initial State for Selected Test**
interface TenantState {
  selectedTenant: Tenant | null;
}

const initialState: TenantState = {
  selectedTenant: null,
};

const selectedTenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    // Action to set the selected test data
    setSelectedTenant: (state, action: PayloadAction<Tenant>) => {
      state.selectedTenant = action.payload;
    },
    // Action to clear the selected test data
    clearSelectedTenant: (state) => {
      state.selectedTenant = null;
    },
  },
});

export const selectSelectedTenant = (state: RootState) => state.tenant.selectedTenant;
export const { setSelectedTenant, clearSelectedTenant } = selectedTenantSlice.actions;
export default selectedTenantSlice.reducer;

export const tenantsApiSlice = createApi({
  reducerPath: 'tenants-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchTenants: builder.query<PaginatedResponse<TenantsResponseDTO>, void>({
      query: () => ({
        url: '/tenants',
        method: 'GET',
      }),
      // Optional: handle error with toast
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    getTenantById: builder.query<Tenant, string>({
      query: (tenantId) => ({
        url: `/tenants/${tenantId}`,
        method: 'GET',
      }),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedTenant(data));
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    createTenants: builder.mutation<TenantsResponseDTO, TenantsRequestDTO>({
      query: (tenantsData) => ({
        url: '/tenants',
        method: 'POST',
        body: tenantsData,
      }),
      onQueryStarted: async (tenantsData, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    patchBasicTenantDetail: builder.mutation<TenantsResponseDTO, { tenantId: string; tenantData: BasicTenantDetailsRequestDTO }>({
      query: ({ tenantId, tenantData }) => ({
        url: `/tenants/${tenantId}`,
        method: 'PUT',
        body: tenantData,
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

    // tenant users
    fetchTenantUsers: builder.query<UserResponseDTO[], string>({
      query: (tenantId) => ({
        url: `/tenants/${tenantId}/users`,
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

    createTenantUser: builder.mutation<UserResponseDTO, { tenantId: string; payload: UserRequestDTO }>({
      query: ({ tenantId, payload }) => ({
        url: `/tenants/${tenantId}/users`,
        method: 'POST',
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('User added successfully');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    updateTenantUser: builder.mutation<UserResponseDTO, {
      tenantId: string;
      userId: string;
      payload: UserRequestDTO
    }>({
      query: ({ tenantId, userId, payload }) => ({
        url: `/tenants/${tenantId}/users/${userId}`,
        method: 'PUT', // or 'PATCH' depending on your API requirements
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('User updated successfully');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    deleteTenantUser: builder.mutation<void, { tenantId: string; userId: string; }>({
      query: ({ tenantId, userId }) => ({
        url: `/tenants/${tenantId}/users/${userId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('User deleted successfully');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    importTenantUsers: builder.mutation<UserResponseDTO, { tenantId: string; payload: UserRequestDTO }>({
      query: ({ tenantId, payload }) => ({
        url: `/tenants/${tenantId}/users`,
        method: 'POST',
        body: payload,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('User added successfully');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),


  }),
});

// Export hooks for usage in functional components
export const {
  useFetchTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantsMutation,
  usePatchBasicTenantDetailMutation,
  useFetchTenantUsersQuery,
  useCreateTenantUserMutation,
  useUpdateTenantUserMutation,
  useDeleteTenantUserMutation,
  useImportTenantUsersMutation,
} = tenantsApiSlice;
