import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { MaintenanceResponseDTO } from '@dto/response/maintenance-response.dto';
import { MaintenanceRequestDTO } from '@dto/request/maintenance-request.dto';

interface SettingsState {
  data: MaintenanceResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  data: [],
  loading: false,
  error: null,
};

// Create the slice
const settingsSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {},
});

export const selectMaintenance = (state: RootState) => state.maintenance;
export default settingsSlice.reducer;

export const settingsApiSlice = createApi({
  reducerPath: 'maintenance-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    updateMaintenance: builder.mutation<MaintenanceResponseDTO, { data: MaintenanceRequestDTO }>({
      query: ({ data }) => ({
        url: `/system-settings/maintenance`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Maintenance Updated Successfully!');
      },
    }),

    getMaintenance: builder.query<MaintenanceResponseDTO, void>({
      query: () => ({
        url: `/system-settings/maintenance`,
        method: 'GET',
      }),
    }),
    
  }),
});

// Export hooks for usage in functional components

export const {
  useUpdateMaintenanceMutation,
  useGetMaintenanceQuery,
  useLazyGetMaintenanceQuery,
} = settingsApiSlice;
