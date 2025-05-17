import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { SubscriptionResponseDTO } from '@dto/response/subscription-option-response.dto';

export const subscriptionsApiSlice = createApi({
  reducerPath: 'subscriptions-api',
  tagTypes: ['Subscriptions'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchAvailableSubscriptions: builder.query<SubscriptionResponseDTO[], void>({
      query: () => ({ url: '/subscriptions', method: 'GET' }),
      providesTags: (result) =>
        result?.length
          ? [...result.map(({ id }) => ({ type: 'Subscriptions' as const, id })), { type: 'Subscriptions', id: 'LIST' }]
          : [{ type: 'Subscriptions', id: 'LIST' }],
      onQueryStarted: handleQueryResponse,
    }),

  }),
});

export const {
  useFetchAvailableSubscriptionsQuery,
} = subscriptionsApiSlice;
