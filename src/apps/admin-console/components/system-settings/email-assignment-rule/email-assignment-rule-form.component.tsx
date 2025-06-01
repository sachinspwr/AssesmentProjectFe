import { VDynamicForm, VDynamicFormHandle } from "@components/organisms";
import { EmailAssignmentRuleRequestDTO } from "@dto/request/email-assignment-rule.request.dto";
import { EmailAssignmentRuleResponseDTO } from "@dto/response/email-assignment-rule.response.dto";
import { mapToFormFieldData, VFormFields } from "@types";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useCreateEmailAssignmentRuleMutation, useUpdateEmailAssignmentRuleMutation } from "store/slices/email-assignment-rule.slice";

type EmailAssignmentRuleFormProps = {
  emailAssignmentRuleToEdit?: EmailAssignmentRuleResponseDTO | null;
  data: EmailAssignmentRuleResponseDTO[];
  onClose: () => void;
  onSuccess: (saved: EmailAssignmentRuleResponseDTO) => void;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function EmailAssignmentRuleForm ({
    emailAssignmentRuleToEdit,
    data,
    onSuccess,
    onSubmitRef,
    setIsSubmitting,
  }: EmailAssignmentRuleFormProps) {

  const formRef = useRef<VDynamicFormHandle>(null);
  const [createEmailAssignmentRule, { isLoading: addingEmailAssignmentRule }] = useCreateEmailAssignmentRuleMutation();
  const [editEmailAssignmentRule, { isLoading: updatingEmailAssignmentRule }] = useUpdateEmailAssignmentRuleMutation();

  const isEditMode = Boolean(emailAssignmentRuleToEdit);

  const categoryOptions = useMemo(() => {
    const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
    return uniqueCategories.map((category) => ({
      label: category,
      value: category,
    }));
  }, [data]);

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (emailAssignmentRuleToEdit) {
      setDefaultValues({
        category: emailAssignmentRuleToEdit.category,
        key: emailAssignmentRuleToEdit.key,
        value: emailAssignmentRuleToEdit.value,
        isPublic: emailAssignmentRuleToEdit.isPublic,
      });
    }
  }, [emailAssignmentRuleToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const emailAssignmentRuleFormConfig: VFormFields[] = [
    {
        name: 'key',
        label: 'Key',
        type: 'text',
        required: true,
        placeholder: 'Enter key',
        position: '1 1 12',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: categoryOptions,
      placeholder: 'Select Category',
      position: '2 1 12',
    },
    {
        name: 'value',
        label: 'Value',
        type: 'email',
        required: true,
        placeholder: 'Enter value',
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
    console.log(typeof(formData.key));
    console.log(typeof(formData.value));
    console.log(typeof(formData.category));
    const basePayload: EmailAssignmentRuleRequestDTO = {
      ...formData,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await editEmailAssignmentRule({ id: emailAssignmentRuleToEdit!.id, data: basePayload }).unwrap()
        : await createEmailAssignmentRule({ rulesData: basePayload }).unwrap();
      onSuccess(result);
    } catch (error) {
      console.error('Failed to submit email assignment rule:', error);
      toast.error((error as Error).message);
    }
  };

  const isSubmitting = addingEmailAssignmentRule || updatingEmailAssignmentRule;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

    return(
        <>
            <VDynamicForm
                config={emailAssignmentRuleFormConfig}
                onSubmit={handleFormSubmit}
                ref={formRef}
                initialValues={mapToFormFieldData({
                    ...emailAssignmentRuleToEdit,
                    isPublic: emailAssignmentRuleToEdit?.isPublic ?? true
                })}
            />
        </>
    )
}

export default EmailAssignmentRuleForm;