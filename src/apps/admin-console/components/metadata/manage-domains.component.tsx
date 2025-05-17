import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { DomainRequestDTO } from '@dto/request/domain.request.dto';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryResponseDTO } from '@dto/response/industry-response.dto';
import { VFormFields, mapToFormFieldData } from '@types';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAddDomainsMutation, useUpdateDomainMutation } from 'store/slices/domain.slice';

type ManageDomainsProps = {
  domainToEdit?: DomainResponseDTO | null;
  onClose: () => void;
  industries: IndustryResponseDTO[];
  onSuccess: (saved: DomainResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageDomains({
  domainToEdit,
  onSuccess,
  onSubmitRef,
  setIsSubmitting,
  industries
}: ManageDomainsProps) {

  const formRef = useRef<VDynamicFormHandle>(null);
  const [addDomain, { isLoading: addingDomain }] = useAddDomainsMutation();
  const [editDomain, { isLoading: updatingDomain }] = useUpdateDomainMutation();

  const isEditMode = Boolean(domainToEdit);

  const [, setDefaultValues] = useState({});

  useEffect(() => {
    if (domainToEdit) {
      setDefaultValues({
        name: domainToEdit.name,
        description: domainToEdit.description,
        industryId: domainToEdit.industryId,
        isPublic: domainToEdit.isPublic,
      });
    }
  }, [domainToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const domainformConfig: VFormFields[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter Name',
      position: '1 1 12',
    },
    {
        name: 'industryId',
        label: 'Industry',
        type: 'select',
        required: true,
        placeholder: 'Select Industry',
        options: industries.map((industry: { id: string; name: string }) => ({
          value: industry.id,
          label: industry.name,
        })),
        position: '2 1 12',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text-area',
      required: true,
      placeholder: 'Enter Description',
      position: '3 1 12',
    },
    {
      name: 'isPublic',
      label: 'Public',
      type: 'switch',
      position: '4 1 4',
    }
  ];

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);
    const basePayload: DomainRequestDTO = {
      ...formData,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editDomain({ id: domainToEdit!.id, data: basePayload }).unwrap()
        : await addDomain({ newDomain: basePayload }).unwrap();

      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit domain:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingDomain || updatingDomain;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <VDynamicForm
      config={domainformConfig}
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialValues={mapToFormFieldData({
        ...domainToEdit,
        isPublic: domainToEdit?.isPublic ?? true
      })}
    />
  );
}

export default ManageDomains;
