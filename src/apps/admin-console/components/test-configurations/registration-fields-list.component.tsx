import { VModal } from '@components/organisms';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { RegistationFieldsRequestDTO } from '@dto/request/registrartion-fields.request.dto';
import { useRef, useState } from 'react';
import { useDeleteRegistrationFieldMutation } from 'store/slices/registration-fields.slice';
import { RegistrationFieldsResponseDTO } from '@dto/response/registration-fields.response.dto';
import ManageRegistrationFields from './manage-registration-fields.component';

type RegistrationFieldsListProps = {
  data: RegistationFieldsRequestDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function RegistrationFieldsList({ data, loading, onDeleteSuccess, onAddSuccess }: RegistrationFieldsListProps) {
  const [deleteRegistrationField] = useDeleteRegistrationFieldMutation();
  const [fieldIdToDelete, setFieldIdToDelete] = useState<string | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [registrationFieldDataToEdit, setRegistrationFieldDataToEdit] = useState<RegistrationFieldsResponseDTO | null>(
    null
  );

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const columns: VTableColumn<RegistationFieldsRequestDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true },
    { key: 'type', label: 'Type', sortable: true, searchable: true },
    { key: 'label', label: 'Label', sortable: true, searchable: true },
    { key: 'placeholder', label: 'Placeholder', sortable: true, searchable: true },
  ];

  const openAddModal = () => {
    setRegistrationFieldDataToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: RegistrationFieldsResponseDTO) => {
    setRegistrationFieldDataToEdit(item);
    setIsFormModalOpen(true);
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (fieldIdToDelete) {
        handleDelete(fieldIdToDelete);
      }
    }, 20);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteRegistrationField({ id }).unwrap();
      onDeleteSuccess();
      console.log('Registration field deleted successfully');
    } catch (error) {
      console.error('Failed to delete registration field:', error);
    }
  };

  return (
    <>
      <VTable
        title="Registration Fields"
        data={data ?? []}
        columns={columns}
        itemsPerPage={8}
        loading={loading}
        emptyState={<div>No Registration Fields Found!</div>}
        getId={(x) => x.id}
        actionsConfig={[
          {
            action: 'edit',
            responder: (id?: string) => {
              const item = data.find((i) => i.id === id);
              if (item) openEditModal(item);
            },
          },
          {
            action: 'delete',
            responder: (id?: string) => {
              console.log('Delete clicked for id:', id);
              setFieldIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Registation Field',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this registration field?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={registrationFieldDataToEdit ? 'Edit Registration Field' : 'Add Registration Field'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={registrationFieldDataToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageRegistrationFields
          onCancel={() => setIsFormModalOpen(false)}
          data={data}
          registrationFieldDataToEdit={registrationFieldDataToEdit}
          onSuccess={() => {
            setIsFormModalOpen(false);
            onAddSuccess();
          }}
          onSubmitRef={formSubmitRef}
          setIsSubmitting={setFormIsSubmitting}
        />
      </VModal>
    </>
  );
}

export default RegistrationFieldsList;
