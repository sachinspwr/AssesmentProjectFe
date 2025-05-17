import React from 'react';
import toast from 'react-hot-toast';
import { VDynamicForm } from '@components/organisms';
import { mapFormDataToDTO, VFormField, VFormFieldData } from '@types';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from 'store/slices/account.slice';
import { CredentialDTO } from '@dto/request';

const forgotPasswardFormConfig: VFormField[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter your email address',
    position: '1 1 12',
    validate: (value) => {
      if (!(value as string).includes('@')) {
        return 'Invalid email format';
      }
    },
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'Submit',
    position: '2 1 12',
  },
];

type ForgotPasswordFormProps = DefaultProps;

function ForgotPasswordForm({ className }: ForgotPasswordFormProps) {
  const navigate = useNavigate();
  const [triggerForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgetPasswordRequest = async (formData: VFormFieldData) => {
    const credentials = mapFormDataToDTO<CredentialDTO>(formData, forgotPasswardFormConfig);
    const response = await triggerForgotPassword(credentials).unwrap();
    toast.success(response.message);
    navigate('/sign-in');
  };

  return (
    <div className={`w-full ${className}`}>
      <VDynamicForm
        config={forgotPasswardFormConfig}
        isFormSubmitting={isLoading}
        onSubmit={handleForgetPasswordRequest}
      />
    </div>
  );
}

export { ForgotPasswordForm };
