import { useLoggedInUser } from '@hooks';
import { TicketCategory, TicketPriority, TicketStatus } from '@utils/enums';
import { useNavigate } from 'react-router-dom';
import { useCreateTicketMutation } from 'store/slices/support.slice';
import { VFormFieldData, VFormFields } from 'types/form-field';
import { VDynamicForm } from '../dynamic-form/v-dynamic-form.organism';
import { VButton } from '@components/atoms/button/v-button.atom';
import { TicketRequestDTO } from '@dto/request';

type TicketFormProps = {
  onCancel?: () => void;
};

export function TicketForm({ onCancel }: TicketFormProps) {
  const navigate = useNavigate();
  const user = useLoggedInUser();
  const [createTicket, { isLoading }] = useCreateTicketMutation();

  const ticketFormConfig: VFormFields[] = [
    {
      type: 'select',
      name: 'category',
      label: 'Ticket Category',
      placeholder: 'Select category',
      required: true,
      options: Object.values(TicketCategory).map((value) => ({
        value,
        label: value,
      })),
      position: '1 1 6',
    },
    {
      type: 'select',
      name: 'priority',
      label: 'Select Priority',
      placeholder: 'Select priority',
      required: true,
      options: Object.values(TicketPriority).map((value) => ({
        value,
        label: value,
      })),
      position: '1 7 4',
    },
    {
      type: 'text',
      name: 'contactMobile',
      label: 'Mobile No.',
      placeholder: 'Enter mobile no.',
      position: '2 1 6',
    },
    {
      type: 'text',
      name: 'subject',
      label: 'Subject',
      placeholder: 'Mention ticket subject',
      required: true,
      position: '2 7 6',
    },
    {
      type: 'text-area',
      name: 'description',
      label: 'Description',
      placeholder: 'Enter description',
      required: true,
      textAreaRows: 5,
      position: '3 1 12',
    },
    {
      type: 'discard',
      name: 'cancel',
      label: 'Cancel',
      onClick: () => (onCancel ? onCancel() : navigate(-1)),
      position: '4 1 2',
      classNames: '!w-full',
    },
    {
      type: 'custom',
      name: 'submit',
      position: '4 3 4',
      disabled: isLoading,
      customContent: (
        <VButton type="submit" isLoading={isLoading} className="!w-full">
          Create Ticket
        </VButton>
      ),
    },
  ];

  const handleSubmit = async (fieldData: VFormFieldData) => {
    if (!user?.id) return;

    const newTicket: TicketRequestDTO = {
      ...fieldData,
      userId: user.id,
      status: TicketStatus.Open,
      isPublic: true,
      subject: '',
      description: '',
      priority: TicketPriority.Low,
      category: TicketCategory.Technical,
      id: '',
    };
    try {
      await createTicket(newTicket).unwrap();
      onCancel ? onCancel() : navigate(-1);
      navigate('/support', { state: { success: true } });
    } catch (error) {
      console.error('Ticket creation failed:', error);
    }
  };

  return (
    <div className="p-2">
      <VDynamicForm config={ticketFormConfig} onSubmit={handleSubmit} spacing={4} />
    </div>
  );
}

export default TicketForm;
