import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { VFormFieldData } from '@types';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { mapApiFieldsToFormFields } from '@utils/functions';
import { RegistrationField } from 'test-runner/types';
import { VButton } from '@components/atoms';
import { useRef } from 'react';

interface ParticipantRegistrationFormProps {
  registrationFields: RegistrationField[];
  onSubmit: (formData: VFormFieldData) => void;
  onCancelRegistration: () => void;
  isSubmitting: boolean;
}

export function ParticipantRegistrationForm({
  registrationFields,
  onSubmit,
  onCancelRegistration,
  isSubmitting,
}: ParticipantRegistrationFormProps) {
  const formRef = useRef<VDynamicFormHandle>(null);
  const registrationFieldsConfig = mapApiFieldsToFormFields(registrationFields);

  return (
    <>
      <VTypography as="h2" className="mb-8 text-center lg:text-left !text-theme-brand">
        Please fill registration form to get started!
      </VTypography>

      {registrationFieldsConfig.length > 0 ? (
        <div className='flex flex-col gap-6'>
          <VDynamicForm
            ref={formRef}
            config={registrationFieldsConfig}
            onSubmit={onSubmit}
            isFormSubmitting={isSubmitting}
            className="space-y-6"
          />

          <div className="flex gap-2">
            <VButton variant="secondary" className='!w-24' onClick={onCancelRegistration}>
              Cancel
            </VButton>
            <VButton className='!w-28' isLoading={isSubmitting} onClick={() => formRef.current?.submit()}>Proceed</VButton>
          </div>
        </div>
      ) : (
        <VTypography as="p" color="secondary">
          No registration fields required. You may proceed directly to the test.
        </VTypography>
      )}
    </>
  );
}

export default ParticipantRegistrationForm;
