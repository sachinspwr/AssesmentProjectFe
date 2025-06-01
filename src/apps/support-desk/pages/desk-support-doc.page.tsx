import { VButton, VCard, VICon, VLink } from '@components/atoms';
import { BadgeVariant, VBadge, VLoader } from '@components/molecules/index';
import MarkdownRenderer from '@components/organisms/markdown/markdown-renderer';
import { VSearchFilter } from '@components/organisms/search-filter/v-search-filter.organism';
import { defaultFormatDtTm } from '@utils/functions';
// import { DocumentNotFound } from 'apps/help-center/components';
import { useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiEye, FiPlus } from 'react-icons/fi';
import { GrDocumentText } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useGetSupportDocByTitleQuery } from 'store/slices/support-doc.slice';
import NoDocumentsFound from '../components/no-documents-found.component';
import { SupportDocStatus } from '@utils/enums/support-doc.enum';

function SupportDocsManagerpage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'title' | 'author'>('title');
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: documents = [], isLoading } = useGetSupportDocByTitleQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const filteredDocs = useMemo(() => {
    if (!searchTerm) return documents;
    return documents.filter((doc) => {
      const searchValue = searchTerm.toLowerCase();
      return filterBy === 'title'
        ? doc.title.toLowerCase().includes(searchValue)
        : (doc.createdBy?.firstName + ' ' + doc.createdBy?.lastName).toLowerCase().includes(searchValue);
    });
  }, [documents, searchTerm, filterBy]);

  const toggleExpand = (docId: string) => {
    setExpandedDocId(expandedDocId === docId ? null : docId);
  };

  const getStatusBadge = (status: SupportDocStatus) => {
    let color = 'gray';
    switch (status) {
      case SupportDocStatus.Published:
        color = 'positive';
        break;
      case SupportDocStatus.Draft:
        color = 'warning';
        break;
      case SupportDocStatus.Archived:
        color = 'negative';
        break;
    }
    return (
      <VBadge variant={(color as BadgeVariant) ?? 'default'} size="sm">
        {status}
      </VBadge>
    );
  }

  return (
    <div className=" mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Support Documents</h1>
          <p className="text-gray-500 text-sm">Manage and organize your documentation</p>
        </div>
        <VButton onClick={() => navigate('/support-desk/docs/0')} variant="primary" className="flex items-center gap-2 w-full sm:w-auto justify-center" >
          <VICon icon={FiPlus} />
          <span>New Document</span>
        </VButton>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col justify-end sm:flex-row gap-3">
        <VSearchFilter
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          filterValue={filterBy}
          onFilterChange={(v, e) => setFilterBy(e.target.value as 'title' | 'author')}
          filterOptions={[
            { value: 'title', label: 'Title' },
            { value: 'author', label: 'Author' },
          ]}
          searchPlaceholder={`Search by ${filterBy}...`}
          filterPlaceholder="Filter by"
          wrapperClasses="mb-6"
        />
      </div>

      {/* Content Section */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <VLoader />
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDocs.length === 0 ? (
            <NoDocumentsFound />
          ) : (
            filteredDocs.map((doc) => (
              <VCard
                key={doc.id}
                className="shadow-sm transition-colors"
              >
                {/* Document Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <VICon icon={GrDocumentText} className="text-blue-500 mt-1 sm:mt-0 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-lg font-medium truncate flex items-center gap-4">
                        {doc.title}
                        {doc.status && getStatusBadge(doc.status)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {doc.createdBy?.firstName} {doc.createdBy?.lastName} • {defaultFormatDtTm(doc.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <VLink
                      to={`/support-desk/docs/${doc.id}/sub-doc/0`}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      aria-label="Create Sub document"
                    >
                      <VICon icon={FiPlus} size={20} />
                    </VLink>
                    <VLink
                      to={`/support-desk/docs/${doc.id}`}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      aria-label="Preview document"
                    >
                      <VICon icon={FiEye} size={20} />
                    </VLink>
                    <button
                      onClick={() => toggleExpand(doc.id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={expandedDocId === doc.id ? 'Collapse document' : 'Expand document'}
                    >
                      <VICon icon={expandedDocId === doc.id ? FiChevronUp : FiChevronDown} />
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedDocId === doc.id && (
                  <div className="border-t pt-4 mt-4 space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - Details and Sub-documents */}
                      <div className="lg:col-span-1 space-y-6">
                        {/* Document Details */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700">Document Details</h4>
                          <p className="text-sm text-gray-600 break-all">{doc.slug}</p>
                          {doc.tags && (
                            <div className="mt-1">
                              <h5 className="text-xs font-medium text-gray-500 mb-1">Tags</h5>
                              <div className="flex flex-wrap gap-1.5">
                                {doc.tags.split(',').map((tag) => (
                                  <VBadge key={tag} variant="primary" size="sm">
                                    {tag.trim()}
                                  </VBadge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Sub-documents */}
                        {doc.subDocs?.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-medium text-gray-700">Sub-Document Details</h4>
                            <ul className="space-y-3">
                              {doc.subDocs.map((subDoc) => (
                                <li key={subDoc.id} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600 truncate max-w-[180px]">{subDoc.slug}</span>
                                  <VLink
                                    to={`/support-desk/docs/${doc.slug}/sub-doc/${subDoc.slug}`}
                                    className="text-blue-500 hover:text-blue-600 text-sm transition-colors"
                                  >
                                    View
                                  </VLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Content Preview */}
                      <div className="lg:col-span-2 space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Content Preview</h4>
                        <div className="border-l border-theme-default p-4 max-h-96 overflow-y-auto">
                          <MarkdownRenderer
                            markdownText={doc.content}
                            className="prose-sm prose-headings:font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </VCard>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SupportDocsManagerpage;
