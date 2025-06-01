import { useState, useEffect, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  data?: T[];
  serverSideData?: T[];
  serverpageSize?: number;
  clientpageSize?: number;
  totalItems?: number;
  fetchMore?: (page: number) => void;
}

export function usePagination<T>({
    data = [],
    serverSideData,
    clientpageSize = 6,
    totalItems,
    fetchMore,
  }: UsePaginationProps<T>) {
    const [allItems, setAllItems] = useState<T[]>(data);
    const [currentServerpage, setCurrentServerpage] = useState(1);
    const [currentClientpage, setCurrentClientpage] = useState(1);
  
    // Merge new server data with existing items
    useEffect(() => {
      if (serverSideData) {
        setAllItems(serverSideData);
      }
    }, [serverSideData]);
  
    // Get current page items
    const currentpageItems = useMemo(() => {
      const startIndex = (currentClientpage - 1) * clientpageSize;
      return allItems.slice(startIndex, startIndex + clientpageSize);
    }, [allItems, currentClientpage, clientpageSize]);
  
    // Calculate total pages
    const totalpages = useMemo(() => {
      if (totalItems !== undefined) {
        return Math.ceil(totalItems / clientpageSize);
      }
      return Math.ceil(allItems.length / clientpageSize);
    }, [allItems, clientpageSize, totalItems]);
  
    // Handle page change
    const handlepageChange = useCallback((page: number) => {
      setCurrentClientpage(page);
      
      // Check if we need to fetch more data
      const lastNeededItemIndex = page * clientpageSize;
      const totalLoadedItems = allItems.length;
      
      if (fetchMore && lastNeededItemIndex >= totalLoadedItems - clientpageSize) {
        const nextServerviewMode = currentServerpage + 1;
        setCurrentServerpage(nextServerpage);
        fetchMore(nextServerpage);
      }
    }, [allItems.length, clientpageSize, currentServerpage, fetchMore]);
  
    return {
      currentpageItems,
      currentpage: currentClientpage,
      totalpages,
      handlepageChange,
      allItems,
      resetPagination: () => {
        setCurrentClientpage(1);
        setCurrentServerpage(1);
        setAllItems(data);
      }
    };
  }