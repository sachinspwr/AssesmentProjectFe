import { VDynamicForm, VDynamicFormHandle } from '@components/organisms';
import { TestSettingOptionRequestDTO } from '@dto/request/test-setting-option.request.dto';
import { TestSettingOptionResponseDTO } from '@dto/response';
import { mapToFormFieldData, VFormFields } from '@types';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAddTestSettingOptionMutation,
  useUpdateTestSettingOptionMutation,
} from 'store/slices/test-setting-option.slice';

type ManageSettingsProps = {
  onCancel: () => void;
  data: TestSettingOptionResponseDTO[];
  onSuccess: (saved: TestSettingOptionResponseDTO) => void;
  settingToEdit?: TestSettingOptionResponseDTO | null;
  onSubmitRef?: React.MutableRefObject<(() => void) | null>;
  setIsSubmitting?: (val: boolean) => void;
};

function ManageSettings({ data, onSuccess, settingToEdit, onSubmitRef, setIsSubmitting }: ManageSettingsProps) {
  console.log(data);
  const testId = '""';
  const formRef = useRef<VDynamicFormHandle>(null);
  const [addSetting, { isLoading: addingSetting }] = useAddTestSettingOptionMutation();
  const [updateSetting, { isLoading: updatingSetting }] = useUpdateTestSettingOptionMutation();

  const isEditMode = Boolean(settingToEdit);

  // Extract unique categories from the data and memoize them
  const categoryOptions = useMemo(() => {
    const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
    return uniqueCategories.map((category) => ({
      label: category,
      value: category,
    }));
  }, [data]);

  const valueTypeOptions = useMemo(() => {
    const uniqueValueType = Array.from(new Set(data.map((item) => item.valueType)));
    return uniqueValueType.map((valueType) => ({
      label: valueType as string,
      value: valueType as string,
    }));
  }, [data]);

  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    if (settingToEdit) {
      setDefaultValues({
        category: settingToEdit.category,
        description: settingToEdit.description,
        value: settingToEdit.value,
        ValueType: settingToEdit.valueType,
        isPublic: settingToEdit.isPublic,
        isRecommended: settingToEdit.isRecommended,
      });
    }
  }, [settingToEdit]);

  useEffect(() => {
    if (onSubmitRef) {
      onSubmitRef.current = () => formRef.current?.submit();
    }
  }, [onSubmitRef]);

  const settingFormConfig: VFormFields[] = [
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: categoryOptions,
      placeholder: 'Select Category',
      position: '1 1 12',
      onChange: (selectedValue) => {
        console.log('Selected value: ', selectedValue);
      },
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
      name: 'value',
      label: 'Value',
      type: 'text',
      required: true,
      placeholder: 'Enter value',
      position: '3 1 6',
    },
    {
      name: 'valueType',
      label: 'Value Type',
      type: 'select',
      required: true,
      options: valueTypeOptions,
      placeholder: 'Enter value type',
      position: '3 7 6',
    },
    {
      name: 'isPublic',
      label: 'Public',
      type: 'switch',
      position: '5 1 4',
    },
    {
      name: 'isRecommended',
      label: 'Recommended',
      type: 'switch',
      position: '5 5 4',
    },
  ];

  const handleFormSubmit = async (formData: any) => {
    const newSetting: TestSettingOptionRequestDTO = {
      ...formData,
      key: '""',
      isConfigurable: true,
      isRecommended: formData.isRecommended ?? false,
      isPublic: formData.isPublic ?? false,
    };

    try {
      const result = isEditMode
        ? await updateSetting({ testId, id: settingToEdit!.id, data: newSetting }).unwrap()
        : await addSetting({ testId, newSetting }).unwrap();
      onSuccess(result);
    } catch (error) {
      console.error('Failed to add test setting:', error);
    }
  };

  const isSubmitting = addingSetting || updatingSetting;

  useEffect(() => {
    setIsSubmitting?.(isSubmitting);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <>
      <div>
        <VDynamicForm
          config={settingFormConfig}
          onSubmit={handleFormSubmit}
          ref={formRef}
          initialValues={mapToFormFieldData({
            ...settingToEdit,
            isPublic: settingToEdit?.isPublic ?? true,
            isRecommended: settingToEdit?.isRecommended ?? true,
          })}
        />
      </div>
    </>
  );
}

export default ManageSettings;
