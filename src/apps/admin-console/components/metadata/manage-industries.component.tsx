import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { IndustryRequestDTO } from '@dto/request/industry.request.dto';
import { IndustryResponseDTO } from '@dto/response/industry-response.dto';
import { VFormFields, mapToFormFieldData } from '@types';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAddIndustryMutation, useUpdateIndustryMutation } from 'store/slices/industry.slice';

type ManageIndustriesProps = {
  industryToEdit?: IndustryResponseDTO | null;
  onClose: () => void;
  onSuccess: (saved: IndustryResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageIndustries({
  industryToEdit,
  onSuccess,
  onSubmitRef,
  setIsSubmitting,
}: ManageIndustriesProps) {

  const formRef = useRef<VDynamicFormHandle>(null);
  const [addIndustry, { isLoading: addingIndustry }] = useAddIndustryMutation();
  const [editIndustry, { isLoading: updatingIndustry }] = useUpdateIndustryMutation();

  const isEditMode = Boolean(industryToEdit);

  const [, setDefaultValues] = useState({});

  useEffect(() => {
    if (industryToEdit) {
      setDefaultValues({
        name: industryToEdit.name,
        description: industryToEdit.description,
        isPublic: industryToEdit.isPublic,
      });
    }
  }, [industryToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const industryformConfig: VFormFields[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter Name',
      position: '1 1 12',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text-area',
      required: true,
      placeholder: 'Enter Description',
      position: '2 1 12',
    },
    {
      name: 'isPublic',
      label: 'Public',
      type: 'switch',
      position: '3 1 4',
    }
  ];

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);
    const basePayload: IndustryRequestDTO = {
      ...formData,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editIndustry({ id: industryToEdit!.id, data: basePayload }).unwrap()
        : await addIndustry({ newIndustry: basePayload }).unwrap();

      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit industry:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingIndustry || updatingIndustry;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <VDynamicForm
      config={industryformConfig}
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialValues={mapToFormFieldData({
        ...industryToEdit,
        isPublic: industryToEdit?.isPublic ?? true
      })}
    />
  );
}

export default ManageIndustries;
