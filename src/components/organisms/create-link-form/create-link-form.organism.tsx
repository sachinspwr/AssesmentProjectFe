import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { DynamicForm } from '@components/organisms';
import { FormFields, FormFieldData } from '@types';
import { useMutation } from 'react-query';
import { apiService } from '@services/api.service';
import toast from 'react-hot-toast';
import { MdDateRange, MdDescription } from 'react-icons/md';
import { TestResponseDTO } from '@dto/response';
import { TestLinkType } from '@utils/enums';
import { getOptionsFromEnum } from '@utils/functions/shared.functions';



type CreateLinkFormProps = {
    test: TestResponseDTO,
    className?: string;
    onDone?: () => void;
};

const CreateLinkForm = forwardRef<{ submit: () => void }, CreateLinkFormProps>(({ test, onDone, className }: CreateLinkFormProps, ref) => {
    const formRef = useRef<{ submit: () => void }>(null);
    const { mutate, isLoading } = useMutation(
        async (data: FormFieldData) => await apiService.post('/tests/links', data),
        {
            onSuccess: () => {
                toast.success('Link created successfully');
                onDone && onDone();
            },
        }
    );

    const handleFormSubmission = (formData: FormFieldData) => {
        mutate(formData);
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.submit();
        }
    }));

    const createLinkFormConfig: FormFields[] = [
        {
            name: 'testId',
            label: 'Test ID',
            type: 'hidden',
            value: `${test.id}`,
            required: false,
            placeholder: 'Test ID',
        },
        {
            name: 'testLinkName',
            label: 'Link Name',
            type: 'text',
            required: true,
            placeholder: 'Link Name',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            fieldWith: 'icon',
            icon: MdDescription,
            placeholder: 'Description (optional)',
        },
        {
            name: 'linkType',
            label: 'Link Type',
            type: 'select',
            options: [
                ...getOptionsFromEnum(TestLinkType)
            ],
            value: `${'Private'}`,
            required: true,
        },
        {
            type: 'group',
            fields: [
                {
                    name: 'maxAttemptsForLink',
                    label: 'Max Attempts',
                    type: 'number',
                    required: true,
                    placeholder: 'Max attempts allowed',
                },
                {
                    name: 'usageCountLimit',
                    label: 'Usage Limit',
                    type: 'number',
                    required: true,
                    placeholder: 'Usage count limit',
                },
            ]
        },
        {
            name: 'expiringOn',
            label: 'Expiration Date',
            type: 'date',
            fieldWith: 'icon',
            icon: MdDateRange,
            required: true,
        },
    ];

    return (
        <div className={`w-full mx-auto mb-2 ${className}`}>
            <DynamicForm
                ref={formRef}
                config={createLinkFormConfig}
                submitButtonLabel="Create Link"
                className="flex flex-col gap-3 w-full py-2"
                submitButtonLoading={isLoading}
                onSubmit={handleFormSubmission}
                showSubmit={false}
            />
        </div>
    );
});

export { CreateLinkForm };
