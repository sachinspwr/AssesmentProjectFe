import { Button } from '@components/atoms';
import { Loader } from '@components/molecules';
import { CategoryResponseDTO } from '@dto/response';
import { apiService } from '@services/api.service';
import { CategoryOf } from '@utils/enums';
import { useQuery } from 'react-query';
import React from 'react';

type CategorySetsCardProps = {
  categoryOf: CategoryOf;
  onSelect: (id: string) => void;
};

const CategoriesCard: React.FC<CategorySetsCardProps> = React.memo(({ categoryOf, onSelect }) => {
  const { data: categories, isLoading } = useQuery<CategoryResponseDTO[], Error>(
    ['categories', categoryOf],
    async () => await apiService.get<CategoryResponseDTO[]>(`categories?categoryOf=${categoryOf}`),
    {
      staleTime: 60000, // 1 minute
      cacheTime: 300000, // 5 minutes
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="relative w-full min-h-20 p-4 bg-skin-theme">
      <div className="flex justify-start gap-2 flex-wrap">
        {categories?.map((c) => (
          <Button
            key={c.id} // Added key prop for better performance
            className="!px-3 !bg-skin-theme-dark !text-skin-theme-dark hover:!bg-skin-theme-darker"
            onClick={() => onSelect(c.id)}
          >
            {c.name}
          </Button>
        ))}
      </div>
      {categories && categories.length === 0 && <p>No categories found</p>}

      {isLoading && <Loader wrapperClasses="min-h-20" bubbleClasses="bg-skin-theme-invert" />}
    </div>
  );
});

export { CategoriesCard };
