import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { DynamicForm } from '@components/organisms';
import { FormFields, FormFieldData } from '@types';
import { MdMarkEmailRead, MdPerson, MdPersonOutline } from 'react-icons/md';
import { useMutation } from 'react-query';
import { apiService } from '@services/api.service';
import { ApiResponse, TestLinkResponseDTO } from '@dto/response';
import { useSearch } from '@hooks';
import { SearchRequestDTO, TestLinkRequestDTO } from '@dto/request';
import { MatchOn, Operator } from '@utils/enums';
import toast from 'react-hot-toast';

type TestInvitationFormProps = {
    testId: string;
    className?: string;
    onDone?: () => void;
};

const TestInvitationForm = forwardRef<{ submit: () => void }, TestInvitationFormProps>(({ testId, className, onDone }: TestInvitationFormProps, ref) => {
    const formRef = useRef<{ submit: () => void }>(null);
    const [, setTestLinkId] = useState<string | undefined>(undefined);
    const [formConfig, setFormConfig] = useState<FormFields[]>([]);

    // Fetch test links
    const { mutate: loadLinks, data: testLinks } = useSearch<TestLinkRequestDTO, TestLinkResponseDTO[]>('/tests/links/search');

    // Handle form submission
    const { mutate } = useMutation<ApiResponse, Error, FormFieldData>(
        async (data) => await apiService.post<ApiResponse>('/tests/links/invite', data),
        {
            onSuccess: (variables: ApiResponse) => {
                toast.success(variables.message);
                onDone && onDone();
            }
        }
    );

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.submit();
        }
    }));

    useEffect(() => {
        const criteria = {
            criteria: [{
                field: 'testId',
                operator: Operator.OR,
                matchOn: MatchOn.EQUAL,
                value: testId
            }],
            limit: 100,
            offset: 0,
            order: []
        } as SearchRequestDTO<TestLinkRequestDTO>;

        loadLinks(criteria);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update form config when test links are loaded
    useEffect(() => {
        if (testLinks) {
            setFormConfig([
                {
                    name: 'testLinkId',
                    label: 'Test Link',
                    type: 'select',
                    options: testLinks.map(link => ({ value: link.id, label: link.testLinkName })),
                    placeholder: 'Select a test link',
                },
                {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'text',
                    fieldWith: 'icon',
                    icon: MdPerson,
                    required: true,
                    placeholder: 'First name',
                },
                {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'text',
                    fieldWith: 'icon',
                    icon: MdPersonOutline,
                    required: true,
                    placeholder: 'Last name',
                },
                {
                    name: 'email',
                    label: 'Email Address',
                    type: 'email',
                    fieldWith: 'icon',
                    icon: MdMarkEmailRead,
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

            ]);
        }
    }, [testLinks]);

    // Handle test link selection
    const handleFormSubmission = (formData: FormFieldData) => {
        if (formData.testLinkId) {
            setTestLinkId(formData.testLinkId as string);
        }
        mutate(formData);
    };

    return (
        <div className={`w-full ${className}`}>
            <DynamicForm
                ref={formRef}
                showSubmit={false}
                config={formConfig}
                className="flex flex-col gap-3 w-full py-2"
                onSubmit={handleFormSubmission}
            />
        </div>
    );
});

export { TestInvitationForm };
