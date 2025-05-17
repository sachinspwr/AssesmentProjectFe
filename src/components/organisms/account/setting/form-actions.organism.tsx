// components/form-actions.component.tsx
import { VButton } from '@components/atoms';

interface FormActionsProps {
    onCancel?: () => void;
    onSave?: () => void;
}

export function FormActions({ onCancel, onSave }: FormActionsProps) {
    return (
        <div className="flex justify-end space-x-4 pt-10">
            <VButton variant="secondary" className="!w-auto" onClick={onCancel}>
                Cancel
            </VButton>
            <VButton variant="primary" className="!w-auto" onClick={onSave}>
                Save Changes
            </VButton>
        </div>
    );
}