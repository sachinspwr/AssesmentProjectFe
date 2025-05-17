import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { handleQueryResponse } from 'api/api.error';
import { ActivityLogResponseDTO } from '@dto/response/activity-log-response.dto';

export const ticketLogsApiSlice = createApi({
    reducerPath: 'ticket-logs-api',
    tagTypes: ['TicketLogs'],
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        fetchTicketLogs: builder.query<ActivityLogResponseDTO[], string>({
            query: (ticketId) => ({
                url: `/tickets/${ticketId}/logs`,
                method: 'GET'
            }),
            providesTags: (result, error, ticketId) =>
                result?.length
                    ? [
                        ...result.map(({ id }) => ({ type: 'TicketLogs' as const, id })),
                        { type: 'TicketLogs', id: `TICKET-${ticketId}-LOGS` }
                    ]
                    : [{ type: 'TicketLogs', id: `TICKET-${ticketId}-LOGS` }],
            onQueryStarted: handleQueryResponse,
        }),
    }),
});

export const {
    useFetchTicketLogsQuery
} = ticketLogsApiSlice;