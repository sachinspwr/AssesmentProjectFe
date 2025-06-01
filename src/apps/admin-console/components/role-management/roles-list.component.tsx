import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { useState } from 'react';
import { RolesResponseDTO } from '@dto/response/roles.response.dto';
import { useNavigate } from 'react-router-dom';
import { useDeleteRoleMutation } from 'store/slices/roles.slice';
import toast from 'react-hot-toast';
import { VSwitch } from '@components/atoms';

type RolesListProps = {
  data: RolesResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
};

function RolesList({ data, loading, onDeleteSuccess }: RolesListProps) {
  const navigate = useNavigate();  
  const [deleteRole] = useDeleteRoleMutation();
  const [roleIdToDelete, setRoleIdToDelete] = useState<string | null>(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const columns: VTableColumn<RolesResponseDTO>[] = [
    { key: 'name', label: 'Name', sortable: true, searchable: true },
    {
      key: 'isDefault',
      label: 'Default',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const val = row.isDefault;

        return (
          <VSwitch
            checked={!!val}
            onChange={(newVal) => {
              console.log(`Switch toggled for ID ${row.id}: ${newVal}`);
            }}
          />
        );
      },
    }
  ];

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteRole({ id }).unwrap();
      onDeleteSuccess();
      console.log('Role deleted successfully');
    } catch (error) {
      console.error('Failed to delete role:', error);
      toast.error((error as Error).message);
    }
  };

  const handleModalSubmit = () => {
    setIsConfirmDeleteModalOpen(false);
    setTimeout(() => {
      if (roleIdToDelete) {
        handleDelete(roleIdToDelete);
      }
    }, 20);
  };
  

  return (
    <>
      <VTable
        title="Roles"
        data={data ?? []}
        columns={columns}
        itemsPerviewMode={8}
        loading={loading}
        emptyState={<div>No Roles Found!</div>}
        getId={(x) => x.id}
        actionsConfig={[
          {
            action: 'edit',
            responder: (id?: string) => {
              navigate(`/admin-console/roles/${id}`);
            },
          },
          {
            action: 'delete',
            responder: (id?: string) => {
              setRoleIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
              action: 'create',
              label: 'Create Role',
              responder: () => {
                  navigate('/admin-console/roles/0');
              }
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this role?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />
    </>
  );
}

export default RolesList;
