import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { SupportDocResponseDTO, SupportSubDocDTO } from '@dto/response/support-doc-response.dto';
import { SupportDocRequestDTO } from '@dto/request/support-doc-request.dto';
import { SupportSubDocRequestDTO } from '@dto/request/support-sub-doc-request.dto';

interface SupportDocState {
  supportdoc: SupportDocResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: SupportDocState = {
  supportdoc: [],
  loading: false,
  error: null,
};

const supportDocSlice = createSlice({
  name: 'supportDoc',
  initialState,
  reducers: {},
});

export const selectSupportDoc = (state: RootState) => state.supportDoc;
export default supportDocSlice.reducer;

export const supportDocApiSlice = createApi({
  reducerPath: 'support-doc-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getSupportDocByTitle: builder.query<SupportDocResponseDTO[], string | undefined>({
      query: (title) => ({
        url: `/support-docs?title=${title ? encodeURIComponent(title) : ''}`,
        method: 'GET',
      }),
      onQueryStarted: handleQueryResponse
    }),

    createSupportDoc: builder.mutation<SupportDocResponseDTO, SupportDocRequestDTO>({
      query: (newDoc) => ({
        url: `/support-docs`,
        method: 'POST',
        body: newDoc,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    updateSupportDoc: builder.mutation<SupportDocResponseDTO, { id: string; updatedDoc: Partial<SupportDocRequestDTO> }>({
      query: ({ id, updatedDoc }) => ({
        url: `/support-docs/${id}`,
        method: 'PUT',
        body: updatedDoc,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    deleteSupportDoc: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/support-docs/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: handleQueryResponse,
    }),

    getSubDocBySlug: builder.query<SupportSubDocDTO, { parentSlug: string; subSlug: string }>({
      query: ({ parentSlug, subSlug }) => ({
        url: `/support-docs/slug/${parentSlug}/sub-doc/${subSlug}`,
        method: 'GET',
      }),
      onQueryStarted: handleQueryResponse,
    }),

    createSupportSubDoc: builder.mutation<SupportDocResponseDTO, { supportDocId: string; newSubDoc: SupportSubDocRequestDTO }>({
      query: ({ supportDocId, newSubDoc }) => ({
        url: `/support-docs/${supportDocId}/sub-doc`,
        method: 'POST',
        body: newSubDoc,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    updateSupportSubDoc: builder.mutation<SupportDocResponseDTO, { supportDocId: string; subDocId: string; updatedSubDoc: Partial<SupportSubDocRequestDTO> }>({
      query: ({ supportDocId, subDocId, updatedSubDoc }) => ({
        url: `/support-docs/${supportDocId}/sub-doc/${subDocId}`,
        method: 'PUT',
        body: updatedSubDoc,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    deleteSupportSubDoc: builder.mutation<void, { supportDocId: string; subDocId: string }>({
      query: ({ supportDocId, subDocId }) => ({
        url: `/support-docs/${supportDocId}/sub-doc/${subDocId}`,
        method: 'DELETE',
      }),
      onQueryStarted: handleQueryResponse,
    }),

    publishSupportDoc: builder.mutation<SupportDocResponseDTO, string>({
      query: (supportDocId) => ({
        url: `/support-docs/${supportDocId}/publish`,
        method: 'POST',
      }),
      onQueryStarted: handleQueryResponse,
    }),

  }),
});

export const {
  useGetSupportDocByTitleQuery,
  useCreateSupportDocMutation,
  useUpdateSupportDocMutation,
  useDeleteSupportDocMutation,
  useGetSubDocBySlugQuery,
  useCreateSupportSubDocMutation,
  useUpdateSupportSubDocMutation,
  useDeleteSupportSubDocMutation,
  usePublishSupportDocMutation,
} = supportDocApiSlice;
