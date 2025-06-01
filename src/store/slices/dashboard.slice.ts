import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { GuestInviterSummaryResponseDTO } from '@dto/response/guest-inviter-summury.response.dto';

interface DashboardState {
  guests: GuestInviterSummaryResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  guests: [],
  loading: false,
  error: null,
};

// Create the slice
const dashboardSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {},
});

export const selectGuests = (state: RootState) => state.guests;
export default dashboardSlice.reducer;

export const dashboardApiSlice = createApi({
  reducerPath: 'dashboard-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getMyResult: builder.query<GuestInviterSummaryResponseDTO[], void>({
      query: () => ({
        url: '/dashboard/invited-users/results',
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
export const { useGetMyResultQuery } = dashboardApiSlice;
