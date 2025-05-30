import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { UserSubscriptionResponseDTO } from '@dto/response/user-subscription-response.dto';
import { UserSubscriptionOrderResponseDTO } from '@dto/response/user-subscription-order.response.dto';
import { SubscriptionTag, USER_SUBSCRIPTION_TAG } from '@utils/constants';
import { InvoiceResponseDTO } from '@dto/response/invoice-response.dto';
import { handleQueryResponse } from 'api/api.error';

const createSubscriptionTag = (id: string | number): SubscriptionTag => ({
  type: USER_SUBSCRIPTION_TAG,
  id,
});

export const userSubscriptionApiSlice = createApi({
  reducerPath: 'user-subscriptions-api',
  tagTypes: [USER_SUBSCRIPTION_TAG],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchUserSubscriptions: builder.query<UserSubscriptionResponseDTO[], string>({
      query: (accountId) => ({
        url: `/accounts/${accountId}/subscriptions`,
        method: 'GET',
      }),
      providesTags: (result): readonly SubscriptionTag[] =>
        result
          ? [
            ...result.map(({ id }) => createSubscriptionTag(id)),
            createSubscriptionTag('LIST'),
          ]
          : [createSubscriptionTag('LIST')],
    }),

    fetchUserSubscriptionOrders: builder.query<UserSubscriptionOrderResponseDTO[], string>({
      query: (accountId) => ({
        url: `/accounts/${accountId}/subscriptions/orders`,
        method: 'GET',
      }),
      providesTags: (result): readonly SubscriptionTag[] =>
        result
          ? [
            ...result.map(({ id }) => createSubscriptionTag(id)),
            createSubscriptionTag('ORDERS'),
          ]
          : [createSubscriptionTag('ORDERS')],
    }),

    fetchUserSubscriptionInvoice: builder.query<InvoiceResponseDTO, {
      accountId: string;
      userSubscriptionId: string;
    }>({
      query: ({ accountId, userSubscriptionId }) => ({
        url: `/accounts/${accountId}/subscriptions/${userSubscriptionId}/invoice`,
        method: 'GET',
      }),
      onQueryStarted: handleQueryResponse,
    }),
  }),
});

export const {
  useFetchUserSubscriptionsQuery,
  useFetchUserSubscriptionOrdersQuery,
  useFetchUserSubscriptionInvoiceQuery,
} = userSubscriptionApiSlice;