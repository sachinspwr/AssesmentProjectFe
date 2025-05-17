import { Link } from '@components/atoms';
import React from 'react';

// Define the props interface
interface NoResultsFoundProps {
  message?: string;
  className?: string;
  showAdvanceSearch?: () => void;
}

// Functional component with default props and function declaration syntax
function NoResultsFound({
  message = 'No results found with the search criteria.',
  className = '',
  showAdvanceSearch,
}: NoResultsFoundProps): JSX.Element {
  return (
    <div
      className={` flex flex-col justify-center items-center text-lg text-skin-theme-dark tracking-wide p-4  ${className}`}
    >
      <p>{message}</p>
      <p className="flex text-sm tracking-wider">
        Try searching with&nbsp;
        {!showAdvanceSearch && <span>more general search term</span>}
        {showAdvanceSearch && (
          <b>
            <Link onClick={showAdvanceSearch}>Advance Search</Link>
          </b>
        )}
      </p>
    </div>
  );
}

export { NoResultsFound };
