import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { TestInstructionOptionRequestDTO } from '@dto/request/test-instruction-option.request.dto';
import { TestInstructionOptionResponseDTO } from '@dto/response/test-instruction-option-response.dto';
import { VFormFields, mapToFormFieldData } from '@types';
import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import {
  useAddTestInstructionOptionMutation,
  useUpdateTestInstructionOptionMutation,
} from 'store/slices/test-instruction-option.slice';

type ManageInstructionsProps = {
  instructionToEdit?: TestInstructionOptionResponseDTO | null;
  data: TestInstructionOptionResponseDTO[]; // For category options
  onClose: () => void;
  onSuccess: (saved: TestInstructionOptionResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageInstructions({
  instructionToEdit,
  data,
  onSuccess,
  onSubmitRef,
  setIsSubmitting,
}: ManageInstructionsProps) {
  const testId = '""';
  const formRef = useRef<VDynamicFormHandle>(null);
  const [addInstruction, { isLoading: addingInstruction }] = useAddTestInstructionOptionMutation();
  const [editInstruction, { isLoading: updatingInstruction }] = useUpdateTestInstructionOptionMutation();

  const isEditMode = Boolean(instructionToEdit);

  const categoryOptions = useMemo(() => {
    const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
    return uniqueCategories.map((category) => ({
      label: category,
      value: category,
    }));
  }, [data]);

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (instructionToEdit) {
      setDefaultValues({
        category: instructionToEdit.category,
        description: instructionToEdit.description,
        isRecommended: instructionToEdit.isRecommended,
        isPublic: instructionToEdit.isPublic,
      });
    }
  }, [instructionToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const instructionformConfig: VFormFields[] = [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: categoryOptions,
      placeholder: 'Select Category',
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
    },
    {
      name: 'isRecommended',
      label: 'Recommended',
      type: 'switch',
      position: '3 4 4',
    },
  ];

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);
    const basePayload: TestInstructionOptionRequestDTO = {
      ...formData,
      key: instructionToEdit?.key ?? '""',
      value: true,
      valueType: 'boolean',
      isRecommended: formData.isRecommended ?? false,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editInstruction({ testId, id: instructionToEdit!.id, data: basePayload }).unwrap()
        : await addInstruction({ testId, newTestInstruction: basePayload }).unwrap();

      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit instruction:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingInstruction || updatingInstruction;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <VDynamicForm
      config={instructionformConfig}
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialValues={mapToFormFieldData({
        ...instructionToEdit,
        isPublic: instructionToEdit?.isPublic ?? true,
        isRecommended: instructionToEdit?.isRecommended ?? true,
      })}
    />
  );
}

export default ManageInstructions;
