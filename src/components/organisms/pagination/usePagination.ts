import { useState, useEffect, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  data?: T[];
  serverSideData?: T[];
  serverPageSize?: number;
  clientPageSize?: number;
  totalItems?: number;
  fetchMore?: (page: number) => void;
}

export function usePagination<T>({
    data = [],
    serverSideData,
    clientPageSize = 6,
    totalItems,
    fetchMore,
  }: UsePaginationProps<T>) {
    const [allItems, setAllItems] = useState<T[]>(data);
    const [currentServerPage, setCurrentServerPage] = useState(1);
    const [currentClientPage, setCurrentClientPage] = useState(1);
  
    // Merge new server data with existing items
    useEffect(() => {
      if (serverSideData) {
        setAllItems(serverSideData);
      }
    }, [serverSideData]);
  
    // Get current page items
    const currentPageItems = useMemo(() => {
      const startIndex = (currentClientPage - 1) * clientPageSize;
      return allItems.slice(startIndex, startIndex + clientPageSize);
    }, [allItems, currentClientPage, clientPageSize]);
  
    // Calculate total pages
    const totalPages = useMemo(() => {
      if (totalItems !== undefined) {
        return Math.ceil(totalItems / clientPageSize);
      }
      return Math.ceil(allItems.length / clientPageSize);
    }, [allItems, clientPageSize, totalItems]);
  
    // Handle page change
    const handlePageChange = useCallback((page: number) => {
      setCurrentClientPage(page);
      
      // Check if we need to fetch more data
      const lastNeededItemIndex = page * clientPageSize;
      const totalLoadedItems = allItems.length;
      
      if (fetchMore && lastNeededItemIndex >= totalLoadedItems - clientPageSize) {
        const nextServerPage = currentServerPage + 1;
        setCurrentServerPage(nextServerPage);
        fetchMore(nextServerPage);
      }
    }, [allItems.length, clientPageSize, currentServerPage, fetchMore]);
  
    return {
      currentPageItems,
      currentPage: currentClientPage,
      totalPages,
      handlePageChange,
      allItems,
      resetPagination: () => {
        setCurrentClientPage(1);
        setCurrentServerPage(1);
        setAllItems(data);
      }
    };
  }