import React from 'react';
import { DynamicForm } from '@components/organisms';
import { FormFields, FormFieldData } from '@types';
import { useMutation } from 'react-query';
import { ApiResponse } from '@dto/response';
import { apiService } from '@services/api.service';
import toast from 'react-hot-toast';

const RequestaDemoFormConfig: FormFields[] = [
  {
    type: 'group',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        fieldWith: 'label',
        required: true,
        placeholder: 'First name',
        validate: (value) => {
          const stringValue = value as string;
          if (!stringValue) {
            return 'First name is required';
          }
          if (/\d/.test(stringValue)) {
            return 'First name should not contain numbers';
          }
        },
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        fieldWith: 'label',
        required: true,
        placeholder: 'Last name',
        validate: (value) => {
          const stringValue = value as string;
          if (!stringValue) {
            return 'Last name is required';
          }
          if (/\d/.test(stringValue)) {
            return 'Last name should not contain numbers';
          }
        },
      },
    ],
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    required: true,
    placeholder: 'Company',
    validate: (value) => {
      const stringValue = value as string;
      if (!stringValue) {
        return 'Company name is required';
      }
    },
  },
  {
    type: 'group',
    fields: [
      {
        name: 'companySize',
        label: 'Company Size',
        type: 'text',
        fieldWith: 'label',
        required: true,
        placeholder: 'Company Size',
        validate: (value) => {
          const stringValue = value as string;
          if (!stringValue) {
            return 'Company Size is required';
          }
          if (/[a-zA-Z!@#$%^&*(),.?":{}|<>]/.test(stringValue)) {
            return 'Company Size should be in numbers only';
          }
        },
      },

      {
        name: 'roleInCompany',
        label: 'Role',
        type: 'text',
        required: true,
        placeholder: 'Role',
        validate: (value) => {
          const stringValue = value as string;
          if (!stringValue) {
            return 'Company Role is required';
          }
        },
      },
    ],
  },
  {
    name: 'email',
    label: 'Work Email',
    type: 'email',
    required: true,
    placeholder: 'Email address',
    validate: (value) => {
      const stringValue = value as string;
      const regex = /^[a-z]+[0-9]?[.]?[a-z0-9]+[_]?[a-z0-9]+@[a-zA-Z]{3,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
      if (!regex.test(stringValue)) {
        return 'Invalid email format';
      }
    },
  },
  {
    name: 'message',
    label: 'How can our team help you?',
    type: 'text-area',
    required: true,
    placeholder: 'Your query',
    validate: (value) => {
      const stringValue = value as string;
      if (!stringValue) {
        return 'Message is required';
      }
    },
  },
];

type RequestaDemoFormProps = { className?: string };

function RequestaDemoForm({ className }: RequestaDemoFormProps) {
  const { mutate, isLoading } = useMutation<ApiResponse, Error, FormFieldData>(
    async (data) => await apiService.post<ApiResponse>('/request-demo', data),
    {
      onSuccess: () => {
        toast.success("Your request has been received. We'll respond shortly", { duration: 5000 });
      },
    }
  );

  return (
    <div className={`w-full ${className}`}>
      <DynamicForm
        config={RequestaDemoFormConfig}
        submitButtonLabel="I agree to share my data and continue"
        className="flex flex-col gap-1"
        submitButtonLoading={isLoading}
        onSubmit={mutate}
      />
    </div>
  );
}

export { RequestaDemoForm };
