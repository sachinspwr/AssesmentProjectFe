import { VICon, VStatus } from "@components/atoms";
import { VTableColumn } from "@components/organisms";
import VTable from "@components/organisms/table/v-table.organism";
import { UserTestResultResponseDTO } from "@dto/response/user-test-result.response.dto";
import { ResultStatus } from "@utils/enums";
import { defaultFormatDtTm } from "@utils/index";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type UserTestResultListProps = {
    data: UserTestResultResponseDTO[];
    loading: boolean;
    noDataMessage?: string;
};


function UserTestResultList ({ data, loading, noDataMessage }: UserTestResultListProps) {
    const navigate = useNavigate();

    const columns: VTableColumn<UserTestResultResponseDTO>[] = [
        { key: 'testTitle', label: 'Assessment Title', sortable: true, searchable: true },
        { key: 'userFirstName', label: 'First Name', sortable: true, searchable: true },
        { key: 'userLastName', label: 'Last Name', sortable: true, searchable: true },
        {
            key: 'status',
            label: 'Status',
            customRender: (row: UserTestResultResponseDTO) => (
                <VStatus
                  label={row.status}
                  type={
                    row.status === ResultStatus.Passed
                      ? 'positive'
                      : row.status === ResultStatus.Under_Review
                        ? 'warning'
                        : 'negative'
                  }
                ></VStatus>
            ),
        },
        { key: 'completedAt', 
            label: 'Completed At', 
            customRender: (row: UserTestResultResponseDTO) => <span>{defaultFormatDtTm(row?.completedAt)}</span>,
            sortable: true, 
            searchable: true 
        },
        {
            key: 'action',
            label: 'Actions',
            customRender: (row: UserTestResultResponseDTO) => (
                <VICon
                  className="text-theme-muted"
                  icon={FiEye}
                  onClick={() => navigate(`/test-results/${row?.id}`)}
                ></VICon>
            ),
        },

    ];

    return(
        <>
        
        <VTable
                title="Test Assessment"
                data={data ?? []}
                columns={columns}
                itemsPerPage={8}
                loading={loading}
                emptyState={<div>{loading ? '' : (noDataMessage || 'No Users Found!')}</div>}
                getId={(x) => x.id}
                tableClassName="table-fixed w-full"
            />
            
        </>
    )
}

export default UserTestResultList;