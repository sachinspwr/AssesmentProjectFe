import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { ArticleResponseDTO } from '@dto/response/article.response.dto';
import { handleQueryResponse } from 'api/api.error';
import { ArticleRequestDTO } from '@dto/request/article-request.dto';

export const articlesApiSlice = createApi({
  reducerPath: 'articles-api',
  baseQuery: axiosBaseQuery,
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    // Existing fetch all articles (unfiltered)
    fetchArticles: builder.query<ArticleResponseDTO[], void>({
      query: () => ({
        url: '/articles',
        method: 'GET',
      }),
      providesTags: ['Articles'],
    }),

    // New: fetch by optional title (like support doc)
    getArticlesByTitle: builder.query<ArticleResponseDTO[], string | undefined>({
      query: (title) => ({
        url: `/articles${title ? `?title=${encodeURIComponent(title)}` : ''}`,
        method: 'GET',
      }),
      onQueryStarted: handleQueryResponse,
      providesTags: ['Articles'],
    }),

    // New: create article
    createArticle: builder.mutation<ArticleResponseDTO, ArticleRequestDTO>({
      query: (newArticle) => ({
        url: `/articles`,
        method: 'POST',
        body: newArticle,
      }),
      onQueryStarted: handleQueryResponse,
      invalidatesTags: ['Articles'],
    }),

    // New: update article
    updateArticle: builder.mutation<ArticleResponseDTO, { id: string; updatedArticle: Partial<ArticleRequestDTO> }>({
      query: ({ id, updatedArticle }) => ({
        url: `/articles/${id}`,
        method: 'PUT',
        body: updatedArticle,
      }),
      onQueryStarted: handleQueryResponse,
      invalidatesTags: (_res, _err, { id }) => [{ type: 'Articles', id }],
    }),

    // New: delete article
    deleteArticle: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: handleQueryResponse,
      invalidatesTags: (_res, _err, id) => [{ type: 'Articles', id }],
    }),

    // New: publish article
    publishArticle: builder.mutation<ArticleResponseDTO, string>({
      query: (articleId) => ({
        url: `/articles/${articleId}/publish`,
        method: 'POST',
      }),
      onQueryStarted: handleQueryResponse,
      invalidatesTags: (_res, _err, id) => [{ type: 'Articles', id }],
    }),

  }),
});

export const {
  useFetchArticlesQuery,
  useGetArticlesByTitleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  usePublishArticleMutation,
} = articlesApiSlice;
