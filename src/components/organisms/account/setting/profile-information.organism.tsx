// components/profile-information-section.component.tsx
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { useLoggedInUser } from '@hooks';
import { VFormFieldData, VFormFields } from '@types';
import { UserProfileHeader } from './user-profile-header.organism';
import toast from 'react-hot-toast';
import { useUpdateUserMutation } from 'store/slices/account.slice';
import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface ProfileInformationSectionProps {
  user: ReturnType<typeof useLoggedInUser>;
  formConfig: VFormFields[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: Record<string, any>;
}

export function ProfileInformationSection({ user, formConfig, initialValues }: ProfileInformationSectionProps) {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (formData: VFormFieldData) => {
    if (!user || !user.id) {
      toast.error('User ID not found');
      return;
    }
    try {
      await updateUser({
        userId: user.id,
        userData: formData,
      }).unwrap();
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error('Failed to Update User');
    }
  };

  return (
    <div>
      <div className="pb-6">
        <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate('/dashboard')}>Profile Information</VTitleWithIcon>
      </div>
      <UserProfileHeader user={user} />
      <VDynamicForm
        config={formConfig}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        spacing={4}
        contentClasses="grid gap-4"
        isFormSubmitting={isUpdating}
      />
    </div>
  );
}
