import { useEffect, useRef, useState } from 'react';
import { VICon, VInput } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import MarkdownEditorWithPreview from '@components/organisms/markdown/v-markdown-editor.organism';
import TagSelector from '@components/organisms/tag-selector/tag-selector.organism';
import { TbArrowLeft } from 'react-icons/tb';
import { ContentEditorActions } from './content-editor-action.component';

interface DocData {
    title: string;
    content: string;
    tags: string[];
}

interface ContentEditorProps {
    title?: string;
    docData: DocData;
    type: string;
    isEditable: boolean;
    onBack: () => void;
    onSave?: () => void;
    onPublish?: () => void;
    onContentChange: (updated: DocData) => void;
    isLoading: boolean;
    isPublish: boolean;
    mode: 'edit' | 'create';
}

export function ContentEditor({
    title,
    docData,
    onBack,
    onSave,
    onPublish,
    type,
    onContentChange,
    isLoading,
    isPublish,
    mode,
}: ContentEditorProps) {
    const [draft, setDraft] = useState(docData);

    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (isFirstLoad.current) {
            setDraft(docData);
            isFirstLoad.current = false;
        }
    }, [docData]);

    const handleChange = (field: keyof DocData, value: string | string[]) => {
        const updated = { ...draft, [field]: value };
        setDraft(updated);
        onContentChange(updated);
    };

    const getPlaceholderByType = (type: string) => {
        switch (type) {
            case 'sub document':
                return 'Enter sub document title';
            case 'article':
                return 'Enter article title';
            default:
                return 'Enter document title';
        }
    };    

    return (
        <article className="support-doc-container">
            <div className="flex gap-4 items-center mb-2 pb-2 border-b">
                <VICon onClick={onBack} aria-label="Back to docs" icon={TbArrowLeft} />
                <VTypography as="h3">
                
                    {mode === 'create'
                        ? type === 'sub document'
                        ? 'Create Sub Document'
                        : type === 'article'
                        ? 'Create Article'
                        : 'Create Document'
                        : type === 'sub document'
                        ? 'Edit Sub Document'
                        : type === 'article'
                        ? 'Edit Article'
                        : 'Edit Document'
                    }

                </VTypography>

            </div>

            <div className="flex justify-between items-end mb-4">
                <div className="w-full flex items-end gap-2">
                    <div className="w-2/3">
                    <VInput
                        name="document-title"
                        value={draft.title}
                        placeholder={getPlaceholderByType(type)}
                        onChange={(val) => handleChange('title', val)}
                    />

                    </div>
                    <div className="w-1/3">
                        <TagSelector
                            value={draft.tags}
                            onChange={(val) => handleChange('tags', val)}
                            wrapperClasses="w-1/3"
                            hideLabel
                        />
                    </div>
                </div>

                <ContentEditorActions
                    onSave={onSave}
                    onPublish={onPublish}
                    isLoading={isLoading}
                    isPublish={isPublish}
                />
            </div>

            <div className="relative w-full">
                <MarkdownEditorWithPreview
                    initialValue={draft.content}
                    onChange={(val) => handleChange('content', val)}
                />
            </div>
        </article>
    );
}
