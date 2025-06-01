import { VDynamicForm, VModal } from "@components/organisms";
import { VButton } from "@components/atoms";
import { useMemo, useState } from "react";
import { VFormFields, VFormFieldData } from "@types";
import { useLoggedInUser } from "@hooks";
import toast from "react-hot-toast";
import { mapper } from "mapper";
import { Team } from "models/tenant/team.model";
import { TenantTeamRequestDTO } from "@dto/request/tenant-team-request.dto";
import { TenantTeamResponseDTO } from "@dto/response/tenent-team-response.dto";
import VTable, { VTableColumn } from "@components/organisms/table/v-table.organism";
import { Tenant } from "models/tenant/tenant.model";
import { useFetchRolesQuery } from "store/slices/roles.slice";
import AddTeamUserModal from "apps/admin-console/components/tenant-management/team-user-form.component";
import TeamUsersTable from "apps/admin-console/components/tenant-management/team-users.component";
import { useCreateTenantTeamMutation, useDeleteTenantTeamMutation, useFetchTenantTeamsQuery, useUpdateTenantTeamMutation } from "store/slices/tenant-team.slice";
import { useFetchTenantUsersQuery } from "store/slices/tenants.slice";

type TenantTeamDetailsProps = {
  tenant?: Tenant;
  renderMode: "add" | "edit";
};

function TenantTeamDetails({ tenant }: TenantTeamDetailsProps) {
  const tenantId = tenant?.id ?? "";
  useLoggedInUser();

  const [modalState, setModalState] = useState({
    createTeam: false,
    addUser: false,
  });
  const [selectedTeam, setSelectedTeam] = useState<TenantTeamResponseDTO | null>(null);
  const [viewingTeamId, setViewingTeamId] = useState<string | null>(null);
  const { data: teamList = [], refetch, isLoading: isFetching } = useFetchTenantTeamsQuery(tenantId);
  const { data: userList = [] } = useFetchTenantUsersQuery(tenantId);
  const { data: roleList = [] } = useFetchRolesQuery();
  const [createTeam, { isLoading: isCreating }] = useCreateTenantTeamMutation();
  const [updateTeam, { isLoading: isUpdating }] = useUpdateTenantTeamMutation();
  const [deleteTeam, { isLoading: isDeleting }] = useDeleteTenantTeamMutation();

  const isEditing = selectedTeam !== null;
  const isLoadingState = isCreating || isUpdating || isDeleting;

  const viewingTeam = useMemo(() => teamList.find(team => team.id === viewingTeamId), [teamList, viewingTeamId]);

  const teamOptions = useMemo(() => teamList.map(team => ({
    label: team.name,
    value: team.id!,
  })), [teamList]);

  const userOptions = useMemo(() => userList.map(user => ({
    label: `${user.firstName} ${user.lastName}`,
    value: user.id!,
  })), [userList]);

  const roleOptions = useMemo(() => roleList.map(role => ({
    label: role.name,
    value: role.id!,
  })), [roleList]);

  const teamFormConfig: VFormFields[] = useMemo(() => [
    {
      name: "name",
      label: "Team Name",
      type: "text",
      placeholder: "Enter team name",
      required: true,
      position: "1 1 6",
    },
    {
      name: "areaOfOpration",
      label: "Area of Operation",
      type: "text",
      placeholder: "Enter area of operation",
      required: true,
      position: "1 7 6",
    },
    {
      name: "description",
      label: "Description",
      type: "text-area",
      placeholder: "Enter team description",
      required: true,
      position: "2 1 6",
    },
    {
      name: "isPublic",
      label: "Is Public?",
      type: "switch",
      position: "2 7 6",
    },
    {
      name: "cancel",
      type: "custom",
      customContent: (
        <VButton variant="secondary" onClick={() => setModalState(s => ({ ...s, createTeam: false }))}>
          Cancel
        </VButton>
      ),
      position: "3 1 2",
    },
    {
      name: "save",
      type: "custom",
      customContent: (
        <VButton type="submit" isLoading={isLoadingState}>
          Create
        </VButton>
      ),
      position: "3 3 3",
    },
  ], [isLoadingState]);

  const columns: VTableColumn<TenantTeamResponseDTO>[] = useMemo(() => [
    { key: "name", label: "Name", sortable: true },
    { key: "areaOfOpration", label: "Operation", sortable: true },
    { key: "description", label: "Description", sortable: true },
    {
      key: "id",
      label: "Users",
      customRender: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewingTeamId(row.id === viewingTeamId ? null : row.id!);
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          {row.id === viewingTeamId ? "Hide" : "View"}
        </button>
      ),
    },
  ], [viewingTeamId]);

  const handleFormSubmit = async (formData: VFormFieldData) => {
    try {
      const requestData = { ...formData, tenantId, id: selectedTeam?.id } as Team;
      const teamReq = mapper.map(requestData, Team, TenantTeamRequestDTO);
      if (isEditing) {
        await updateTeam({
          tenantId,
          teamId: selectedTeam!.id as string,
          payload: teamReq
        }).unwrap();
        toast.success("Team updated successfully");
      } else {
        await createTeam({ tenantId, payload: teamReq }).unwrap();
        toast.success("Team created successfully");
      }
      // mapper.map(teamCreated, TenantTeamResponseDTO, Team);
      setModalState(s => ({ ...s, createTeam: false }));
      setSelectedTeam(null);
      setViewingTeamId(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create team.");
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (!confirm("Are you sure you want to delete this team?")) return;

    try {
      await deleteTeam({ tenantId, teamId }).unwrap();
      toast.success("Team deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete team");
    }
  };

  const mapTeamToFormData = (team: TenantTeamResponseDTO): VFormFieldData => ({
    name: team.name ?? '',
    areaOfOpration: team.areaOfOpration ?? '',
    description: team.description ?? '',
    isPublic: team.isPublic ?? false,
  });

  return (
    <div>
      <div className="flex justify-end gap-4 mb-4">
        <div className='w-40'>
          <VButton onClick={() => setModalState(s => ({ ...s, createTeam: true }))}>
            Create Team
          </VButton>
        </div>
        <div className='w-48'>
          <VButton variant="secondary" onClick={() => setModalState(s => ({ ...s, addUser: true }))}          >
            Add User to Team
          </VButton>
        </div>
      </div>

      {viewingTeamId ? (
        <TeamUsersTable
          tenantId={tenantId}
          teamId={viewingTeamId}
          teamName={viewingTeam?.name || "Team"}
          onBack={() => setViewingTeamId(null)}
        />
      ) : (
        <VTable<TenantTeamResponseDTO>
          title="Tenant Teams"
          data={teamList}
          columns={columns}
          loading={isFetching}
          itemsPerviewMode={10}
          getId={(row) => row.id as string}
          actionsConfig={[
            {
              action: 'edit',
              responder: (id) => {
                const teamToEdit = teamList.find(team => team.id === id);
                if (teamToEdit) {
                  setSelectedTeam(teamToEdit);
                  setModalState(s => ({ ...s, createTeam: true }));
                }
              },
            },
            {
              action: 'delete',
              responder: (id) => handleDeleteTeam(id as string),
            },
          ]}
        />
      )}

      <VModal
        isOpen={modalState.createTeam}
        onClose={() => {
          setModalState(s => ({ ...s, createTeam: false }))
          setSelectedTeam(null);
        }}
        title={isEditing ? "Edit Team" : "Create Team"}
        width={40}
        showFooter={false}
      >
        <VDynamicForm config={teamFormConfig} onSubmit={handleFormSubmit} initialValues={selectedTeam ? mapTeamToFormData(selectedTeam) : undefined} />
      </VModal>

      <AddTeamUserModal
        isOpen={modalState.addUser}
        onClose={() => setModalState(s => ({ ...s, addUser: false }))}
        tenantId={tenantId}
        teamOptions={teamOptions}
        userOptions={userOptions}
        roleOptions={roleOptions}
      />
    </div>
  );
}

export default TenantTeamDetails;
