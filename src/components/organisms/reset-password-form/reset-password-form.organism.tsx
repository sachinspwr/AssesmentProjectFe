import React from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { VDynamicForm } from '@components/organisms';
import { FormFieldData, mapFormDataToDTO, VFormField } from '@types';
import { useResetPasswordMutation } from 'store/slices/account.slice';
import { ResetPasswordRequestDTO } from '@dto/request/reset-password-request.dto';

const resetPasswordFormConfig: VFormField[] = [
  {
    name: 'newPassword',
    label: 'New Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
    position: '1 1 12',
    validate: (value) => {
      if (!value) return 'New password is required';
      if ((value as string).length < 6) return 'Password must be at least 6 characters long';
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    required: true,
    placeholder: 'Re-enter password',
    position: '2 1 12',
    validate: (value, formData) => {
      if (!value) return 'Confirm password is required';
      if (value !== formData?.newPassword) return 'Passwords do not match';
    },
  },
  {
    name: 'resetPasswordToken',
    type: 'hidden',
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'Reset Password',
    position: '3 1 12',
  },
];

type ResetPasswordFormProps = {
  className?: string;
  onComplete: (result: { isSuccess: boolean; error?: unknown }) => void;
};

function ResetPasswordForm({ className, onComplete }: ResetPasswordFormProps) {
  const location = useLocation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPasswordRequest = async (formData: FormFieldData) => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('verifier');

      if (!token) {
        toast.error('Invalid password reset token.');
        return;
      }

      const resetPasswordReq = mapFormDataToDTO<ResetPasswordRequestDTO>(formData, resetPasswordFormConfig);
      await resetPassword({ ...resetPasswordReq, resetPasswordToken: token }).unwrap();

      onComplete({ isSuccess: true });
    } catch (error) {
      toast.error((error as Error).message);
      onComplete({ isSuccess: false, error });
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <VDynamicForm
        config={resetPasswordFormConfig}
        isFormSubmitting={isLoading}
        onSubmit={handleResetPasswordRequest}
      />
    </div>
  );
}

export { ResetPasswordForm };
