// hooks/use-account-actions.hook.ts
import { useState } from 'react';
import { useChangePasswordMutation, useDeactivateUserMutation } from 'store/slices/account.slice';
import toast from 'react-hot-toast';
import { useLoggedInUser } from '@hooks';
import { VFormFieldData } from '@types';
import { useNavigate } from 'react-router-dom';

export function useAccountActions() {
    const user = useLoggedInUser();
    const navigate = useNavigate();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
    const [deactivateUser, { isLoading: isDeactivating }] = useDeactivateUserMutation();

    const handlePasswordSubmit = async (formData: VFormFieldData) => {
        try {
            if (formData.newPassword !== formData.confirmPassword) {
                toast.error('New passwords do not match!');
                return;
            }
            await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            }).unwrap();
            setIsPasswordModalOpen(false);
        } catch (error) {
            console.error('Password change failed:', error);
        }
    };

    const handleDeactivateSubmit = async (formData: VFormFieldData) => {
        try {
            if (!formData.confirm) {
                toast.error('Please confirm you understand this action is irreversible');
                return;
            }
            if (!formData.password) {
                toast.error('Password is required to deactivate the account');
                return;
            }
            await deactivateUser(formData.password as string).unwrap(); // Pass the password instead of user.id
            setIsDeactivateModalOpen(false);
            navigate('/sign-out');
        } catch (error) {
            console.error('Account deletion failed:', error);
        }
    };

    return {
        isPasswordModalOpen,
        isDeactivateModalOpen,
        isChangingPassword,
        isDeactivating,
        setIsPasswordModalOpen,
        setIsDeactivateModalOpen,
        handlePasswordSubmit,
        handleDeactivateSubmit
    };
}