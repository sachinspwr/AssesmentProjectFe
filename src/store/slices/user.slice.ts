import { UserRequestDTO } from '../../dto/request/user-request.dto';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { RootState } from 'store/store';
import { createSlice } from '@reduxjs/toolkit';
import { handleQueryResponse } from 'api/api.error';

interface BulkUserResponse {
  createdRecords: number;
  existingRecords: string[];
}

interface UsersState {
  users: UserRequestDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;

export const usersApiSlice = createApi({
  reducerPath: 'users-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createBulkUsers: builder.mutation<BulkUserResponse, UserRequestDTO[]>({
      query: (users) => ({
        url: '/users/createBulk',
        method: 'POST',
        body: users,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Bulk Users Uploaded Successfully!');
      },
    }),

    getAllUsers: builder.query<UserRequestDTO[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      onQueryStarted: handleQueryResponse,
    }),

  }),
});

export const {
  useCreateBulkUsersMutation,
  useGetAllUsersQuery,
} = usersApiSlice;
