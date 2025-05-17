// components/profile-information-section.component.tsx
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { useLoggedInUser } from '@hooks';
import { VFormFieldData, VFormFields } from '@types';
import { UserProfileHeader } from './user-profile-header.organism';
import toast from 'react-hot-toast';
import { useUpdateUserMutation } from 'store/slices/account.slice';

interface ProfileInformationSectionProps {
  user: ReturnType<typeof useLoggedInUser>;
  formConfig: VFormFields[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: Record<string, any>;
}

export function ProfileInformationSection({ user, formConfig, initialValues }: ProfileInformationSectionProps) {
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

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
        <VTypography as="h3">Profile Information</VTypography>
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
