import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { TestRegistrationFieldOptionResponseDTO } from '@dto/response/registration-field-option-response.dto';

interface TestRegistrationFieldsOptionState {
    fields: TestRegistrationFieldOptionResponseDTO | null;
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: TestRegistrationFieldsOptionState = {
    fields: null,
    loading: false,
    error: null,
};

// Create the slice
const testRegistrationFieldsOptionSlice = createSlice({
    name: 'registrationFieldsOption',
    initialState,
    reducers: {},
});

export default testRegistrationFieldsOptionSlice.reducer;

// Create API slice for fetching registration fields
export const testRegistrationFieldsOptionApiSlice = createApi({
    reducerPath: 'registration-fields-option-api',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        fetchRegistrationFieldsOption: builder.query<TestRegistrationFieldOptionResponseDTO[], void>({
            query: () => ({
                url: '/registration-fields',
                method: 'GET',
            }),
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

export const { useFetchRegistrationFieldsOptionQuery } = testRegistrationFieldsOptionApiSlice;
