// components/delete-account-modal.component.tsx
import { VModal } from '@components/organisms/modal/v-modal.organism';
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VFormFieldData, VFormFields } from '@types';
import { VButton } from '@components/atoms';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: VFormFieldData) => void;
    isDeactivating: boolean;
}

export function DeleteAccountModal({
    isOpen,
    onClose,
    onSubmit,
    isDeactivating
}: DeleteAccountModalProps) {
    const deactivateFormConfig: VFormFields[] = [
        {
            type: 'group',
            position: '1 1 12',
            fields: [
                {
                    type: 'password',
                    name: 'password',
                    label: 'Current Password',
                    required: true,
                    position: '2 1 12',
                    helpText: 'Enter your current password to confirm delete account'
                }
            ]
        },
        {
            type: 'checkbox',
            name: 'confirm',
            label: 'Please confirm you understand this action is irreversible',
            position: '3 1 12',
        },
        {
            type: 'custom',
            name: 'deactivateAccount',
            position: '7 9 4',
            customContent:
                <>
                    <VButton type='submit' variant='negative'>
                        {isDeactivating ? 'Deleting...' : 'Delete Account'}
                    </VButton>
                </>
        }
    ];

    return (
        <VModal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Account"
            showFooter={false}
        >
            <div className="mb-4">
                <VTypography as="p" className="mb-2">
                    Are you sure you want to delete your account?
                </VTypography>
                <VTypography as="p" color="muted" className="text-sm">
                    Your profile will be delete and you won't be able to access your account.
                </VTypography>
            </div>
            <VDynamicForm
                config={deactivateFormConfig}
                onSubmit={onSubmit}
                spacing={4}
            />
        </VModal>
    );
}