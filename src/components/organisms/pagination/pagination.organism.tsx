import { Icon } from '@components/atoms';
import { Card } from '@components/molecules/advance-card/card.mol';
import React from 'react';
import { MdArrowCircleLeft, MdArrowCircleRight } from 'react-icons/md';

interface PaginationProps {
  currentpage: number;
  totalpages: number;
  onpageChange: (page: number) => void;
}

function Pagination({ currentpage, totalpages, onpageChange }: PaginationProps) {
  const pages = Array.from({ length: totalpages }, (_, index) => index + 1);

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
            color={currentpage > 1 ? 'currentColor' : 'gray'}
            onClick={() => currentpage > 1 && onpageChange(currentpage - 1)}
            className={`cursor-pointer mr-3 ${currentpage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          />

          {pages.map((page) => (
            <div
              key={page}
              onClick={() => onpageChange(page)}
              aria-current={viewMode === currentpage ? 'page' : undefined}
              aria-label={`page ${page}`}
              className={`flex justify-center items-center w-10 h-10 mx-1 hover:bg-skin-theme-dark rounded-full cursor-pointer ${viewMode === currentpage ? 'bg-skin-theme-dark text-skin-theme-darker ' : 'border-gray-200 bg-white text-skin-theme-dark hover:border-gray-300'}`}
            >
              {page}
            </div>
          ))}

          <Icon
            type="react-icons"
            icon={MdArrowCircleRight}
            size={45}
            color={currentpage < totalpages ? 'currentColor' : 'gray'}
            onClick={() => currentpage < totalpages && onpageChange(currentpage + 1)}
            className={`cursor-pointer ml-3 ${currentpage >= totalpages ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </nav>
      </Card>
    </div>
  );
}

export { Pagination };
