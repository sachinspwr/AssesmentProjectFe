import { UserRequestDTO } from '../../dto/request/user-request.dto';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { UserResponseDTO } from '@dto/response';

export const testGuestsApiSlice = createApi({
  reducerPath: 'testGuests-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createAnonymousUsers: builder.mutation<UserResponseDTO, UserRequestDTO>({
      query: (testGuest) => ({
        url: '/anonymous-user',
        method: 'POST',
        body: testGuest,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api);
      },
    }),
  }),
});

export const { useCreateAnonymousUsersMutation } = testGuestsApiSlice;
