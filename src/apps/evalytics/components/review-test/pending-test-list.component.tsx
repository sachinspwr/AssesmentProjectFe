import { VTableColumn } from '@components/organisms';
import VTable from '@components/organisms/table/v-table.organism';
import { TestResponseDTO } from '@dto/response';
import { useNavigate } from 'react-router-dom';

type PendingTestListProps = {
  data: TestResponseDTO[];
  loading: boolean;
};

function PendingTestList({ data, loading }: PendingTestListProps) {
  const navigate = useNavigate();

  const columns: VTableColumn<TestResponseDTO>[] = [
    { key: 'title', label: 'Title', sortable: true, searchable: true },
    { key: 'testQuestionFormat', label: 'QuestionFormat', sortable: true, searchable: true },
    { key: 'maxScore', label: 'Score', sortable: true, searchable: true },
    { key: 'durationInMinutes', label: 'Duration', sortable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, searchable: true },
  ];

  return (
    <>
      <VTable
        title="Pending Tests"
        data={data ?? []}
        columns={columns}
        loading={loading}
        itemsPerpage={8}
        emptyState={<div>No Tests Found!</div>}
        getId={(x) => x.id}
        actionsConfig={[
          {
            action: 'edit',
            responder: (id?: string) => {
              navigate(`../test/${id}`);
            },
          },
          {
            action: 'delete',
            responder: (id?: string) => {
              alert(id);
            },
          },
        ]}
        tableClassName="table-fixed w-full"
      />
    </>
  );
}

export default PendingTestList;
