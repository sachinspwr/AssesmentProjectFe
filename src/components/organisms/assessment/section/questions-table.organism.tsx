import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { formatDuration } from '@utils/functions';
import { Question } from 'models';

const questionColumns: VTableColumn<Question>[] = [
  { key: 'questionText', label: 'Question', className: 'w-2/5', sortable: true },
  { key: 'subject', label: 'Subject',  customRender: (row: Question) => <>{row.subject.name}</>,},
  { key: 'difficulty', label: 'Difficulty Level' },
  { key: 'type', label: 'Question Type', className: 'w-44' },
  { key: 'marks', label: 'Score' },
  {
    key: 'timeLimit',
    label: 'Duration',
    className: 'w-32',
    customRender: (row: Question) => <>{formatDuration(row.timeLimit ?? 0)}</>,
  },
];

interface SectionQuestionsTableProps {
  tableLabel?: string;
  itemsPerviewMode?: number;
  mode: 'select' | 'view';
  questions: Question[];
  selectedQuestions?: Question[];
  loading?: boolean;
  onSelect?: (selectedIds: string[]) => void;
}

function SectionQuestionsTable({
  tableLabel,
  itemsPerpage,
  mode = 'view',
  questions,
  selectedQuestions,
  loading,
  onSelect,
}: SectionQuestionsTableProps) {
  return (
    <VTable
      title={mode === 'view' ? '' : tableLabel}
      data={questions}
      columns={questionColumns}
      getId={(x) => String(x.id)}
      selectedRowIds={selectedQuestions?.map((x) => x.id)}
      mode={mode}
      containerClassName="!pb-0"
      headerWrapperClassName={mode === 'view'? '!gap-0': ''}
      tableClassName="table-fixed w-full !border-t-0"
      theadClass={mode === 'view'? 'border-t-0': ''}
      headerClassName="font-[600]"
      searchSectionClassName='!py-0'
      loading={loading}
      emptyState={
        <div>
          <VTypography as="p">No Questions Available</VTypography>
        </div>
      }
      itemsPerviewMode={itemsPerpage}
      onSelect={onSelect}
    />
  );
}

export default SectionQuestionsTable;
