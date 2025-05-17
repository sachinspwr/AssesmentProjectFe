/* eslint-disable react/function-component-definition */
import React, { useRef, forwardRef, useImperativeHandle, useMemo } from 'react';
import { DynamicForm, DynamicFormHandle } from '@components/organisms';
import { FormFields, FormFieldData } from '@types';
import { useMutation } from 'react-query';
import { apiService } from '@services/api.service';
import toast from 'react-hot-toast';

type CategoryFormProps = {
  className?: string;
  onDone?: () => void;
  categoryOf: string;
};

const CategoryForm = forwardRef<{ submit: () => void }, CategoryFormProps>(
  ({ className = '', onDone, categoryOf }: CategoryFormProps, ref) => {
    const formRef = useRef<DynamicFormHandle>(null);

    // API call to create category using useMutation
    const { mutate, isLoading } = useMutation(
      async (data: FormFieldData) => await apiService.post('/categories', data),
      {
        onSuccess: () => {
          toast.success('Category created successfully');
          onDone && onDone(); // Trigger the onDone callback (if provided) to close modal or notify parent
        },
      }
    );

    // Form submission logic
    const handleFormSubmission = (formData: FormFieldData) => {
      const requestData = {
        ...formData,
        categoryOf, // Include the category type
      };
      mutate(requestData);
    };

    // Expose submit function to parent component via ref
    useImperativeHandle(ref, () => ({
      submit: () => {
        formRef.current?.submit();
      },
    }));

    // Define form fields
    const categoryFormFields = useMemo<FormFields[]>(() => {
      return [
        {
          name: 'name',
          label: 'Category Name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text-area',
          required: true,
        },
        {
          name: 'isPublic',
          label: 'Mark as Public',
          type: 'checkbox',
          required: false,
        },
        {
          name: 'categoryOf',
          label: 'Category Of',
          type: 'hidden',
          value: categoryOf,
          required: true,
        },
      ];
    }, [categoryOf]);

    return (
      <div className={`p-4 ${className}`}>
        <DynamicForm
          ref={formRef}
          config={categoryFormFields}
          submitButtonLabel="Create Category"
          submitButtonLoading={isLoading}
          onSubmit={handleFormSubmission}
          showSubmit={false} // Hide the default submit button as in SupportTicketForm
        />
      </div>
    );
  }
);

export { CategoryForm };
