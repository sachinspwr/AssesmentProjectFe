// components/organisms/support-doc/support-doc-actions.organism.tsx

import { VButton } from '@components/atoms';

interface ContentEditorActionsProps {
  isLoading: boolean;
  isPublish: boolean;
  onSave?: () => void;
  onPublish?: () => void;
}

export function ContentEditorActions({
  isLoading,
  isPublish,
  onSave,
  onPublish,
}: ContentEditorActionsProps) {
  return (
    <div className="flex gap-2 ml-2">
      <VButton onClick={onSave} isLoading={isLoading} className="!w-40">
        Save
      </VButton>
      <VButton onClick={onPublish} isLoading={isPublish} className="!w-40">
        Publish
      </VButton>
    </div>
  );
}
