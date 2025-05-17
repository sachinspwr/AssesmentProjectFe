import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { ExperienceLevelRequestDTO } from '@dto/request/experience-level.request.dto';
import { ExperienceLevelResponseDTO } from '@dto/response/experience-level-response.dto';
import { VFormFields, mapToFormFieldData } from '@types';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAddExperienceLevelMutation, useUpdateExperienceLevelMutation } from 'store/slices/experience-level.slice';

type ManageExperienceLevelProps = {
  experienceLevelToEdit?: ExperienceLevelResponseDTO | null;
  onClose: () => void;
  onSuccess: (saved: ExperienceLevelResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageExperienceLevel({
  experienceLevelToEdit,
  onSuccess,
  onSubmitRef,
  setIsSubmitting,
}: ManageExperienceLevelProps) {

  const formRef = useRef<VDynamicFormHandle>(null);
  const [addExperienceLevel, { isLoading: addingExperienceLevel }] = useAddExperienceLevelMutation();
  const [editExperienceLevel, { isLoading: updatingExperienceLevel }] = useUpdateExperienceLevelMutation();

  const isEditMode = Boolean(experienceLevelToEdit);

  const [, setDefaultValues] = useState({});

  useEffect(() => {
    if (experienceLevelToEdit) {
      setDefaultValues({
        name: experienceLevelToEdit.name,
        description: experienceLevelToEdit.description,
        isPublic: experienceLevelToEdit.isPublic,
      });
    }
  }, [experienceLevelToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const experienceLevelFormConfig: VFormFields[] = [
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
    const basePayload: ExperienceLevelRequestDTO = {
      ...formData,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editExperienceLevel({ id: experienceLevelToEdit!.id, data: basePayload }).unwrap()
        : await addExperienceLevel({ newExperienceLevel: basePayload }).unwrap();

      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit experience level:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingExperienceLevel || updatingExperienceLevel;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <VDynamicForm
      config={experienceLevelFormConfig}
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialValues={mapToFormFieldData({
        ...experienceLevelToEdit,
        isPublic: experienceLevelToEdit?.isPublic ?? true
      })}
    />
  );
}

export default ManageExperienceLevel;
