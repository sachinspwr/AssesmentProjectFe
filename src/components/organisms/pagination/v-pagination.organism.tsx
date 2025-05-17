import React, { useEffect, useState } from 'react';
import { VButton, VNumberInput } from '@components/atoms';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface VPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLoadMore?: () => void; // Fetch more data if needed
  maxVisiblePages?: number; // E.g., 5
}

// eslint-disable-next-line react/function-component-definition
const VPagination: React.FC<VPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  maxVisiblePages = 5,
}) => {
  const [inputPage, setInputPage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // reset input when page changes
    setInputPage('');
  }, [currentPage]);

  const generatePageRange = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisiblePages);
    }

    if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handleChangePage = async (page: number) => {
    if (page < 1 || page === currentPage) return;

    if (page > totalPages && onLoadMore) {
      setIsLoading(true);
      try {
        await onLoadMore();
      } finally {
        setIsLoading(false);
      }
    } else {
      onPageChange(page);
    }
  };

  const handleQuickJump = () => {
    const page = parseInt(inputPage);
    if (!isNaN(page)) handleChangePage(page);
  };

  const pageList = generatePageRange();

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      {/* Previous Button */}
      <VButton
        variant="link"
        className="!w-8 !h-8 !rounded-full"
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        aria-label="Previous page"
      >
        <AiOutlineLeft />
      </VButton>

      {/* Page Buttons */}
      {pageList.map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
        ) : (
          <VButton
            key={`page-${item}`}
            variant={item === currentPage ? 'primary' : 'link'}
            className={`!w-8 !h-8 !rounded-full ${item === currentPage ? '!text-theme-on-primary' : ''}`}
            onClick={() => handleChangePage(item)}
            disabled={isLoading}
            aria-current={item === currentPage ? 'page' : undefined}
          >
            {item}
          </VButton>
        )
      )}

      {/* Next Button */}
      <VButton
        variant="link"
        className="!w-8 !h-8 !rounded-full"
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={isLoading || (currentPage === totalPages && !onLoadMore)}
        aria-label="Next page"
      >
        <AiOutlineRight />
      </VButton>

      {/* Quick Jump */}
      <div className="flex items-center ml-4 space-x-2">
        <VNumberInput
          name="page-jump"
          onChange={(value) => setInputPage(String(value))}
          className="!w-20 h-8 "
          min={1}
          max={totalPages}
          disabled={isLoading}
        />
        <VButton
          size="sm"
          variant="secondary"
          onClick={handleQuickJump}
          disabled={isLoading || !inputPage}
        >
          Go
        </VButton>
      </div>
    </div>
  );
};

export default VPagination;
