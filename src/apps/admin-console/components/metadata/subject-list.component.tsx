import { VModal } from '@components/organisms';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { SubjectResponseDTO } from '@dto/response/subject-response.dto';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteSubjectMutation } from 'store/slices/subject.slice';
import ManageSubject from './manage-subjects.component';


type SubjectListProps = {
  data: SubjectResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function SubjectList({ data, loading, onDeleteSuccess, onAddSuccess }: SubjectListProps) {

  const [deleteSubject] = useDeleteSubjectMutation();
  const [subjectIdToDelete, setSubjectIdToDelete] = useState<string | null>(null);
  const [subjectToEdit, setSubjectToEdit] = useState<SubjectResponseDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const openAddModal = () => {
    setSubjectToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: SubjectResponseDTO) => {
    setSubjectToEdit(item);
    setIsFormModalOpen(true);
  }; 

  const columns: VTableColumn<SubjectResponseDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true, className: 'w-[200px]'},
    { key: 'description', label: 'Description', sortable: true, searchable: true, className: 'w-[700px]'}
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteSubject({ id }).unwrap();
      onDeleteSuccess();
    } catch (error) {
      console.error('Failed to delete subject:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (subjectIdToDelete) {
        handleDelete(subjectIdToDelete);
      }
    }, 20);
  }; 

  return (
    <>
      <VTable
        title="Subjects"
        data={data ?? []}
        columns={columns}
        itemsPerPage={8}
        loading={loading}
        emptyState={<div>No Subjects Found!</div>}
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
              setSubjectIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            
            },
          },
          {
            action: 'create',
            label: 'Add Subject',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this subject?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={subjectToEdit ? 'Edit Subject' : 'Add Subject'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={subjectToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageSubject
          subjectToEdit={subjectToEdit}
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

export default SubjectList;
