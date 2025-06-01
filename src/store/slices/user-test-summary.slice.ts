import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { UserTestSummaryResponseDTO } from '@dto/response/user-test-summary.response.dto';

interface UserTestSummaryState {
  userTestSummary: UserTestSummaryResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: UserTestSummaryState = {
  userTestSummary: [],
  loading: false,
  error: null,
};

// Create the slice
const userTestSummarySlice = createSlice({
  name: 'userTestSummary',
  initialState,
  reducers: {},
});

export const selectUserTestSummary = (state: RootState) => state.userTestSummary;
export default userTestSummarySlice.reducer;

export const userTestSummaryApiSlice = createApi({
  reducerPath: 'user-test-summary-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getMyOwnResult: builder.query<UserTestSummaryResponseDTO[], void>({
      query: () => ({
        url: '/dashboard/test-summary',
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
export const { useGetMyOwnResultQuery } = userTestSummaryApiSlice;
