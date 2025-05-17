// manage-doc.page.tsx
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateSupportDocMutation,
  useDeleteSupportDocMutation,
  useGetSupportDocByTitleQuery,
  usePublishSupportDocMutation,
  useUpdateSupportDocMutation,
} from 'store/slices/support-doc.slice';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import toast from 'react-hot-toast';
import { ContentEditor } from '../components/content-editor.component';
import { ViewContent } from '../components/view-content.component';

const generateSlug = (title: string) =>
  title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

function ManageSupportDocPage({ mode = 'edit' }: { mode?: 'edit' | 'create' }) {
  const isCreateMode = mode === 'create';
  const { id, slug, parentSlug } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(isCreateMode);
  const [docData, setDocData] = useState({ title: '', content: '', tags: [] as string[] });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const tagString = docData.tags.join(', ');
  const title = slug ? `${parentSlug} / ${docData.title}` : docData.title;

  const { data: supportDocList, isFetching } = useGetSupportDocByTitleQuery(undefined, {
    skip: isCreateMode,
  });

  const [publishSupportDoc, { isLoading: isPublishing }] = usePublishSupportDocMutation();
  const [createSupportDoc, { isLoading: isCreating }] = useCreateSupportDocMutation();
  const [updateSupportDoc, { isLoading: isUpdating }] = useUpdateSupportDocMutation();
  const [deleteSupportDoc] = useDeleteSupportDocMutation();

  const currentDoc = useMemo(() => {
    if (Array.isArray(supportDocList)) {
      return supportDocList.find((doc) => doc.id === id) || supportDocList[0] || null;
    }
    return supportDocList || null;
  }, [supportDocList, id]);

  useEffect(() => {
    if (!currentDoc || isCreateMode) return;
    const doc = Array.isArray(currentDoc) ? currentDoc[0] : currentDoc;
    setDocData({
      title: doc.title || '',
      content: doc.content || '',
      tags: doc.tags ? doc.tags.split(',').map((tag: string) => tag.trim()) : [],
    });
  }, [currentDoc, isCreateMode]);

  const handleContentChange = (updated: typeof docData) => setDocData(updated);

  const handlePublish = async () => {
    try {
      if (!currentDoc?.id) return;
      await publishSupportDoc(currentDoc.id).unwrap();
      toast.success('Document published successfully');
      navigate('/support-desk/docs');
    } catch {
      toast.error('Failed to publish document');
    }
  };

  const handleSave = async () => {
    try {
      const slug = generateSlug(docData.title);
      const payload = {
        title: docData.title,
        content: docData.content,
        slug,
        tags: tagString,
        link: `https://docs.example.com/${slug}`,
      };

      if (isCreateMode) {
        await createSupportDoc(payload).unwrap();
        toast.success('Document created successfully');
        navigate('/support-desk/docs');
      } else {
        if (!currentDoc?.id) return;
        await updateSupportDoc({ id: currentDoc.id, updatedDoc: payload }).unwrap();
        toast.success('Document updated successfully');
        setIsEditing(false);
      }
    } catch {
      toast.error(`Failed to ${isCreateMode ? 'create' : 'update'} document`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!currentDoc?.id) return;
      await deleteSupportDoc(currentDoc?.id).unwrap();
      toast.success('Document deleted successfully');
      navigate('/support-desk/docs');
    } catch {
      toast.error('Failed to delete document');
    }
  };

  if (!isCreateMode && isFetching) return <div className="flex justify-center items-center h-full"><VLoader /></div>;
  if (!isCreateMode && !currentDoc) return <div className="text-center text-gray-500">Document not found</div>;

  return (
    <>
      {isEditing ? (
        <ContentEditor
          title={title}
          type='document'
          docData={docData}
          onContentChange={handleContentChange}
          onSave={handleSave}
          onPublish={handlePublish}
          isLoading={isCreateMode ? isCreating : isUpdating}
          isPublish={isPublishing}
          onBack={() => (isCreateMode ? navigate('/support-desk/docs') : setIsEditing(false))}
          isEditable
          mode={mode}
        />
      ) : (
        <ViewContent
          title={title}
          content={docData.content}
          onBack={() => navigate('/support-desk/docs')}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      )}

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this document?"
        onSubmit={handleDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
      />
    </>
  );
}

export default ManageSupportDocPage;