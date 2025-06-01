import { VTableColumn } from "@components/organisms";
import VTable from "@components/organisms/table/v-table.organism";
import { QuestionResponseDTO } from "@dto/response";
import { useNavigate } from "react-router-dom";

type ApprovedQuestionsListProps = {
  data: QuestionResponseDTO[];
  loading: boolean;
};

function ApprovedQuestionsList ({ data, loading }: ApprovedQuestionsListProps) {
  const navigate = useNavigate();

  const columns: VTableColumn<QuestionResponseDTO>[] = [
    { key: 'questionText', label: 'Question', className: 'w-2/5', sortable: true, searchable: true },
    { key: 'type', label: 'Type', className: 'w-44', sortable: true, searchable: true },
    {
      key: 'subject',
      label: 'Subject',
      sortable: true,
      searchable: true,
    },
    { key: 'difficulty', label: 'Difficulty', sortable: true, searchable: true },
    { key: 'marks', label: 'Marks', sortable: true, searchable: true },
    { key: 'timeLimit', label: 'Time(In Min)', sortable: true, searchable: true },
    { key: 'status', label: 'Status', sortable: true, searchable: true }
  ];
  
    
    return(
        <>
            <VTable
                title="Approved Questions"
                data={data ?? []}
                columns={columns}
                loading={loading}
                itemsPerviewMode={8}
                emptyState={<div>No Questions Found!</div>}
                getId={(x) => x.id}
                actionsConfig={[
                    {
                        action: 'edit',
                        responder: (id?: string) => {
                          navigate(`../question/${id}`);
                        },
                    },
                    {
                        action: 'delete',
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

export default ApprovedQuestionsList;