import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { CredentialDTO, UserRequestDTO } from '@dto/request';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { ApiResponse, UserResponseDTO } from '@dto/response';
import { ResetPasswordRequestDTO } from '@dto/request/reset-password-request.dto';
import { User, UserSubscription } from 'models';
import { ChangePasswordDTO } from '@dto/request/change-password-request.dto';

interface AccountState {
  isAuthenticated: boolean;
  user: Partial<User> | null;
}

const initialState: AccountState = {
  isAuthenticated: false,
  user: null,
};

// Create the slice
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (state, action: PayloadAction<Partial<User> | null>) => {
      state.user = action.payload;
    },
    setUserSubscriptions(state, action: PayloadAction<UserSubscription[]>) {
      if (state.user) {
        state.user = {
          ...state.user,
          subscriptions: action.payload
        };
      }
    },
  }
});

export const selectAccount = (state: RootState) => state.account;
export const selectCurrentUser = (state: RootState) => state.account.user;
export const selectIsAuthenticated = (state: RootState) => state.account.isAuthenticated;
export const { setUser, setUserSubscriptions } = accountSlice.actions;
export default accountSlice.reducer;

export const accountApiSlice = createApi({
  reducerPath: 'account-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<ApiResponse, UserRequestDTO>({
      query: (userData) => ({
        url: '/account/sign-up',
        method: 'POST',
        body: userData,
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
    forgotPassword: builder.mutation<ApiResponse, CredentialDTO>({
      query: (credentials) => ({
        url: '/account/forgot-password',
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
    resetPassword: builder.mutation<ApiResponse, ResetPasswordRequestDTO>({
      query: (resetPasswordReq) => ({
        url: '/account/reset-password',
        method: 'POST',
        body: resetPasswordReq,
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
    verifyAccount: builder.mutation<ApiResponse, { verifyAccountToken: string }>({
      query: (token) => ({
        url: '/account/verify-account',
        method: 'POST',
        body: token,
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

    changePassword: builder.mutation<ApiResponse, ChangePasswordDTO>({
      query: (passwords) => ({
        url: '/account/change-password',
        method: 'POST',
        body: passwords,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Password changed successfully');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    deactivateUser: builder.mutation<ApiResponse, string>({
      query: (password) => ({
        url: `/account/deactive`,
        method: 'POST',
        body: { password },
      }),
      onQueryStarted: async (password, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Account Deleted successfully');
          dispatch(setUser(null)); // Clear user from state after deactivation
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    updateUser: builder.mutation<ApiResponse, { userId: string; userData: Partial<UserRequestDTO> }>({
      query: ({ userId, userData }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: userData,
      }),
      onQueryStarted: async ({ userId, userData }, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    loadProfile: builder.query<UserResponseDTO, string>({
      query: () => ({
        url: `/account/me`,
        method: 'GET'
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

export const {
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyAccountMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
  useDeactivateUserMutation,
} = accountApiSlice;
