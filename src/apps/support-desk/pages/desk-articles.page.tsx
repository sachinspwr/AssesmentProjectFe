// articles-manager-page.tsx
import { useState } from 'react';
import { VButton } from '@components/atoms';
import { ArticleResponseDTO } from '@dto/response/article.response.dto';
import { useFetchArticlesQuery } from 'store/slices/articles.slice';
import { ArticleList } from '@components/organisms/support/articles-list.organism';
import { useNavigate } from 'react-router-dom';

function Articlespage() {
  const [, setArticleToEdit] = useState<ArticleResponseDTO | null>(null);
  const navigate = useNavigate();
  const { data: articles = [], isLoading } = useFetchArticlesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleEdit = (article: ArticleResponseDTO) => {
    setArticleToEdit(article);
  };

  return (
    <div className="mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Knowledge Base Articles</h1>
          <p className="text-gray-500 text-sm">Create and manage help articles for your users</p>
        </div>
        <VButton
          variant="primary"
          className="flex items-center gap-2 w-full sm:w-auto justify-center"
          onClick={() => navigate('/support-desk/articles/0')}
        >
          New Article
        </VButton>
      </div>

      {/* Article List */}
      <ArticleList
        articles={articles}
        isLoading={isLoading}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Articlespage;