// manage-sub-doc.page.tsx
import { VLoader } from '@components/molecules/loader/v-loader.mol';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    useCreateSupportSubDocMutation,
    useDeleteSupportSubDocMutation,
    useGetSubDocBySlugQuery,
    useUpdateSupportSubDocMutation,
} from 'store/slices/support-doc.slice';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import toast from 'react-hot-toast';
import { ContentEditor } from '../components/content-editor.component';
import { ViewContent } from '../components/view-content.component';

const generateSlug = (title: string) =>
    title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

function ManageSubDocpage({ mode = 'edit' }: { mode?: 'edit' | 'create' }) {
    const isCreateMode = mode === 'create';
    const { slug, parentSlug, parentId } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(isCreateMode);
    const [docData, setDocData] = useState({ title: '', content: '', tags: [] as string[] });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const tagString = docData.tags.join(', ');

    const titleCaseFromSlug = (slug?: string): string => {
        if (!slug) return '';
        return slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };
    
    const parentDocTitle = titleCaseFromSlug(parentSlug);

    const { data: subDocData, isFetching } = useGetSubDocBySlugQuery(
        { parentSlug: parentSlug!, subSlug: slug! },
        { skip: isCreateMode }
    );

    const [createSupportSubDoc, { isLoading: isCreating }] = useCreateSupportSubDocMutation();
    const [updateSupportSubDoc, { isLoading: isUpdating }] = useUpdateSupportSubDocMutation();
    const [deleteSupportSubDoc] = useDeleteSupportSubDocMutation();
    const title = slug ? `${parentDocTitle} / ${docData.title}` : docData.title;

    const currentDoc = useMemo(() => {
        return Array.isArray(subDocData) ? subDocData[0] : subDocData || null;
    }, [subDocData]);

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
                await createSupportSubDoc({
                    supportDocId: parentId!,
                    newSubDoc: { ...payload, supportDocId: parentId! },
                }).unwrap();
                toast.success('Sub-document created successfully');
                navigate('/support-desk/docs');
            } else {
                if (!currentDoc?.id) return;
                await updateSupportSubDoc({
                    supportDocId: parentId!,
                    subDocId: currentDoc.id,
                    updatedSubDoc: payload,
                }).unwrap();
                toast.success('Sub-document updated successfully');
                setIsEditing(false);
            }
        } catch {
            toast.error(`Failed to ${isCreateMode ? 'create' : 'update'} sub-document`);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteSupportSubDoc({
                supportDocId: parentId!,
                subDocId: currentDoc?.id,
            }).unwrap();
            toast.success('Sub-document deleted successfully');
            navigate('/support-desk/docs');
        } catch {
            toast.error('Failed to delete sub-document');
        }
    };

    if (!isCreateMode && isFetching) return <div className="flex justify-center items-center h-full"><VLoader /></div>;
    if (!isCreateMode && !currentDoc) return <div className="text-center text-gray-500">Sub-document not found</div>;

    return (
        <>
            {isEditing ? (
                <ContentEditor
                    title={title}
                    type='sub document'
                    docData={docData}
                    onContentChange={handleContentChange}
                    onSave={handleSave}
                    isLoading={isCreateMode ? isCreating : isUpdating}
                    onBack={() => (isCreateMode ? navigate('/support-desk/docs') : setIsEditing(false))}
                    isEditable
                    mode={mode}
                    isPublish={false}
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
                message="Are you sure you want to delete this sub-document?"
                onSubmit={handleDelete}
                onClose={() => setIsDeleteModalOpen(false)}
                isOpen={isDeleteModalOpen}
            />
        </>
    );
}

export default ManageSubDocpage;
