import { VLoader } from '@components/molecules';
import VPagination from '@components/organisms/pagination/v-pagination.organism';
import { usePagination } from './usePagination';

interface VPaginatedListProps<T> {
  data?: T[];
  serverSideData?: T[];
  loading?: boolean;
  renderItem: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  serverPageSize?: number;
  clientPageSize?: number;
  totalItems?: number;
  fetchMore?: (page: number) => void;
  gridClasses?: string;
}
export function VPaginatedList<T>({
  data = [],
  serverSideData,
  loading = false,
  renderItem,
  emptyState,
  serverPageSize = 20,
  clientPageSize = 6,
  totalItems,
  fetchMore,
  gridClasses = 'grid grid-cols-3 gap-5',
}: VPaginatedListProps<T>) {
  const { currentPageItems, currentPage, totalPages, handlePageChange, allItems } = usePagination({
    data,
    serverSideData,
    serverPageSize,
    clientPageSize,
    totalItems,
    fetchMore,
  });


  // Show loading only if we have no items at all
  if (loading) {
    return <VLoader type="spinner" classNames='min-h-48'/>;
  }

  // Show empty state only if we're not loading and have no items
  if (allItems.length === 0 && !loading) {
    return emptyState || <div>No items found</div>;
  }

  return (
    <div>
      <div className={gridClasses}>
        {currentPageItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <VPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}
