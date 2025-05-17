import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { CodeEvaluationRequestDTO } from '@dto/request/code-evaluation-request.dto';
import { CodeEvaluationResponseDTO } from '@dto/response/code-evaluation-response.dto';

interface CodeEvaluationState {
    evaluationResult: CodeEvaluationResponseDTO | null;
}

const initialState: CodeEvaluationState = {
    evaluationResult: null,
};

const codeEvaluationSlice = createSlice({
    name: 'codeEvaluation',
    initialState,
    reducers: {
        clearEvaluationResult: (state) => {
            state.evaluationResult = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            codeEvaluationApiSlice.endpoints.evaluateCode.matchFulfilled,
            (state, { payload }) => {
                state.evaluationResult = payload;
            }
        );
    },
});

export const selectCodeEvaluation = (state: RootState) => state.codeEvaluation;
export const { clearEvaluationResult } = codeEvaluationSlice.actions;
export default codeEvaluationSlice.reducer;

export const codeEvaluationApiSlice = createApi({
    reducerPath: 'code-evaluation-api',
    baseQuery: axiosBaseQuery,
    endpoints: (builder) => ({
        evaluateCode: builder.mutation<CodeEvaluationResponseDTO, CodeEvaluationRequestDTO>({
            query: (evaluationData) => ({
                url: '/code-evaluation',
                method: 'POST',
                body: evaluationData,
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

export const { useEvaluateCodeMutation } = codeEvaluationApiSlice;