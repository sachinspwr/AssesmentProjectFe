import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { SubjectRequestDTO } from '@dto/request/subject.request.dto';
import { SubjectResponseDTO } from '@dto/response/subject-response.dto';
import { VFormFields, mapToFormFieldData } from '@types';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAddSubjectMutation, useUpdateSubjectMutation } from 'store/slices/subject.slice';

type ManageSubjectsProps = {
  subjectToEdit?: SubjectResponseDTO | null;
  onClose: () => void;
  onSuccess: (saved: SubjectResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageSubject({
  subjectToEdit,
  onSuccess,
  onSubmitRef,
  setIsSubmitting,
}: ManageSubjectsProps) {

  const formRef = useRef<VDynamicFormHandle>(null);
  const [addSubject, { isLoading: addingSubject }] = useAddSubjectMutation();
  const [editSubject, { isLoading: updatingSubject }] = useUpdateSubjectMutation();

  const isEditMode = Boolean(subjectToEdit);

  const [, setDefaultValues] = useState({});

  useEffect(() => {
    if (subjectToEdit) {
      setDefaultValues({
        name: subjectToEdit.name,
        description: subjectToEdit.description,
        isPublic: subjectToEdit.isPublic,
      });
    }
  }, [subjectToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const subjectformConfig: VFormFields[] = [
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
    const basePayload: SubjectRequestDTO = {
      ...formData,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editSubject({ id: subjectToEdit!.id, data: basePayload }).unwrap()
        : await addSubject({ newSubject: basePayload }).unwrap();

      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit subject:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingSubject || updatingSubject;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <VDynamicForm
      config={subjectformConfig}
      onSubmit={handleFormSubmit}
      ref={formRef}
      initialValues={mapToFormFieldData({
        ...subjectToEdit,
        isPublic: subjectToEdit?.isPublic ?? true
      })}
    />
  );
}

export default ManageSubject;
