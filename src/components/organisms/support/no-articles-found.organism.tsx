import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';
import { FiSearch, FiFileText } from 'react-icons/fi';

function NoArticlesFound({ searchQuery = '', onResetSearch = () => {} }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center text-gray-700">
      <VTypography as="h1" className="mb-4">
        {searchQuery ? <FiSearch /> : <FiFileText />}
      </VTypography>

      <VTypography as="h4">
        {searchQuery ? `No articles found for "${searchQuery}"` : 'No articles available'}
      </VTypography>

      <VTypography className="mb-6">
        {searchQuery ? 'Try different search terms or browse our categories.' : 'Check back later for new content.'}
      </VTypography>

      {searchQuery && (
        <VButton variant="secondary" onClick={onResetSearch}>
          Clear Search
        </VButton>
      )}
    </div>
  );
}

export default NoArticlesFound;
