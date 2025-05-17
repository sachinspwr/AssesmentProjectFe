import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'api/base.query';
import toast from 'react-hot-toast';
import { handleApiError } from 'api/api.error';
import { CategoryResponseDTO } from '@dto/response';


interface CategoryState {
  categories: CategoryResponseDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Create the slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const selectCategories = (state: RootState) => state.categories;
export default categorySlice.reducer;

export const categoriesApiSlice = createApi({
  reducerPath: 'categories-api',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchCategories: builder.query<CategoryResponseDTO[], string>({
      query: (categoryOf) => ({
        url: `/categories?categoryOf=${categoryOf}`,
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

// Export hooks for usage in functional components
export const { useFetchCategoriesQuery } = categoriesApiSlice;