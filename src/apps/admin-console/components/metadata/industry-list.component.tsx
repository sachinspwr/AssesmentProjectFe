import { IndustryResponseDTO } from '@dto/response/industry-response.dto';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { useDeleteIndustryMutation } from 'store/slices/industry.slice';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import { VModal } from '@components/organisms';
import ManageIndustries from './manage-industries.component';


type IndustryListProps = {
  data: IndustryResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function IndustryList({ data, loading, onDeleteSuccess, onAddSuccess }: IndustryListProps) {

  const [deleteIndustry] = useDeleteIndustryMutation();
  const [industryIdToDelete, setIndustryIdToDelete] = useState<string | null>(null);
  const [industryToEdit, setIndustryToEdit] = useState<IndustryResponseDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

   const openAddModal = () => {
    setIndustryToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: IndustryResponseDTO) => {
    setIndustryToEdit(item);
    setIsFormModalOpen(true);
  };  

  const columns: VTableColumn<IndustryResponseDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true},
    { key: 'description', label: 'Description', sortable: true, searchable: true}
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteIndustry({id}).unwrap();
      onDeleteSuccess();
    } catch (error) {
      console.error('Failed to delete industry:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (industryIdToDelete) {
        handleDelete(industryIdToDelete);
      }
    }, 20);
  };

  return (
    <>
      <VTable
        title="Industries"
        data={data ?? []}
        columns={columns}
        itemsPerPage={8}
        loading={loading}
        emptyState={<div>No Industries Found!</div>}
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
              setIndustryIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Industry',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this industry?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={industryToEdit ? 'Edit Industry' : 'Add Industry'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={industryToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageIndustries
          industryToEdit={industryToEdit}
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

export default IndustryList;
