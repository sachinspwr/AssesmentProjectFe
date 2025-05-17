import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from 'dto/response/login.response.dto';
import { axiosBaseQuery } from 'api/base.query';
import { CredentialDTO } from '@dto/request';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';

export const authApiSlice = createApi({
  reducerPath: 'auth-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    signIn: builder.mutation<LoginResponse, CredentialDTO>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (credentials, { queryFulfilled }) => {
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

export const { useSignInMutation } = authApiSlice;
