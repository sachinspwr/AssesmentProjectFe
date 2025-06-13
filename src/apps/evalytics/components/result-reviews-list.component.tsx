import { VICon, VStatus } from '@components/atoms';
import { VTableColumn } from '@components/organisms';
import VTable from '@components/organisms/table/v-table.organism';
import { UserTestResultResponseDTO } from '@dto/response/user-test-result.response.dto';
import { ResultStatus, TestSessionStatus } from '@utils/enums';
import { defaultFormatDtTm } from '@utils/index';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

type ReviewResultListProps = {
  data: UserTestResultResponseDTO[];
  loading: boolean;
  noDataMessage?: string;
};

function ResultReviewsList({ data, loading, noDataMessage }: ReviewResultListProps) {
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
              : row.status === ResultStatus.Under_Review || row.status === ResultStatus.Pending || row.status === ResultStatus.Processing
                ? 'warning'
                : 'negative'
          }
        ></VStatus>
      ),
    },
    {
      key: 'completedAt',
      label: 'Completed At',
      customRender: (row: UserTestResultResponseDTO) => <span>{defaultFormatDtTm(row?.completedAt)}</span>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'action',
      label: 'Actions',
      customRender: (row: UserTestResultResponseDTO) => (
        <VICon className="text-theme-muted" icon={FiEye} onClick={() => navigate(`./test-results/${row?.id}`)}></VICon>
      ),
    },
  ];

  return (
    <>
      <VTable
        title="Reviews"
        data={data ?? []}
        columns={columns}
        loading={loading}
        itemsPerPage={8}
        emptyState={<div>{loading ? '' : (noDataMessage || 'No Result Found!')}</div>}        getId={(x) => x.id}
        tableClassName="table-fixed w-full"
      />
    </>
  );
}

export default ResultReviewsList;
