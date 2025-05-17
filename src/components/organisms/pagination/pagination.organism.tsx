import { Icon } from '@components/atoms';
import { Card } from '@components/molecules/advance-card/card.mol';
import React from 'react';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="container mx-auto">
      <Card className="!shadow-sm !p-2">
        <nav
          className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
          aria-label="Pagination"
        >
          <Icon
            type="react-icons"
            icon={MdArrowCircleLeft}
            size={45}
            color={currentPage > 1 ? 'currentColor' : 'gray'}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`cursor-pointer mr-3 ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          />

          {pages.map((page) => (
            <div
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className={`flex justify-center items-center w-10 h-10 mx-1 hover:bg-skin-theme-dark rounded-full cursor-pointer ${page === currentPage ? 'bg-skin-theme-dark text-skin-theme-darker ' : 'border-gray-200 bg-white text-skin-theme-dark hover:border-gray-300'}`}
            >
              {page}
            </div>
          ))}

          <Icon
            type="react-icons"
            icon={MdArrowCircleRight}
            size={45}
            color={currentPage < totalPages ? 'currentColor' : 'gray'}
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`cursor-pointer ml-3 ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </nav>
      </Card>
    </div>
  );
}

export { Pagination };
