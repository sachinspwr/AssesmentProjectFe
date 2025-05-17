import { useMutation } from 'react-query';
import { apiService } from '@services/api.service'; // Adjust the path according to your project structure
import { SearchRequestDTO } from '@dto/request';

const useSearch = <TREQ, TRES>(endpoint: string) => {
    const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<TRES, Error, SearchRequestDTO<TREQ>>(
        async (searchParams: SearchRequestDTO<TREQ>) =>
            await apiService.post2<SearchRequestDTO<TREQ>, TRES>(endpoint, searchParams)
    );

    return { mutate, isLoading, isError, isSuccess, data, error };
};

export { useSearch };
