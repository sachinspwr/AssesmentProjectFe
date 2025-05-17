import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError, handleQueryResponse } from 'api/api.error';
import { RegistrationFieldsResponseDTO } from '@dto/response/registration-fields.response.dto';
import { RegistationFieldsRequestDTO } from '@dto/request/registrartion-fields.request.dto';
import { RegistrationFieldsRequestDTO } from '@dto/request/registration-field-option.request.dto';

interface RegistrationFieldsState {
  fields: RegistrationFieldsResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationFieldsState = {
  fields: [],
  loading: false,
  error: null,
};

// Create the slice
const registrationFieldsSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {},
});

export const selectRegistrationFields = (state: RootState) => state.fields;
export default registrationFieldsSlice.reducer;

export const registrationFieldsApiSlice = createApi({
  reducerPath: 'registration-fields-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchRegistrationFields: builder.query<RegistrationFieldsResponseDTO[], RegistationFieldsRequestDTO>({
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

    addRegistrationField: builder.mutation<RegistrationFieldsResponseDTO, RegistrationFieldsRequestDTO>({
      query: (newTestRegistrtionField) => ({
        url: `/registration-fields`,
        method: 'POST',
        body: newTestRegistrtionField,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Registration Field Added Successfully!');
      },
    }),

    updateRegistrationField: builder.mutation<
      RegistrationFieldsResponseDTO,
      { id: string; data: RegistationFieldsRequestDTO }
    >({
      query: ({ id, data }) => ({
        url: `/registration-fields/${id}`,
        method: 'PUT',
        body: data,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Registration Field Updated Successfully!');
      },
    }),

    deleteRegistrationField: builder.mutation<boolean, { id: string }>({
      query: ({ id }) => ({
        url: `/registration-fields/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Registration Field Deleted Successfully!');
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchRegistrationFieldsQuery,
  useDeleteRegistrationFieldMutation,
  useAddRegistrationFieldMutation,
  useUpdateRegistrationFieldMutation,
} = registrationFieldsApiSlice;
