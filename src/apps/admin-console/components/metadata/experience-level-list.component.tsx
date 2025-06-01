import { VModal } from '@components/organisms';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { ExperienceLevelResponseDTO } from '@dto/response/experience-level-response.dto';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteExperienceLevelMutation } from 'store/slices/experience-level.slice';
import ManageExperienceLevel from './manage-experience-level.component';


type ExperienceLevelListProps = {
  data: ExperienceLevelResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function ExperienceLevelList({ data, loading, onDeleteSuccess, onAddSuccess }: ExperienceLevelListProps) {

  const [deleteExperienceLevel] = useDeleteExperienceLevelMutation();
  const [experienceLevelIdToDelete, setExperienceLevelIdToDelete] = useState<string | null>(null);
  const [experienceLevelIdToEdit, setExperienceLevelIdToEdit] = useState<ExperienceLevelResponseDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const openAddModal = () => {
    setExperienceLevelIdToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: ExperienceLevelResponseDTO) => {
    setExperienceLevelIdToEdit(item);
    setIsFormModalOpen(true);
  }; 

  const columns: VTableColumn<ExperienceLevelResponseDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true, className: 'w-[200px]'},
    { key: 'description', label: 'Description', sortable: true, searchable: true, className: 'w-[700px]'}
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteExperienceLevel({ id }).unwrap();
      onDeleteSuccess();
    } catch (error) {
      console.error('Failed to delete experience level:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (experienceLevelIdToDelete) {
        handleDelete(experienceLevelIdToDelete);
      }
    }, 20);
  }; 

  return (
    <>
      <VTable
        title="Experience Level"
        data={data ?? []}
        columns={columns}
        itemsPerviewMode={8}
        loading={loading}
        emptyState={<div>No Experience Level Found!</div>}
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
              setExperienceLevelIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Experience Level',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this experience level?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

     <VModal
        title={experienceLevelIdToEdit ? 'Edit Experience Level' : 'Add Experience Level'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={experienceLevelIdToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageExperienceLevel
          experienceLevelToEdit={experienceLevelIdToEdit}
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

export default ExperienceLevelList;
