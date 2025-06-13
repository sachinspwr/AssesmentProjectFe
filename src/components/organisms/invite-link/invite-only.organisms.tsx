import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestInvitationRequestDTO } from '@dto/request/test-invitation.request.dto';
import { GetTestInvitationResponseDTO } from '@dto/response/get-test-link-invitation-response.dto';
import { VFormFieldData, VFormFields } from '@types';
import { useCreateTestInviteOnlyInvitationMutation } from 'store/slices/test-invitation.slice';
import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { useState } from 'react';
type InviteUsersProps = {
  allLinkOfPersonal: GetTestInvitationResponseDTO[];
};
function InviteOnlyUsers({ allLinkOfPersonal }: InviteUsersProps) {
  const [formKey, setFormKey] = useState(0); // Add this at the top of the component
  const [createTestInvitation, { isLoading }] = useCreateTestInviteOnlyInvitationMutation();
  const linkOptions = allLinkOfPersonal.map((link) => ({
    label: link.name,
    value: link.id,
  }));
  const genrateLinkFormConfig: VFormFields[] = [
    {
      name: 'selectedLink',
      label: 'Select Link',
      type: 'select',
      placeholder: 'Select Link',
      options: linkOptions,
      required: true,
      position: '1 1 4',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter your email address',
      position: '1 6 4',
      validate: (value) => {
        if (value === '') return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) return 'Invalid email format';
      },
    },
    {
      name: 'save',
      label: 'Send Invitation',
      type: 'custom',
      position: '2 1 3',
      customContent: (
        <VButton type="submit" className="w-full" isLoading={isLoading}>
          Send Invitation
        </VButton>
      ),
    },
  ];

  const handleFormSubmit = async (formData: VFormFieldData) => {
    const selectedTestLink = allLinkOfPersonal.find((link) => link?.testId == formData?.selectedLink);
    const payload = {
      testLinkId: formData?.selectedLink,
      email: formData?.email,
      message: "You're invited to take the test.",
      status: 'Pending',
      isPersonal: true,
      testLink: {
        activeFrom: selectedTestLink?.activeFrom,
        activeUntil: selectedTestLink?.activeUntil,
        timeZone: selectedTestLink?.timeZone,
      },
    } as TestInvitationRequestDTO;

    console.log(payload);

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

export default InviteOnlyUsers;
