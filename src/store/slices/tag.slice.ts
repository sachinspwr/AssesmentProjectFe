import { TagResponseDto } from '@dto/response/tag.response.dto';
import { createApi } from '@reduxjs/toolkit/query/react';
import { handleQueryResponse } from 'api/api.error';
import { axiosBaseQuery } from 'api/base.query';

export const tagsApiSlice = createApi({
  reducerPath: 'tags-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    // Search for tags based on query string
    searchTags: builder.query<TagResponseDto[], string>({
      query: (q: string) => ({
        url: `/tags?q=${q}`,
        method: 'GET',
      }),
    }),

    // Create a new tag
    createTag: builder.mutation<TagResponseDto, { name: string }>({
      query: (newTag) => ({
        url: '/tags',
        method: 'POST',
        body: newTag,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Tag Added Successfully!');
      },
    }),

    // Update an existing tag
    updateTag: builder.mutation<TagResponseDto, { id: string; name: string }>({
      query: ({ id, name }) => ({
        url: `/tags/${id}`,
        method: 'PUT',
        data: { name },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const { useSearchTagsQuery, useCreateTagMutation, useUpdateTagMutation } = tagsApiSlice;
