import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { FeatureManagerResponseDto } from '@dto/response/feature-manager-response.dto';
import { FeatureManagerRequestDto } from '@dto/request/feature-manager-request.dto';

interface FeatureToggleState {
    features: FeatureManagerResponseDto[];
    loading: boolean;
    error: string | null;
}

const initialState: FeatureToggleState = {
    features: [],
    loading: false,
    error: null,
};

const featureToggleSlice = createSlice({
    name: 'featureToggle',
    initialState,
    reducers: {},
});

export const selectFeatures = (state: RootState) => state.featureToggle;
export default featureToggleSlice.reducer;

export const featureManagerApiSlice = createApi({
    reducerPath: 'feature-manager-api',
    baseQuery: axiosBaseQuery,
    tagTypes: ['FeatureToggle'],
    endpoints: (builder) => ({
        // GET all features
        getAllFeatures: builder.query<FeatureManagerResponseDto[], void>({
            query: () => ({
                url: '/feature-manager',
                method: 'GET',
            }),
            providesTags: ['FeatureToggle'],
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (err) {
                    toast.error(handleApiError(err));
                    throw err;
                }
            },
        }),

        // PATCH toggle feature
        toggleFeature: builder.mutation<FeatureManagerResponseDto, FeatureManagerRequestDto>({
            query: (requestData) => ({
                url: '/feature-manager/toggle',
                method: 'PATCH',
                body: requestData,
            }),
            invalidatesTags: ['FeatureToggle'],
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
    useGetAllFeaturesQuery,
    useToggleFeatureMutation,
} = featureManagerApiSlice;