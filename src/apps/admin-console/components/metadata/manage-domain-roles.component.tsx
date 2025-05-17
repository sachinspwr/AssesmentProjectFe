import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { IndustryRoleRequestDTO } from '@dto/request/industry-role.request.dto';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryRoleResponseDTO } from '@dto/response/industry-role-response.dto';
import { VFormFields, mapToFormFieldData } from '@types';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAddIndustryRoleMutation, useUpdateIndustryRoleMutation } from 'store/slices/industry-role.slice';

type ManageDomainRolesProps = {
  domainRoleToEdit?: IndustryRoleResponseDTO | null;
  onClose: () => void;
  domains: DomainResponseDTO[];
  onSuccess: (saved: IndustryRoleResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageDomainRoles({
  domainRoleToEdit,
  onSuccess,
  onSubmitRef,
  setIsSubmitting,
  domains
}: ManageDomainRolesProps) {

  const domainId = '""';  
  const formRef = useRef<VDynamicFormHandle>(null);
  const [addDomainRole, { isLoading: addingDomainRole }] = useAddIndustryRoleMutation();
  const [editDomainRole, { isLoading: updatingDomainRole }] = useUpdateIndustryRoleMutation();

  const isEditMode = Boolean(domainRoleToEdit);

  const [, setDefaultValues] = useState({});

  useEffect(() => {
    if (domainRoleToEdit) {
      setDefaultValues({
        name: domainRoleToEdit.name,
        description: domainRoleToEdit.description,
        domainId: domainRoleToEdit.domainId,
        isPublic: domainRoleToEdit.isPublic,
      });
    }
  }, [domainRoleToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const domainRoleformConfig: VFormFields[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter Name',
      position: '1 1 12',
    },
    {
        name: 'domainId',
        label: 'Domain',
        type: 'select',
        required: true,
        placeholder: 'Select Domain',
        options: domains.map((domain: { id: string; name: string }) => ({
          value: domain.id,
          label: domain.name,
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
    const basePayload: IndustryRoleRequestDTO = {
      ...formData,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editDomainRole({ domainId, id: domainRoleToEdit!.id, data: basePayload }).unwrap()
        : await addDomainRole({ domainId, newIndustryRole: basePayload }).unwrap();

      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit domain role:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingDomainRole || updatingDomainRole;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <VDynamicForm
      config={domainRoleformConfig}
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialValues={mapToFormFieldData({
        ...domainRoleToEdit,
        isPublic: domainRoleToEdit?.isPublic ?? true
      })}
    />
  );
}

export default ManageDomainRoles;
