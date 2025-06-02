import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { SubscriptionPaymentOrdersRequestDTO } from '@dto/request/payment-request.dto';
import { SubscriptionPaymentOrdersResponseDTO } from '@dto/response/payment-response.dto';
import { PAYMENTS_TAG, PaymentTag, SubscriptionTag, USER_SUBSCRIPTION_TAG } from '@utils/constants';

const createPaymentTag = (id?: string | number): PaymentTag => ({
  type: PAYMENTS_TAG,
  id,
});

export const paymentsApiSlice = createApi({
  reducerPath: 'payments-api',
  tagTypes: [PAYMENTS_TAG, USER_SUBSCRIPTION_TAG],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createUserSubscriptionOrderPayment: builder.mutation<
      SubscriptionPaymentOrdersResponseDTO,
      SubscriptionPaymentOrdersRequestDTO
    >({
      query: (paymentData) => ({
        url: '/subscription-orders',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: [
        createPaymentTag(),
        { type: USER_SUBSCRIPTION_TAG, id: 'LIST' },
      ],
      onQueryStarted: handleQueryResponse,
    }),

    getUserSubscriptionOrderPayments: builder.query<SubscriptionPaymentOrdersResponseDTO[], void>({
      query: () => ({
        url: '/subscription-orders/',
        method: 'GET',
      }),
      providesTags: (result): readonly PaymentTag[] =>
        result
          ? [
              ...result.map(({ id }) => createPaymentTag(id)),
              createPaymentTag('LIST'),
            ]
          : [createPaymentTag('LIST')],
      onQueryStarted: handleQueryResponse,
    }),

    getUserSubscriptionOrderPaymentById: builder.query<SubscriptionPaymentOrdersResponseDTO, string>({
      query: (id) => ({
        url: `/subscription-orders/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id): readonly PaymentTag[] => [
        createPaymentTag(id),
      ],
      onQueryStarted: handleQueryResponse,
    }),

    updateUserSubscriptionOrderPayment: builder.mutation<
      SubscriptionPaymentOrdersResponseDTO,
      { orderId: string; data: Partial<SubscriptionPaymentOrdersRequestDTO> }
    >({
      query: ({  data }) => ({
        url: `/subscription-orders`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }): readonly (PaymentTag | SubscriptionTag)[] => [
        createPaymentTag(orderId),
        { type: USER_SUBSCRIPTION_TAG, id: 'LIST' },
        { type: USER_SUBSCRIPTION_TAG, id: 'ORDERS' },
      ],
      onQueryStarted: handleQueryResponse,
    }),
  }),
});

export const {
  useCreateUserSubscriptionOrderPaymentMutation,
  useGetUserSubscriptionOrderPaymentsQuery,
  useGetUserSubscriptionOrderPaymentByIdQuery,
  useUpdateUserSubscriptionOrderPaymentMutation,
} = paymentsApiSlice;