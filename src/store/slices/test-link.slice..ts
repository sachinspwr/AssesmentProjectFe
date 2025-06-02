import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { RootState } from 'store/store';
import { createSlice } from '@reduxjs/toolkit';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { TestInvitationResponseDTO } from '@dto/response/test-invitation.response.dto';
import { TestInvitationRequestDTO } from '@dto/request/test-invitation.request.dto';
import toast from 'react-hot-toast';
import { TestLinkType } from '@utils/enums/test-link-type.enums';
import { CreateTestLinkRequestDTO } from '@dto/request/genrate-link.request.dto';
import { CreateTestLinkResponseDTO } from '@dto/response/genrate-link.response.dto';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { TestInvitationResponseDto } from '@dto/response/test-invite-response.dto';

// interface TestInvitationState {
//   test_invitation: TestInvitationResponseDTO[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TestInvitationState = {
//   test_invitation: [],
//   loading: false,
//   error: null,
// };

// const TestLinkSlice = createSlice({
//   name: 'test_link',
//   initialState,
//   reducers: {},
// });

// export const selectTestInvitation = (state: RootState) => state.test_invitation;
// export default TestLinkSlice.reducer;

export const testLinkApiSlice = createApi({
  reducerPath: 'test-link-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getTestLinksByType: builder.query<GetTestInvitationResponseDTO[], TestLinkType>({
      query: (type) => ({
        url: `/links`,
        method: 'GET',
        params: { type },
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api);
      },
    }),

    getLinkRegistrations: builder.query<GetTestInvitationResponseDTO, string>({
      query: (linkId) => ({
        url: `/link-registrations/${linkId}`,
        method: 'GET',
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api);
      },
    }),

    getInvitationRecipients: builder.query<TestInvitationResponseDto, {
      testId: string;
      linkId: string
    }>({
      query: ({ testId, linkId }) => ({
        url: `/tests/${testId}/links/${linkId}/invitation-recipient`,
        method: 'GET',
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api);
      },
    }),


    createTestLink: builder.mutation<
      CreateTestLinkResponseDTO,
      {
        testId: string;
        linkType: TestLinkType;
        data: CreateTestLinkRequestDTO;
      }
    >({
      query: ({ testId, linkType, data }) => ({
        url: `/tests/${testId}/links/${linkType}`,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Test Link Created Successfully!');
      },
    }),
    patchTestLink: builder.mutation<any, { id: string; data: CreateTestLinkRequestDTO }>({
      query: ({ id, data }) => ({
        url: `/links/${id}`,
        method: 'PATCH',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Test Link Updated Successfully!');
      },
    }),
    deactivateTestLink: builder.mutation<any, { id: string; }>({
      query: ({ id, }) => ({
        url: `/links/${id}/deactivate`,
        method: 'PATCH'
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Test Link Deactivate Successfully!');
      },
    }),
  }),
});

export const {
  useGetTestLinksByTypeQuery,
  useGetLinkRegistrationsQuery,
  useGetInvitationRecipientsQuery,
  useCreateTestLinkMutation,
  usePatchTestLinkMutation,
  useDeactivateTestLinkMutation
} = testLinkApiSlice;
