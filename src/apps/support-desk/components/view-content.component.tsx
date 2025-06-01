import { VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VMarkdown from '@components/organisms/markdown/v-markdown-render.organism';
import { TbArrowLeft, TbEdit, TbTrash } from 'react-icons/tb';

interface ViewContentProps {
  title: string;
  content: string;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ViewContent({
  title,
  content,
  onBack,
  onEdit,
  onDelete,
}: ViewContentProps) {
  return (
    <article className="support-doc-container">
      <div className="flex justify-between items-center mb-2 pb-2 border-b">
        <div className="flex gap-4 items-center">
          <VICon onClick={onBack} aria-label="Back to docs" icon={TbArrowLeft} />
          <VTypography as="h3">{title}</VTypography>
        </div>

        <div className="flex gap-4 mr-4">
          <VICon onClick={onEdit} aria-label="Edit document" icon={TbEdit}  className="text-blue-500" />
          <VICon onClick={onDelete} aria-label="Delete document" icon={TbTrash} className="text-red-500" />
        </div>
      </div>

      <VMarkdown content={content} />
    </article>
  );
}
