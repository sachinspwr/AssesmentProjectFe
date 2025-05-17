import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { GrDocumentStore } from 'react-icons/gr';

function NoDocumentsFound({ searchQuery = '', onResetSearch = () => {} }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto text-center text-gray-700">
      <VTypography as="h1" className="mb-4">
        {searchQuery ? <FiSearch /> : <GrDocumentStore  />}
      </VTypography>

      <VTypography as="h4">
        {searchQuery ? `No documents found for "${searchQuery}"` : 'No documents available'}
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

export default NoDocumentsFound;
