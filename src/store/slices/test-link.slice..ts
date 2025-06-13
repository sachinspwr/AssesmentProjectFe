/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { TestLinkType } from '@utils/enums/test-link-type.enums';
import { CreateTestLinkRequestDTO } from '@dto/request/genrate-link.request.dto';
import { CreateTestLinkResponseDTO } from '@dto/response/genrate-link.response.dto';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { TestInvitationResponseDto } from '@dto/response/test-invite-response.dto';
import { handleQueryResponse } from 'api/api.error';

export const testLinkApiSlice = createApi({
  reducerPath: 'test-link-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getTestLinksByType: builder.query<GetTestInvitationResponseDTO[], { testId: string; type: TestLinkType }>({
      query: ({ testId, type }) => ({
        url: `/tests/${testId}/links`,
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

    getInvitationRecipients: builder.query<
      TestInvitationResponseDto,
      {
        testId: string;
        linkId: string;
      }
    >({
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
    deactivateTestLink: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/links/${id}/deactivate`,
        method: 'PATCH',
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
  useDeactivateTestLinkMutation,
} = testLinkApiSlice;
