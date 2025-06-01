import { VModal } from '@components/organisms';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryResponseDTO } from '@dto/response/industry-response.dto';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteDomainMutation } from 'store/slices/domain.slice';
import ManageDomains from './manage-domains.component';


type DomainListProps = {
  industries: IndustryResponseDTO[];
  data: DomainResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function DomainList({ data, loading, onDeleteSuccess, onAddSuccess, industries }: DomainListProps) {

  const enrichedData = data.map((domain) => ({
    ...domain,
    industryName: industries.find((ind) => ind.id === domain.industryId)?.name || domain.industryId
  }));

  const [deleteDomain] = useDeleteDomainMutation();
  const [domainIdToDelete, setDomainIdToDelete] = useState<string | null>(null);
  const [domainToEdit, setDomainToEdit] = useState<DomainResponseDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const openAddModal = () => {
    setDomainToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: DomainResponseDTO) => {
    setDomainToEdit(item);
    setIsFormModalOpen(true);
  }; 

  const columns: VTableColumn<DomainResponseDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true},
    { 
      key: 'industryId', 
      label: 'Industry', 
      sortable: true, 
      searchable: true,
      customRender: (row) => row.industryName ?? row.industryId
    },
    { key: 'description', label: 'Description', sortable: true, searchable: true}
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteDomain({ id }).unwrap();
      onDeleteSuccess();
    } catch (error) {
      console.error('Failed to delete domain:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (domainIdToDelete) {
        handleDelete(domainIdToDelete);
      }
    }, 20);
  }; 

  return (
    <>
      <VTable
        title="Domains"
        data={enrichedData ?? []}
        columns={columns}
        itemsPerviewMode={8}
        loading={loading}
        emptyState={<div>No Domains Found!</div>}
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
              setDomainIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Domain',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this domain?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={domainToEdit ? 'Edit Domain' : 'Add Domain'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={domainToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageDomains
          domainToEdit={domainToEdit}
          industries={industries}
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

export default DomainList;
