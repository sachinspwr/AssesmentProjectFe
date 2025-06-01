import { VModal } from '@components/organisms';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryRoleResponseDTO } from '@dto/response/industry-role-response.dto';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteIndustryRoleMutation } from 'store/slices/industry-role.slice';
import ManageDomainRoles from './manage-domain-roles.component';


type DomainRoleListProps = {
  domains: DomainResponseDTO[];
  data: IndustryRoleResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function DomainRolesList({ data, loading, onDeleteSuccess, onAddSuccess, domains }: DomainRoleListProps) {

  const enrichedData = data.map((industryRole) => ({
    ...industryRole,
    domainName: domains.find((dom) => dom.id === industryRole.domainId)?.name || industryRole.domainId
  }));

  const domainId = '""';
  const [deleteDomainRole] = useDeleteIndustryRoleMutation();
  const [domainRoleIdToDelete, setDomainRoleIdToDelete] = useState<string | null>(null);
  const [domainRoleToEdit, setDomainRoleToEdit] = useState<IndustryRoleResponseDTO | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const openAddModal = () => {
    setDomainRoleToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: IndustryRoleResponseDTO) => {
    setDomainRoleToEdit(item);
    setIsFormModalOpen(true);
  }; 

  const columns: VTableColumn<IndustryRoleResponseDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true},
    { 
      key: 'domainId', 
      label: 'Domain', 
      sortable: true, 
      searchable: true,
      customRender: (row) => row.domainName ?? row.domainId
    },
    { key: 'description', label: 'Description', sortable: true, searchable: true}
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteDomainRole({ domainId, id }).unwrap();
      onDeleteSuccess();
    } catch (error) {
      console.error('Failed to delete domain role:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (domainRoleIdToDelete) {
        handleDelete(domainRoleIdToDelete);
      }
    }, 20);
  }; 

  return (
    <>
      <VTable
        title="Domain Roles"
        data={enrichedData ?? []}
        columns={columns}
        itemsPerviewMode={8}
        loading={loading}
        emptyState={<div>No Domain Roles Found!</div>}
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
              setDomainRoleIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Domain Role',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this domain role?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={domainRoleToEdit ? 'Edit Domain Role' : 'Add Domain Role'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={domainRoleToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageDomainRoles
          domainRoleToEdit={domainRoleToEdit}
          domains={domains}
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

export default DomainRolesList;
