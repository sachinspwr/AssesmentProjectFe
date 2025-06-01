import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { RootState } from 'store/store';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { LinkRegistrationResponseDto } from '@dto/response/link-registration-response.dto';
import { LinkRegistrationRequestDto } from '@dto/request/link-registration-request.dto';
import toast from 'react-hot-toast';

interface LinkRegistrationState {
    linkRegistration: LinkRegistrationResponseDto | null;
    loading: boolean;
    error: string | null;
}

const initialState: LinkRegistrationState = {
    linkRegistration: null,
    loading: false,
    error: null,
};

const linkRegistrationSlice = createSlice({
    name: 'linkRegistration',
    initialState,
    reducers: {},
});

export const selectLinkRegistration = (state: RootState) => state.linkRegistration;
export default linkRegistrationSlice.reducer;

export const linkRegistrationApiSlice = createApi({
    reducerPath: 'link-registration-api',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        getLinkRegistration: builder.query<LinkRegistrationResponseDto, string>({
            query: (id) => ({
                url: `/link-registrations/${id}`,
                method: 'GET',
            }),
            onQueryStarted: async (arg, api) => {
                await handleQueryResponse(arg, api);
            },
        }),

        registerLink: builder.mutation<LinkRegistrationResponseDto, { token: string, data: LinkRegistrationRequestDto }>({
            query: ({ token, data }) => {
                return {
                    url: `/link-registrations`,
                    method: 'POST',
                    body: data,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

    }),
});

export const {
    useGetLinkRegistrationQuery,
    useRegisterLinkMutation,
} = linkRegistrationApiSlice;
