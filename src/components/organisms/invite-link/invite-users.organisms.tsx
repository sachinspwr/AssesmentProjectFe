import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestInvitationRequestDTO } from '@dto/request/test-invitation.request.dto';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { VFormFieldData, VFormFields } from '@types';
import { useCreateTestInvitationMutation } from 'store/slices/test-invitation.slice';
import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { useState } from 'react';
type InviteUsersProps = {
  allLinkOfPersonal: GetTestInvitationResponseDTO[];
  testId: string;
};
function InviteUsers({ testId }: InviteUsersProps) {
  const [formKey, setFormKey] = useState(0); // Add this at the top of the component
  const [createTestInvitation, { isLoading }] = useCreateTestInvitationMutation();

  const genrateLinkFormConfig: VFormFields[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address',
      position: '1 1 4',
      validate: (value) => {
        if (value === '') return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) return 'Invalid email format';
      },
    },
    {
      name: 'activeFrom',
      type: 'date',
      label: 'Active from',
      required: true,
      position: '2 1 4',
    },
    {
      name: 'activeUntil',
      type: 'date',
      label: 'Active until',
      required: true,
      position: '2 6 4',
    },

    {
      name: 'save',
      label: 'Send Invitation',
      type: 'custom',
      position: '3 1 4',
      customContent: (
        <VButton type="submit" className="w-full" isLoading={isLoading}>
          Send Invitation
        </VButton>
      ),
    },
  ];

  const handleFormSubmit = async (formData: VFormFieldData) => {
    const payload = {
      testId: testId,
      email: formData?.email,
      message: "You're invited to take the test.",
      status: 'Pending',
      isPersonal: true,
      testLink: {
        activeFrom: formData?.activeFrom,
        activeUntil: formData?.activeUntil,
        timeZone: 'IST', // static value
      },
    } as TestInvitationRequestDTO;

    try {
      const response = await createTestInvitation(payload).unwrap();
      setFormKey((prev) => prev + 1);
      console.log('Invitation sent successfully:', response);
    } catch (error) {
      console.error('Invitation error:', error);
    }
  };

  return (
    <div>
      <VTypography as="h5" className="font-bold">
        Invite Users
      </VTypography>
      <div className=" w-3/5">
        <VDynamicForm key={formKey} config={genrateLinkFormConfig} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default InviteUsers;
