import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import { RootState } from 'store/store';
import { createSlice } from '@reduxjs/toolkit';
import { handleQueryResponse } from 'api/api.error';
import { EmailAssignmentRuleRequestDTO } from '@dto/request/email-assignment-rule.request.dto';
import { EmailAssignmentRuleResponseDTO } from '@dto/response/email-assignment-rule.response.dto';

interface EmailAssignmentRuleState {
  rules: EmailAssignmentRuleRequestDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: EmailAssignmentRuleState = {
  rules: [],
  loading: false,
  error: null,
};

const emailAssignmentRuleSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {},
});

export const selectUsers = (state: RootState) => state.rules;
export default emailAssignmentRuleSlice.reducer;

export const emailAssignmentRuleApiSlice = createApi({
  reducerPath: 'email-assignment-rules-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    createEmailAssignmentRule: builder.mutation<EmailAssignmentRuleResponseDTO,{ rulesData: EmailAssignmentRuleRequestDTO}>({
      query: ({rulesData}) => ({
        url: '/email-assignment-rules',
        method: 'POST',
        body: rulesData,
      }),
      onQueryStarted: async (arg, api) => {
        await handleQueryResponse(arg, api, 'Email Assignmnent Rule Created Successfully!');
      },
    }),

    getAllEmailAssignmentRules: builder.query<EmailAssignmentRuleResponseDTO[], void>({
      query: () => ({
        url: '/email-assignment-rules',
        method: 'GET',
      }),
      onQueryStarted: handleQueryResponse,
    }),

    getEmailAssignmentRuleById: builder.query<EmailAssignmentRuleResponseDTO, string>({
          query: (id) => ({
            url: `/email-assignment-rules/${id}`,
            method: 'GET',
          }),
          onQueryStarted: handleQueryResponse,
        }),

    updateEmailAssignmentRule: builder.mutation<EmailAssignmentRuleResponseDTO, { id: string; data: EmailAssignmentRuleRequestDTO }>({
          query: ({ id, data }) => ({
            url: `/email-assignment-rules/${id}`,
            method: 'PUT',
            body: data,
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Email Assignment Rule Updated Successfully!');
          },
        }),
    
        deleteEmailAssignmentRule: builder.mutation<boolean, { id: string }>({
          query: ({ id }) => ({
            url: `/email-assignment-rules/${id}`,
            method: 'DELETE',
          }),
          onQueryStarted: async (arg, api) => {
            await handleQueryResponse(arg, api, 'Email Assignment Rule Deleted Successfully!');
          },
        }),

  }),
});

export const {
  useCreateEmailAssignmentRuleMutation,
  useGetAllEmailAssignmentRulesQuery,
  useDeleteEmailAssignmentRuleMutation,
  useGetEmailAssignmentRuleByIdQuery,
  useUpdateEmailAssignmentRuleMutation
  
} = emailAssignmentRuleApiSlice;
