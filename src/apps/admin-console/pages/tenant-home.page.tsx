import { VButton, VICon } from '@components/atoms';
import { VTableColumn } from '@components/organisms';
import VTable from '@components/organisms/table/v-table.organism';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

type Tenant = {
  id: string;
  name: string;
  domain: string;
  status: 'Active' | 'Inactive';
  createdOn: string;
  users: number;
};

const tenants: Tenant[] = [
  {
    id: '1',
    name: 'Acme Corp',
    domain: 'acme.example.com',
    status: 'Active',
    createdOn: '2023-08-01',
    users: 120,
  },
  {
    id: '2',
    name: 'Beta Systems',
    domain: 'beta.example.com',
    status: 'Inactive',
    createdOn: '2022-11-13',
    users: 45,
  },
  {
    id: '3',
    name: 'Gamma Technologies',
    domain: 'gamma.example.com',
    status: 'Active',
    createdOn: '2024-03-05',
    users: 89,
  },
];

const columns: VTableColumn<Tenant>[] = [
  {
    key: 'name',
    label: 'Tenant Name',
    sortable: true,
    searchable: true,
  },
  {
    key: 'domain',
    label: 'Domain',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    customRender: (row) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: 'createdOn',
    label: 'Created On',
    sortable: true,
  },
  {
    key: 'users',
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

function handleView(id: string) {
  console.log('View', id);
}

function handleEdit(id: string) {
  console.log('Edit', id);
}

function handleDelete(id: string) {
  if (confirm('Are you sure you want to delete this tenant?')) {
    console.log('Deleted', id);
  }
}

// eslint-disable-next-line react/function-component-definition
const ManageTenantPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Tenants</h1>
        <VButton className="max-w-44" onClick={() => console.log('Create Tenant')} variant="primary">
          <VICon icon={FaPlus} size={16} />
          Add Tenant
        </VButton>
      </div>

      <VTable<Tenant>
        data={tenants}
        columns={columns}
        itemsPerPage={10}
        title={null}
        getId={(row) => row.id}
        mode="view"
        tableClassName="min-w-full"
        headerWrapperClassName="mb-2"
        paginationWrapperClassName="mt-4"
        emptyState={<div className="text-center py-8">No tenants found.</div>}
      />
    </div>
  );
};

export default ManageTenantPage;
