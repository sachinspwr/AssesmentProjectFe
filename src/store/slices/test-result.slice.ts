
import { TestResponseObjDTO, TestResultResponseDTO } from '@dto/response';
import { createApi } from '@reduxjs/toolkit/query/react';
import { handleApiError } from 'api/api.error';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';

export const testResultApiSlice = createApi({
  reducerPath: 'test-result-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({ 
    //get breif result //getDetailedResult
    fetchBriefResult: builder.query<TestResponseObjDTO[], {testId:string; participantId:string}>({
      query: ({testId,participantId}) => ({ url: `/tests/${testId}/results/participants/${participantId}`, method: 'GET' }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err) {
          toast.error(handleApiError(err));
          throw err;
        }
      },
    }),
    
    getDetailedResult: builder.query<TestResultResponseDTO, {testId:string; resultId:string}>({
        query: ({testId,resultId}) => ({ url: `/tests/${testId}/results/${resultId}`, method: 'GET' }),
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
    useFetchBriefResultQuery,
    useGetDetailedResultQuery
}=testResultApiSlice;