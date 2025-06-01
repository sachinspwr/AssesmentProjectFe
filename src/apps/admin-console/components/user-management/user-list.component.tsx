import { VTableColumn } from "@components/organisms";
import VTable from "@components/organisms/table/v-table.organism";
import { UserResponseDTO } from "@dto/response";

type UserListProps = {
  data: UserResponseDTO[];
  loading: boolean;
  noDataMessage?: string;
};

function UserList ({ data, loading, noDataMessage }: UserListProps) {

    const columns: VTableColumn<UserResponseDTO>[] = [
        { key: 'firstName', label: 'First Name', sortable: true, searchable: true },
        { key: 'lastName', label: 'Last Name', sortable: true, searchable: true },
        { key: 'email', label: 'Email', sortable: true, searchable: true }
    ];
    
    return(
        <>
            <VTable
                title="Users"
                data={data ?? []}
                columns={columns}
                itemsPerviewMode={8}
                loading={loading}
                emptyState={<div>{loading ? '' : (noDataMessage || 'No Questions Found!')}</div>}
                getId={(x) => x.id}
                actionsConfig={[
                {
                    action: 'edit',
                    responder: (id?: string) => {
                    alert(id);
                    },
                }
                ]}
                tableClassName="table-fixed w-full"
            />
        </>
    )
}

export default UserList;