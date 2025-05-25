import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import VTable, { VTableColumn } from "@components/organisms/table/v-table.organism";
import { VButton } from "@components/atoms";
import { VTypography } from "@components/molecules/typography/v-typography.mol";
import { UserResponseDTO } from "@dto/response";
import { useFetchTeamUsersQuery, useRemoveTeamUserMutation } from "store/slices/tenant-team.slice";

interface TeamUsersTableProps {
  tenantId: string;
  teamId: string;
  teamName: string;
  onBack: () => void;
}

export default function TeamUsersTable({ tenantId, teamId, teamName, onBack, }: TeamUsersTableProps) {
  const [removingUserId, setRemovingUserId] = useState<string | null>(null);
  const { data: users = [], isLoading: isFetching, refetch } = useFetchTeamUsersQuery({ tenantId, teamId }, { skip: !teamId });
  const [removeTeamUser] = useRemoveTeamUserMutation();

  const handleRemoveUser = useCallback(
    async (userId: string) => {
      setRemovingUserId(userId);
      try {
        await removeTeamUser({ tenantId, teamId, userId }).unwrap();
        toast.success("User removed from team");
        refetch();
      } catch {
        toast.error("Failed to remove user");
      } finally {
        setRemovingUserId(null);
      }
    },
    [tenantId, teamId, removeTeamUser, refetch]
  );

  const columns: VTableColumn<UserResponseDTO>[] = [
    {
      key: "firstName",
      label: "Name",
      sortable: true,
      customRender: (user) => `${user.firstName} ${user.lastName}`,
    },
    { key: "email", label: "Email", sortable: true },
    {
      key: "id",
      label: "Actions",
      customRender: (user) => (
        <VButton
          variant="negative"
          size="sm"
          onClick={() => handleRemoveUser(user.id!)}
          isLoading={removingUserId === user.id}
        >
          Remove
        </VButton>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
        >
          Back to Teams
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <VTypography as="h3">{teamName} Users</VTypography>
          <VTypography as="span" className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">
            {users.length} member{users.length !== 1 ? "s" : ""}
          </VTypography>
        </div>
      </div>

      <VTable
        data={users}
        columns={columns}
        loading={isFetching}
        emptyState={
          <div className="text-center py-4">
            <VTypography as="p">No users in this team yet</VTypography>
          </div>
        }
      />
    </div>
  );
}
