import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { TestReviewResponseDTO, TestReviewSubmitResponseDTO } from '@dto/response/test-review.response.dto';
import { TestReviewRequestDTO, TestReviewSubmitRequestDTO } from '@dto/request/test-review.request.dto';

interface TestReviewState {
  test_reviews: TestReviewResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: TestReviewState = {
  test_reviews: [],
  loading: false,
  error: null,
};

// Create the slice
const testReviewsSlice = createSlice({
  name: 'test_reviews',
  initialState,
  reducers: {},
});

export const selectTestReviews = (state: RootState) => state.test_reviews;
export default testReviewsSlice.reducer;

export const testReviewsApiSlice = createApi({
  reducerPath: 'test_reviews',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    addTestReview: builder.mutation<TestReviewResponseDTO, { body: TestReviewRequestDTO }>({
      query: ({ body }) => ({
        url: `/tests/result-reviews/manual`,
        method: 'POST',
        body: body,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Review Added Successfully!');
      },
    }),

    submitTestReview: builder.mutation<TestReviewSubmitResponseDTO, { body: TestReviewSubmitRequestDTO }>({
      query: ({ body }) => ({
        url: `/tests/result-reviews/manual/submit`,
        method: 'POST',
        body: body,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Review Submitted Successfully!');
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useAddTestReviewMutation, useSubmitTestReviewMutation } =
testReviewsApiSlice;
