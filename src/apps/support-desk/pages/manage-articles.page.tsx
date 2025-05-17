import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { ContentEditor } from '../components/content-editor.component';
import {
  useFetchArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  usePublishArticleMutation,
} from 'store/slices/articles.slice';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import { ViewContent } from '../components/view-content.component';

type ManageArticlesPageProps = { mode?: 'edit' | 'create' };

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

function ManageArticlesPage({ mode = 'edit' }: ManageArticlesPageProps) {
  const isCreateMode = mode === 'create';
  const { id, slug, parentSlug } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(isCreateMode);
  const [docData, setDocData] = useState({ title: '', content: '', tags: [] as string[], });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const title = slug ? `${parentSlug} / ${docData.title}` : docData.title;

  const { data: articles, isFetching } = useFetchArticlesQuery(undefined, {
    skip: isCreateMode,
    refetchOnMountOrArgChange: true,
  });
  const [publishArticle, { isLoading: isPublishing }] = usePublishArticleMutation();
  const [createArticle, { isLoading: isCreating }] = useCreateArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();
  const isSaving = isCreating || isUpdating || isDeleting;

  const currentArticle = useMemo(() => {
    return Array.isArray(articles) ? articles[0] : articles || null;
  }, [articles]);

  useEffect(() => {
    if (!currentArticle || isCreateMode) return;
    const doc = Array.isArray(currentArticle) ? currentArticle[0] : currentArticle;
    setDocData({
      title: doc.title || '',
      content: doc.content || '',
      tags: doc.tags
        ? doc.tags.split(',').map((tag: string) => tag.trim())
        : [],
    });
  }, [currentArticle, isCreateMode]);

  const handlePublish = async () => {
    try {
      if (!currentArticle?.id) return;
      await publishArticle(currentArticle.id).unwrap();
      toast.success('Article published successfully');
      navigate('/support-desk/articles');
    } catch (err) {
      toast.error('Failed to publish article');
    }
  };

  const handleSave = async () => {
    const slug = generateSlug(docData.title);
    const tagsString = docData.tags.join(', ');
    try {
      if (isCreateMode) {
        await createArticle({
          title: docData.title,
          content: docData.content,
          tags: tagsString,
          slug,
        }).unwrap();
        toast.success('Article created successfully');
        navigate('/support-desk/articles');
      } else if (id) {
        await updateArticle({
          id,
          updatedArticle: {
            title: docData.title,
            content: docData.content,
            tags: tagsString,
            slug,
          },
        }).unwrap();
        toast.success('Article updated successfully');
        setIsEditing(false);
      }
    } catch (err) {
      toast.error(`Failed to ${isCreateMode ? 'create' : 'update'} article`);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteArticle(id).unwrap();
      toast.success('Article deleted');
      navigate('/support-desk/articles');
    } catch (err) {
      toast.error('Failed to delete article');
    }
  };

  const handleContentChange = ({
    title,
    content,
    tags: updatedTags,
  }: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    setDocData({
      title,
      content,
      tags: updatedTags,
    });
  };

  if (!isCreateMode && isFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <VLoader />
      </div>
    );
  }

  if (!isCreateMode && !currentArticle) {
    return <div className="text-center text-gray-500">Article not found</div>;
  }

  return (
    <div>
      {isEditing ? (
        <ContentEditor
          title={title}
          docData={docData}
          type='article'
          onContentChange={handleContentChange}
          onSave={handleSave}
          onPublish={handlePublish}
          isLoading={isSaving}
          isPublish={isPublishing}
          onBack={() => (isCreateMode ? navigate('/support-desk/articles') : setIsEditing(false))}
          isEditable={true}
          mode={isCreateMode ? 'create' : 'edit'}
        />
      ) : (
        <ViewContent
          title={title}
          content={docData.content}
          onBack={() => navigate('/support-desk/articles')}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      )}

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this Article?"
        onSubmit={handleDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
      />
    </div>
  );
}

export default ManageArticlesPage;
