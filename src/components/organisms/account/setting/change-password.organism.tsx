// components/change-password-modal.component.tsx
import { VModal } from '@components/organisms/modal/v-modal.organism';
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { VFormFieldData, VFormFields } from '@types';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: VFormFieldData) => void;
    isChangingPassword: boolean;
}

export function ChangePasswordModal({
    isOpen,
    onClose,
    onSubmit,
    isChangingPassword
}: ChangePasswordModalProps) {
    const passwordFormConfig: VFormFields[] = [
        {
            type: 'group',
            position: '1 1 12',
            fields: [
                {
                    type: 'password',
                    name: 'oldPassword',
                    label: 'Current Password',
                    required: true,
                    position: '2 1 12'
                },
                {
                    type: 'password',
                    name: 'newPassword',
                    label: 'New Password',
                    required: true,
                    position: '3 1 12',
                    helpText: 'Must be at least 8 characters with uppercase, lowercase, number, and special character'
                },
                {
                    type: 'password',
                    name: 'confirmPassword',
                    label: 'Confirm New Password',
                    required: true,
                    position: '4 1 12'
                }
            ]
        },
        {
            type: 'submit',
            name: 'changePassword',
            label: isChangingPassword ? 'Changing...' : 'Change Password',
            position: '6 8 5'
        }
    ];

    return (
        <VModal
            isOpen={isOpen}
            onClose={onClose}
            title="Change Password"
            showFooter={false}
        >
            <VDynamicForm
                config={passwordFormConfig}
                onSubmit={onSubmit}
                spacing={4}
            />
        </VModal>
    );
}