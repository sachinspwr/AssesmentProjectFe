import { VFormFields } from '@types';
import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { VButton } from '@components/atoms';
import { TicketCategory, TicketPriority, TicketStatus } from '@utils/enums';
import { VFormFieldData } from '@types';

interface TicketUpdateFormProps {
    assignedToOptions: { label: string; value: string }[];
    initialValues: VFormFieldData;
    onSubmit: (formData: VFormFieldData) => Promise<void>;
    isSubmitting: boolean;
}

export function TicketUpdateForm({
    assignedToOptions,
    initialValues,
    onSubmit,
    isSubmitting,
}: TicketUpdateFormProps) {
    const formConfig: VFormFields[] = [
        {
            type: 'select',
            name: 'assignedToId',
            label: 'Assigned To',
            position: '1 1 3',
            placeholder:'Select Assigne',
            options: assignedToOptions,
            required: true,
        },
        {
            type: 'select',
            name: 'priority',
            label: 'Priority',
            position: '1 4 2',
            options: Object.keys(TicketPriority).map((key) => ({
                label: TicketPriority[key as keyof typeof TicketPriority],
                value: key,
            })),
        },
        {
            type: 'select',
            name: 'category',
            label: 'Category',
            position: '1 6 2',
            options: Object.keys(TicketCategory).map((key) => ({
                label: TicketCategory[key as keyof typeof TicketCategory],
                value: key,
            })),
        },
        {
            type: 'select',
            name: 'status',
            label: 'Status',
            position: '1 8 2',
            options: Object.keys(TicketStatus).map((key) => ({
                label: TicketStatus[key as keyof typeof TicketStatus],
                value: key,
            })),
        },
        {
            type: 'custom',
            name: 'Submit',
            position: '1 10 2',
            customContent: (
                <VButton type="submit" isLoading={isSubmitting} className="mt-8">
                    Update
                </VButton>
            ),
        },
    ];

    return (
        <VDynamicForm
            config={formConfig}
            onSubmit={onSubmit}
            initialValues={initialValues}
        />
    );
}