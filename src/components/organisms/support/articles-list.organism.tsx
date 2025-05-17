// article-list.tsx
import { useState, useMemo } from 'react';
import { VCard, VICon } from '@components/atoms';
import { BadgeVariant, VBadge, VLoader } from '@components/molecules';
import { ArticleStatus } from '@utils/enums';
import { defaultFormatDtTm } from '@utils/functions';
import { FiChevronDown, FiChevronUp, FiEdit, FiEye } from 'react-icons/fi';
import { GrDocumentText } from 'react-icons/gr';
import MarkdownRenderer from '@components/organisms/markdown/markdown-renderer';
import { ArticleResponseDTO } from '@dto/response/article.response.dto';
import { VSearchFilter } from '../search-filter/v-search-filter.organism';
import NoArticlesFound from './no-articles-found.organism';
import { useNavigate } from 'react-router-dom';

type ArticleListProps = {
  articles: ArticleResponseDTO[];
  isLoading: boolean;
  onEdit: (article: ArticleResponseDTO) => void;
};

export function ArticleList({ articles, isLoading, onEdit }: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'title' | 'author'>('title');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const navigate = useNavigate();
  const filteredArticles = useMemo(() => {
    if (!searchTerm) return articles;
    return articles.filter((article) => {
      const searchValue = searchTerm.toLowerCase();
      return filterBy === 'title'
        ? article.title.toLowerCase().includes(searchValue)
        : (article.createdBy?.firstName + ' ' + article.createdBy?.lastName).toLowerCase().includes(searchValue);
    });
  }, [articles, searchTerm, filterBy]);

  const toggleExpand = (articleId: string) => {
    setExpandedArticleId(expandedArticleId === articleId ? null : articleId);
  };

  const getStatusBadge = (status: ArticleStatus) => {
    let color = 'gray';
    switch (status) {
      case ArticleStatus.Published:
        color = 'positive';
        break;
      case ArticleStatus.Draft:
        color = 'warning';
        break;
      case ArticleStatus.Archived:
        color = 'negative';
        break;
    }
    return (
      <VBadge variant={(color as BadgeVariant) ?? 'default'} size="sm">
        {status}
      </VBadge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <VLoader />
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <NoArticlesFound />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
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
      />

      {/* Articles List */}
      <div className="space-y-3">
        {filteredArticles.map((article) => (
          <VCard key={article.id} className="shadow-sm transition-colors">
            {/* Article Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                <VICon icon={GrDocumentText} className="text-blue-500 mt-1 sm:mt-0 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium truncate">{article.title}</h3>
                    {article.status && getStatusBadge(article.status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {article.createdBy?.firstName} {article.createdBy?.lastName} •{' '}
                    {defaultFormatDtTm(article.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button
                  onClick={() => navigate(`/support-desk/articles/${article.id}`)}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                  aria-label="Preview article"
                >
                  <VICon icon={FiEye} size={20} />
                </button>
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={expandedArticleId === article.id ? 'Collapse article' : 'Expand article'}
                >
                  <VICon icon={expandedArticleId === article.id ? FiChevronUp : FiChevronDown} />
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedArticleId === article.id && (
              <div className="border-t pt-4 mt-4 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Details */}
                  <div className="lg:col-span-1 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Article Details</h4>
                      <p className="text-sm text-gray-600 break-all">Slug: {article.slug}</p>
                      {(article.tags?.length ?? 0) > 0 && (
                        <div className="mt-1">
                          <h5 className="text-xs font-medium text-gray-500 mb-1">Tags</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {article.tags?.split(',')?.map((tag) => (
                              <VBadge key={tag} variant="primary" size="sm">
                                {tag}
                              </VBadge>
                            ))}
                          </div>
                        </div>
                      )}
                      {article.summary && (
                        <div className="mt-2">
                          <h5 className="text-xs font-medium text-gray-500 mb-1">Summary</h5>
                          <p className="text-sm text-gray-600">{article.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Content Preview */}
                  <div className="lg:col-span-2 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Content Preview</h4>
                    <div className="border-l border-theme-default p-4 max-h-96 overflow-y-auto">
                      <MarkdownRenderer
                        markdownText={article.content}
                        className="prose-sm prose-headings:font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </VCard>
        ))}
      </div>
    </div>
  );
}
