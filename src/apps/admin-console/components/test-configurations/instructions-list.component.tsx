import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { TestInstructionOptionResponseDTO } from '@dto/response/test-instruction-option-response.dto';
import { useRef, useState } from 'react';
import { useDeleteInstructionsOptionMutation } from 'store/slices/test-instruction-option.slice';
import { VModal } from '@components/organisms';
import ManageInstructions from './manage-instructions.component';
import toast from 'react-hot-toast';

type InstructionsListProps = {
  data: TestInstructionOptionResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function InstructionsList({ data, loading, onDeleteSuccess, onAddSuccess }: InstructionsListProps) {
  const testId = '""';
  const [deleteInstruction] = useDeleteInstructionsOptionMutation(testId);
  const [instructionIdToDelete, setInstructionIdToDelete] = useState<string | null>(null);
  const [instructionToEdit, setInstructionToEdit] = useState<TestInstructionOptionResponseDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const openAddModal = () => {
    setInstructionToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: TestInstructionOptionResponseDTO) => {
    setInstructionToEdit(item);
    setIsFormModalOpen(true);
  };

  const columns: VTableColumn<TestInstructionOptionResponseDTO>[] = [
    { key: 'category', label: 'Category', sortable: true, searchable: true, className: 'w-[220px]' },
    { key: 'description', label: 'Description', sortable: true, searchable: true, className: 'w-[600px]' },
    {
      key: 'isRecommended',
      label: 'Is Recommended',
      sortable: true,
      searchable: true,
      className: 'w-[250px]',
      customRender: (row) => {
        const val = row.isRecommended;
        if (typeof val === 'boolean') {
          return val ? 'true' : 'false';
        }
        return val?.toString() ?? '';
      },
    },
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteInstruction({ testId, id }).unwrap();
      onDeleteSuccess();
      console.log('Instruction deleted successfully');
    } catch (error) {
      console.error('Failed to delete instruction:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (instructionIdToDelete) {
        handleDelete(instructionIdToDelete);
      }
    }, 20);
  };

  return (
    <>
      <VTable
        title="Instructions"
        data={data ?? []}
        columns={columns}
        itemsPerPage={8}
        loading={loading}
        emptyState={<div>No Instructions Found!</div>}
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
              setInstructionIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Instruction',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this instruction?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={instructionToEdit ? 'Edit Instruction' : 'Add Instruction'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={instructionToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageInstructions
          instructionToEdit={instructionToEdit}
          data={data}
          onClose={() => setIsFormModalOpen(false)}
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

export default InstructionsList;
