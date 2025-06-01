import { VLoader } from '@components/molecules';
import VPagination from '@components/organisms/pagination/v-pagination.organism';
import { usePagination } from './usePagination';

interface VPaginatedListProps<T> {
  data?: T[];
  serverSideData?: T[];
  loading?: boolean;
  renderItem: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  serverpageSize?: number;
  clientpageSize?: number;
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
  serverpageSize = 20,
  clientpageSize = 6,
  totalItems,
  fetchMore,
  gridClasses = 'grid grid-cols-3 gap-5',
}: VPaginatedListProps<T>) {
  const { currentpageItems, currentpage, totalpages, handlepageChange, allItems } = usePagination({
    data,
    serverSideData,
    serverpageSize,
    clientpageSize,
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
        {currentpageItems.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>

      {totalpages > 1 && (
        <div className="mt-4 flex justify-center">
          <VPagination currentPage={currentpage} totalPages={totalpages} onpageChange={handlepageChange} />
        </div>
      )}
    </div>
  );
}
