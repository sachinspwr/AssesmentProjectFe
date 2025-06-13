import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { QuestionResponseDTO } from '../../dto/response/question-response.dto';
import { axiosBaseQuery } from 'api/base.query';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { QuestionRequestDTO } from '@dto/request/question-request.dto';
import { PaginatedResponse } from '@dto/response/pagination-response.dto';
import { SearchRequestDTO } from '@dto/request';
import toast from 'react-hot-toast';

interface QuestionsState {
  questions: QuestionResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  loading: false,
  error: null,
};

// Create the slice
const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
});

export const selectQuestions = (state: RootState) => state.questions;
export default questionsSlice.reducer;

export const questionsApiSlice = createApi({
  reducerPath: 'questions-api',
  tagTypes: ['Questions'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchQuestions: builder.query<
      PaginatedResponse<QuestionResponseDTO>,
      { scope: 'all' | 'public' | 'personal'; limit?: number; viewMode?: number }
    >({
      query: ({ scope, limit, page }) => {
        const params = new URLSearchParams();
        if (scope !== 'all') params.append('isPublic', String(scope === 'public'));
        if (limit) params.append('limit', String(limit));
        if (page) params.append('page', String(page));

        return {
          url: `/questions?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data?.length
          ? [...result.data.map(({ id }) => ({ type: 'Questions' as const, id })), { type: 'Questions', id: 'LIST' }]
          : [{ type: 'Questions', id: 'LIST' }],
      onQueryStarted: handleQueryResponse,
    }),

    fetchQuestionById: builder.query<QuestionResponseDTO, string>({
      query: (id) => ({
        url: `/questions/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Questions', id }],
      onQueryStarted: handleQueryResponse,
    }),

    searchQuestion: builder.mutation<PaginatedResponse<QuestionResponseDTO>, SearchRequestDTO<QuestionRequestDTO>>({
      query: (searchCriteria) => ({
        url: '/questions/search',
        method: 'POST',
        body: searchCriteria,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    createQuestion: builder.mutation<QuestionResponseDTO, QuestionRequestDTO>({
      query: (newQuestion) => ({
        url: '/questions',
        method: 'POST',
        body: newQuestion,
      }),
      invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
      onQueryStarted: async (_, { queryFulfilled }) => {
        await handleQueryResponse(_, { queryFulfilled }, 'Question Created Successfully!');
      },
    }),

    updateQuestion: builder.mutation<QuestionResponseDTO, { id: string; data: QuestionRequestDTO }>({
      query: ({ id, data }) => ({
        url: `/questions/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Questions', id }],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Question Updated Successfully!');
      },
    }),

    deleteQuestion: builder.mutation<boolean, { id: string }>({
      query: ({ id }) => ({
        url: `/questions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Questions', id }],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Question Deleted Successfully!');
      },
    }),
    uploadBulkQuestions: builder.mutation<QuestionResponseDTO[], QuestionRequestDTO[]>({
      query: (questions) => ({
        url: '/questions/Bulk',
        method: 'POST',
        body: questions,
      }),
      invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Bulk Questions Uploaded Successfully!');
      },
    }),

    fetchQuestionsByStatus: builder.query<PaginatedResponse<QuestionResponseDTO>, { status: string }>({
      query: ({ status }) => {
        return {
          url: `/questions/status?status=${status}`,
          method: 'GET',
        };
      },
      providesTags: (result) =>
        result?.data?.length
          ? [...result.data.map(({ id }) => ({ type: 'Questions' as const, id })), { type: 'Questions', id: 'LIST' }]
          : [{ type: 'Questions', id: 'LIST' }],
      onQueryStarted: handleQueryResponse,
    }),

    publishQuestion: builder.mutation<QuestionResponseDTO, string>({
      query: (id) => ({
        url: `/questions/${id}/approve`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Questions', id }],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Question Published Successfully!');
      },
    }),

    approveQuestion: builder.mutation<QuestionResponseDTO, string>({
      query: (questionId) => ({
        url: `/questions/${questionId}/approve`,
        method: 'POST',
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Question Approved Successfully!');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),

    rejectQuestion: builder.mutation<QuestionResponseDTO, { questionId: string; comment: string }>({
      query: ({ questionId, comment }) => ({
        url: `/questions/${questionId}/reject`,
        method: 'POST',
        body: { comment },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          toast.success('Question Rejected with Reason!');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components

export const {
  useFetchQuestionsQuery,
  useFetchQuestionByIdQuery,
  useSearchQuestionMutation,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useUploadBulkQuestionsMutation,
  useFetchQuestionsByStatusQuery,
  usePublishQuestionMutation,
  useApproveQuestionMutation,
  useRejectQuestionMutation,
} = questionsApiSlice;
