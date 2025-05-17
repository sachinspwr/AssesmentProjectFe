import { VModal } from '@components/organisms';
import ConfirmAction from '@components/organisms/assessment/confirm-action/confirm-action.organisms';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { TestSettingOptionResponseDTO } from '@dto/response';
import { useRef, useState } from 'react';
import { useDeleteTestSettingsOptionMutation } from 'store/slices/test-setting-option.slice';
import ManageSettings from './manage-settings.component';

type SettingsListProps = {
  data: TestSettingOptionResponseDTO[];
  loading: boolean;
  onDeleteSuccess: () => void;
  onAddSuccess: () => void;
};

function SettingsList({ data, loading, onDeleteSuccess, onAddSuccess }: SettingsListProps) {
  console.log(data);
  const testId = '""';
  const [deleteSetting] = useDeleteTestSettingsOptionMutation(testId);
  const [settingIdToDelete, setSettingIdToDelete] = useState<string | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [settingToEdit, setsettingToEdit] = useState<TestSettingOptionResponseDTO | null>(null);

  const formSubmitRef = useRef<(() => void) | null>(null);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false);

  const columns: VTableColumn<TestSettingOptionResponseDTO>[] = [
    { key: 'category', label: 'Category', sortable: true, searchable: true },
    { key: 'description', label: 'Description', sortable: true, searchable: true },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const val = row.value;
        if (typeof val === 'boolean') {
          return val ? 'true' : 'false';
        }
        return val?.toString() ?? '';
      },
    },
    { key: 'valueType', label: 'Value Type', sortable: true, searchable: true },
  ];

  const openAddModal = () => {
    setsettingToEdit(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (item: TestSettingOptionResponseDTO) => {
    setsettingToEdit(item);
    setIsFormModalOpen(true);
  };

  const handleModalSubmit = () => {
    setIsFormModalOpen(false);
    setTimeout(() => {
      if (settingIdToDelete) {
        handleDelete(settingIdToDelete);
      }
    }, 20);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deleteSetting({ testId, id }).unwrap();
      onDeleteSuccess();
      console.log('Setting deleted successfully');
    } catch (error) {
      console.error('Failed to delete instruction:', error);
    }
  };

  return (
    <>
      <VTable
        title="Settings"
        data={data ?? []}
        columns={columns}
        itemsPerPage={8}
        loading={loading}
        emptyState={<div>No Settings Found!</div>}
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
              setSettingIdToDelete(id as string);
              setIsConfirmDeleteModalOpen(true);
            },
          },
          {
            action: 'create',
            label: 'Add Test Setting',
            responder: openAddModal,
          },
        ]}
        tableClassName="table-fixed w-full"
      />

      <ConfirmAction
        title="Confirm Deletion"
        message="Are you sure you want to delete this setting?"
        onSubmit={handleModalSubmit}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        isOpen={isConfirmDeleteModalOpen}
      />

      <VModal
        title={settingToEdit ? 'Edit Setting' : 'Add Setting'}
        onClose={() => setIsFormModalOpen(false)}
        isOpen={isFormModalOpen}
        onSubmit={() => {
          formSubmitRef.current?.(); // manually trigger form submit
        }}
        okButtonLabel={settingToEdit ? 'Update' : 'Save'}
        isLoading={formIsSubmitting}
      >
        <ManageSettings
          settingToEdit={settingToEdit}
          onCancel={() => setIsFormModalOpen(false)}
          data={data}
          onSuccess={() => {
            onAddSuccess();
            setIsFormModalOpen(false);
          }}
          onSubmitRef={formSubmitRef}
          setIsSubmitting={setFormIsSubmitting}
        />
      </VModal>
    </>
  );
}

export default SettingsList;
