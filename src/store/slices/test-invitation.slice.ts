import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { RootState } from 'store/store';
import { createSlice } from '@reduxjs/toolkit';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { TestInvitationResponseDTO } from '@dto/response/test-invitation.response.dto';
import { TestInvitationRequestDTO } from '@dto/request/test-invitation.request.dto';
import toast from 'react-hot-toast';

interface TestInvitationState {
  test_invitation: TestInvitationResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: TestInvitationState = {
  test_invitation: [],
  loading: false,
  error: null,
};

const TestInvitationSlice = createSlice({
  name: 'test_invitation',
  initialState,
  reducers: {},
});

export const selectTestInvitation = (state: RootState) => state.test_invitation;
export default TestInvitationSlice.reducer;

export const testInvitationApiSlice = createApi({
  reducerPath: 'test-invitation-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createTestInvitation: builder.mutation<TestInvitationResponseDTO, TestInvitationRequestDTO>({
      query: (testInvitationData) => ({
        url: '/invitations/personal',
        method: 'POST',
        body: testInvitationData,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Test Invitation Send Successfully!');
      },
    }),

    createTestInviteOnlyInvitation: builder.mutation<TestInvitationResponseDTO, TestInvitationRequestDTO>({
      query: (testInvitationData) => ({
        url: '/invitations/link',
        method: 'POST',
        body: testInvitationData,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Test Invitation Send Successfully!');
      },
    }),

    acceptInvitation: builder.mutation<{ message: string }, string>({
      query: (token) => ({
        url: '/invitations/accept',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

    rejectInvitation: builder.mutation<{ message: string }, { token: string; rejectionMessage: string }>({
      query: ({ token, rejectionMessage }) => ({
        url: '/invitations/reject',
        method: 'POST',
        body: {
          rejectionMessage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const {
  useCreateTestInvitationMutation,
  useCreateTestInviteOnlyInvitationMutation,
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} = testInvitationApiSlice;
