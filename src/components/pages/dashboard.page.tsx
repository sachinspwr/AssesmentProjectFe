import { VICon } from '@components/atoms/icon/v-icon.atom';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VStatus } from '@components/atoms/status/v-status.component';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VAreaGraph } from '@components/organisms/graph/v-area-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { VStatSummery } from '@components/organisms/overview/v-stat-summery';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { BsThreeDots } from 'react-icons/bs';
import { MdCheckCircle, MdRadioButtonChecked } from 'react-icons/md';
import { VDropdown } from '../molecules';

const options = [
  {
    label: 'Option 1 (Checkbox)',
    value: 'option1',
    type: 'checkbox', // Set type to 'checkbox'
  },
  {
    label: 'Option 2 (Radio)',
    value: 'option2',
    type: 'radio', // Set type to 'radio'
  },
  {
    label: 'Option 3 (Icon)',
    value: 'option3',
    type: 'icon', // Set type to 'icon'
    icon: <MdCheckCircle size={20} />, // Icon for the 'icon' type option
  },
  {
    label: 'Option 4 (Icon)',
    value: 'option4',
    type: 'icon',
    icon: <MdRadioButtonChecked size={20} />,
  },
];
interface AssessmentData {
  id: number;
  assessmentName: string;
  recruiter: string;
  status: string;
  candidates?: number;
  lastActivity: string;
  creationDate: string;
  actions?: string;
}

const assessmentData: AssessmentData[] = [
  {
    id: 1,
    assessmentName: 'Software Engineer Interview',
    recruiter: 'Jane Smith',
    status: 'Active',
    candidates: 120,
    lastActivity: '2023-09-15 14:23',
    creationDate: '2023-08-01',
    actions: 'View Details',
  },
  {
    id: 2,
    assessmentName: 'Product Manager Test',
    recruiter: 'Michael Johnson',
    status: 'Completed',
    candidates: 80,
    lastActivity: '2023-08-30 10:12',
    creationDate: '2023-07-10',
    actions: 'View Results',
  },
  {
    id: 3,
    assessmentName: 'UX Designer Skill Assessment',
    recruiter: 'Emily Davis',
    status: 'Active',
    candidates: 95,
    lastActivity: '2023-09-10 11:45',
    creationDate: '2023-06-20',
    actions: 'View Details',
  },
  {
    id: 4,
    assessmentName: 'Backend Developer Coding Test',
    recruiter: 'David Lee',
    status: 'On-Hold',
    lastActivity: '2023-09-13 09:03',
    creationDate: '2023-05-30',
    actions: 'View Details',
  },
  {
    id: 5,
    assessmentName: 'QA Analyst Job Interview',
    recruiter: 'Sarah Wilson',
    status: 'Active',
    candidates: 110,
    lastActivity: '2023-09-12 16:21',
    creationDate: '2023-08-05',
    actions: 'View Details',
  },
  {
    id: 6,
    assessmentName: 'Marketing Specialist Assessment',
    recruiter: 'John White',
    status: 'Completed',
    candidates: 75,
    lastActivity: '2023-08-25 14:58',
    creationDate: '2023-07-15',
    actions: 'View Results',
  },
];

const columnsConfig: VTableColumn<AssessmentData>[] = [
  {
    key: 'assessmentName',
    label: 'Assessment Name',
    customRender: (row: AssessmentData) => <p className="font-[500]  text-theme-primary">{row.assessmentName}</p>,
    sortable: true,
    searchable: true,
  },
  {
    key: 'recruiter',
    label: 'Recruiter',
    customRender: (row: AssessmentData) => (<div className='flex gap-2'>
      <VImage className={'w-4 h-4 rounded-full'} src='https://placehold.co/30x30.png'/>
      <p className="font-[500] text-theme-primary">{row.recruiter}</p>
    </div>),
    sortable: true,
    searchable: true,
  },
  {
    key: 'status',
    label: 'Status',
    customRender: (row: AssessmentData) => (
      <VStatus
        label={row.status}
        type={row.status === 'Active' ? 'positive' : row.status === 'On-Hold' ? 'warning' : 'negative'}
      ></VStatus>
    ),
  },
  {
    key: 'candidates',
    label: 'Candidates',
    customRender: (row: AssessmentData) => <span>{row.candidates ?? '_'}</span>,
  },
  {
    key: 'lastActivity',
    label: 'Last Activity',
    customRender: (row: AssessmentData) => <span>{new Date(row.creationDate).toLocaleDateString()}</span>,
  },
  { key: 'creationDate', label: 'Creation Date' },

  {
    key: 'actions',
    label: 'Actions',
    customRender: (row: AssessmentData) => (
      <VICon
        className="text-theme-muted"
        icon={BsThreeDots}
        onClick={() => alert(`Perform action for ${row.assessmentName}`)}
      ></VICon>
    ),
  },
];
function Dashboard() {
  return (
    <div className="min-h-screen">
      <div className="flex gap-5 items-center">
        <VTypography as="h3">Dashboard</VTypography>
        <div className='flex flex-row gap-10'>
          <VDropdown
            options={options}
            isMultiSelect={false} // Allows multi-selection
            placeholder="Select options"
            name="dropdown"
            onChange={() => {}}
            showSearch={false} // Optionally show search box
            disabled={false} // Can be set to true if dropdown should be disabled
            wrapperClasses='w-[350px]'
          />
        </div>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div className="grid grid-cols-2 gap-5">
        <VOverview title="Assessment Overview">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            <VStatSummery
              count={12}
              label="On going assessments"
              children={<span className="text-[10px] text-theme-secondary">+2 since last week</span>}
            />
            <VStatSummery
              count={48}
              label="Completed Assessments"
              children={<span className="text-[10px] text-theme-secondary">+2 since last week</span>}
            />
            <VStatSummery
              count={156}
              label="Total Candidates"
              children={<span className="text-[10px] text-theme-secondary">+2 since last week</span>}
            />
          </div>
        </VOverview>
        <VOverview title="Recent Assessments">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            <VStatSummery
              count={13}
              label="Total Candidates"
              children={<span className="text-[10px] text-theme-secondary">Frontend Developer Assessment</span>}
            />
            <VStatSummery
              count={13}
              label="Total Candidates"
              children={<span className="text-[10px] text-theme-secondary">Project Manager Evaluation</span>}
            />
            <VStatSummery
              count={13}
              label="Total Candidates"
              children={<span className="text-[10px] text-theme-secondary">Data Scientist</span>}
            />
          </div>
        </VOverview>
        <VOverview
          title="Assessment Trend"
          overViewLableChildren={
            <VTypography as="p" color="secondary" className="text-xs">
              Y - Axis no. of assessments
            </VTypography>
          }
        >
          <div className="p-2 w-full">
            <VAreaGraph />
          </div>
        </VOverview>
        <VOverview title="Assessment Type Distribution">
          <div className="p-2 w-full">
            <VPieGraph />
          </div>
        </VOverview>
      </div>
      <div className='mt-5'>
      <VTable<AssessmentData>
          title="Test Assessment"
          data={assessmentData}
          columns={columnsConfig}
          headerClassName="font-[600] text-lg"
          itemsPerPage={5}
          tableClassName="w-full border border-gray-200"
          emptyState={<div>No users found!</div>}
          // addConfig={{ label: 'Create Assessment', onAddRecord: () => {} }}
          // showPagination={false}
        />
      </div>
    </div>
  );
}
export {Dashboard}