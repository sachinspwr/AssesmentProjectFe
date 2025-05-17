import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { RequestDemoResponseDTO, TicketResponseDTO } from '@dto/response';
import { RequestDemoDTO, SearchRequestDTO, TicketRequestDTO } from '@dto/request';
import { ActivityLogResponseDTO } from '@dto/response/activity-log-response.dto';
import toast from 'react-hot-toast';
import { TicketSummaryResponseDTO } from '@dto/response/ticket-summary.response.dto';

export const ticketsApiSlice = createApi({
  reducerPath: 'tickets-api',
  tagTypes: ['Tickets', 'TicketLogs', 'TicketSummary'],
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchTicketSummary: builder.query<TicketSummaryResponseDTO, void>({
      query: () => ({ url: '/tickets/support-summary', method: 'GET' }),
      providesTags: (result) =>
        result?.recentTickets?.length
          ? [...result.recentTickets.map(({ id }) => ({ type: 'TicketSummary' as const, id })), { type: 'TicketSummary', id: 'LIST' }]
          : [{ type: 'TicketSummary', id: 'LIST' }],
    }),

    fetchTickets: builder.query<TicketResponseDTO[], void>({
      query: () => ({ url: '/tickets', method: 'GET' }),
      providesTags: (result) =>
        result?.length
          ? [...result.map(({ id }) => ({ type: 'Tickets' as const, id })), { type: 'Tickets', id: 'LIST' }]
          : [{ type: 'Tickets', id: 'LIST' }],
    }),

    fetchTicketById: builder.query<TicketResponseDTO, string>({
      query: (id) => ({ url: `/tickets/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Tickets', id }],
      onQueryStarted: handleQueryResponse,
    }),

    createTicket: builder.mutation<TicketResponseDTO, TicketRequestDTO>({
      query: (newTicket) => ({ url: '/tickets', method: 'POST', body: newTicket }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
      onQueryStarted: async (_, { queryFulfilled }) => {
        await handleQueryResponse(_, { queryFulfilled }, 'Ticket Created Successfully!');
      },
    }),

    updateTicket: builder.mutation<TicketResponseDTO, { id: string; data: TicketRequestDTO }>({
      query: ({ id, data }) => ({ url: `/tickets/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tickets', id }],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Ticket Updated Successfully!');
      },
    }),

    patchTicket: builder.mutation<TicketResponseDTO, { id: string; data: Pick<TicketRequestDTO, 'lastComment'> }>({
      query: ({ id, data }) => ({ url: `/tickets/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'TicketLogs', id: `TICKET-${id}-LOGS` }
      ],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Ticket Updated Successfully!');
      },
    }),

    deleteTicket: builder.mutation<void, string>({
      query: (id) => ({ url: `/tickets/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Tickets', id: 'LIST' }],
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Ticket Deleted Successfully!');
      },
    }),

    searchTicket: builder.mutation<TicketResponseDTO[], SearchRequestDTO<TicketRequestDTO>>({
      query: (searchCriteria) => ({
        url: '/questions/search',
        method: 'POST',
        body: searchCriteria,
      }),
      onQueryStarted: handleQueryResponse,
    }),

    fetchTicketLogs: builder.query<ActivityLogResponseDTO[], string>({
      query: (ticketId) => ({
        url: `/tickets/${ticketId}/logs`,
        method: 'GET',
      }),
      providesTags: (result, error, ticketId) =>
        result?.length
          ? [
            ...result.map(({ id }) => ({ type: 'TicketLogs' as const, id })),
            { type: 'TicketLogs', id: `TICKET-${ticketId}-LOGS` },
          ]
          : [{ type: 'TicketLogs', id: `TICKET-${ticketId}-LOGS` }],
      onQueryStarted: handleQueryResponse,
    }),
    contactUs: builder.mutation<RequestDemoResponseDTO, RequestDemoDTO>({
      query: (contactData) => ({
        url: '/request-demo',
        method: 'POST',
        body: contactData,
      }),
      onQueryStarted: async (arg, api) => {
        try {
          await handleQueryResponse(arg, api, 'Message Send Successfully!');
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
  }),
});

export const {
  useFetchTicketSummaryQuery,
  useFetchTicketsQuery,
  useFetchTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  usePatchTicketMutation,
  useDeleteTicketMutation,
  useSearchTicketMutation,
  useFetchTicketLogsQuery,
  useContactUsMutation,
} = ticketsApiSlice;
