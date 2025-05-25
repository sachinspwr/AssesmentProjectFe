import { VButton, VICon } from '@components/atoms';
import { VTableColumn } from '@components/organisms';
import VTable from '@components/organisms/table/v-table.organism';
import { TenantsResponseDTO } from '@dto/response/tenants.response.dto';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { clearSelectedTenant, useFetchTenantsQuery } from 'store/slices/tenants.slice';
import { useAppDispatch } from 'store/store';

// eslint-disable-next-line react/function-component-definition
const ManageTenantPage: React.FC = () => {

  const { data: tenants ,isLoading } = useFetchTenantsQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const columns: VTableColumn<TenantsResponseDTO>[] = [
    {
      key: 'name',
      label: 'Tenant Name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      customRender: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created On',
      sortable: true,
    },
    {
      key: 'isPublic',
      label: 'Users',
      sortable: true,
    },
    {
      key: 'id',
      label: 'Actions',
      customRender: (row) => (
        <div className="flex gap-2">
          <VButton size="sm" variant="link" onClick={() => handleView(row.id)}>
            View
          </VButton>
          <VButton size="sm" variant="secondary" onClick={() => handleEdit(row.id)}>
            Edit
          </VButton>
          <VButton size="sm" variant="negative" onClick={() => handleDelete(row.id)}>
            Delete
          </VButton>
        </div>
      ),
    },
  ];


  const handleAddTenant = () => {
    dispatch(clearSelectedTenant());
    navigate('/admin-console/tenants/0');
  };

  function handleEdit(id: string) {
    console.log('Edit', id);
    navigate(`/admin-console/tenants/${id}`);
  }

  function handleView(id: string) {
    console.log('View', id);
  }

  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this tenant?')) {
      console.log('Deleted', id);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Tenants</h1>
        <VButton className="max-w-44" onClick={handleAddTenant} variant="primary">
          <VICon icon={FaPlus} size={16} />
          Add Tenant
        </VButton>
      </div>

      <VTable<TenantsResponseDTO>
        data={tenants?.data || []}
        columns={columns}
        itemsPerPage={10}
        title={null}
        getId={(row) => row.id}
        mode="view"
        tableClassName="min-w-full"
        headerWrapperClassName="mb-2"
        paginationWrapperClassName="mt-4"
        emptyState={<div className="text-center py-8">No tenants found.</div>}
        loading={isLoading}
      />
    </div>
  );
};

export default ManageTenantPage;
