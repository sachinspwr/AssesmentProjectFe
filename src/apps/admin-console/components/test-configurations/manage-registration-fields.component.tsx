import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { RegistrationFieldsRequestDTO } from '@dto/request/registration-field-option.request.dto';
import { RegistrationFieldsResponseDTO } from '@dto/response/registration-fields.response.dto';
import { mapToFormFieldData, VFormFields } from '@types';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAddRegistrationFieldMutation,
  useUpdateRegistrationFieldMutation,
} from 'store/slices/registration-fields.slice';

type ManageRegistrationFieldsProps = {
  registrationFieldDataToEdit?: RegistrationFieldsResponseDTO | null;
  onCancel: () => void;
  onSuccess: (saved: RegistrationFieldsResponseDTO) => void;
  data: RegistrationFieldsResponseDTO[];
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageRegistrationFields({
  data,
  onSuccess,
  registrationFieldDataToEdit,
  onSubmitRef,
  setIsSubmitting,
}: ManageRegistrationFieldsProps) {
  const formRef = useRef<VDynamicFormHandle>(null);
  const [addRegistrationField, { isLoading: addingRegistrationField }] = useAddRegistrationFieldMutation();
  const [updateRegistrationField, { isLoading: updatingRegistrationField }] = useUpdateRegistrationFieldMutation();

  const isEditMode = Boolean(registrationFieldDataToEdit);

  const typeOptions = useMemo(() => {
    const uniqueType = Array.from(new Set(data.map((item) => item.type)));
    return uniqueType.map((type) => ({
      label: type as string,
      value: type as string,
    }));
  }, [data]);

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (registrationFieldDataToEdit) {
      setDefaultValues({
        name: registrationFieldDataToEdit.name,
        label: registrationFieldDataToEdit.label,
        isPublic: registrationFieldDataToEdit.isPublic,
        isRequired: registrationFieldDataToEdit.isRequired,
        options: registrationFieldDataToEdit.options,
        placeholder: registrationFieldDataToEdit.placeholder,
        type: registrationFieldDataToEdit.type,
      });
    }
  }, [registrationFieldDataToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const registationFieldFormConfig: VFormFields[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter name',
      position: '1 1 12',
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: typeOptions,
      required: true,
      placeholder: 'Enter type',
      position: '2 1 6',
    },
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      placeholder: 'Enter label',
      position: '2 7 6',
    },
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      required: true,
      placeholder: 'Enter placeholder',
      position: '3 1 12',
    },
    {
      name: 'options',
      label: 'Options',
      type: 'text-area',
      required: true,
      placeholder: 'Enter comma seperated options',
      position: '4 1 12',
    },
    {
      name: 'isRequired',
      label: 'Required',
      type: 'switch',
      position: '5 1 4',
    },
    {
      name: 'isPublic',
      label: 'Public',
      type: 'switch',
      position: '5 5 4',
    },
  ];

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);
    const basePayload: RegistrationFieldsRequestDTO = {
      ...formData,
      isRequired: formData.isRequired ?? false,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await updateRegistrationField({ id: registrationFieldDataToEdit!.id, data: basePayload }).unwrap()
        : await addRegistrationField(basePayload).unwrap();
      onSuccess(result);
    } catch (error) {
      console.error('Failed to add registration field:', error);
    }
  };

  const isSubmitting = addingRegistrationField || updatingRegistrationField;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <>
      <div>
        <VDynamicForm
          config={registationFieldFormConfig}
          onSubmit={handleFormSubmit}
          ref={formRef}
          initialValues={mapToFormFieldData({
            ...registrationFieldDataToEdit,
            isPublic: registrationFieldDataToEdit?.isPublic ?? true,
            isRequired: registrationFieldDataToEdit?.isRequired ?? true,
          })}
        />
      </div>
    </>
  );
}

export default ManageRegistrationFields;
