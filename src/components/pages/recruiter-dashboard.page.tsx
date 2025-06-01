import { VICon } from '@components/atoms/icon/v-icon.atom';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VStatus } from '@components/atoms/status/v-status.component';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VAreaGraph } from '@components/organisms/graph/v-area-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { VStatSummery } from '@components/organisms/overview/v-stat-summery';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { TestResultDTO } from '@dto/response/guest-inviter-summury.response.dto';
import { ResultStatus } from '@utils/enums';
import { defaultFormatDtTm } from '@utils/index';
import { FiEye } from 'react-icons/fi';

const columnsConfig: VTableColumn<TestResultDTO>[] = [
  {
    key: 'testTitle',
    label: 'Assessment Name',
    customRender: (row: TestResultDTO) => <p className="font-[500]  text-theme-primary">{row.testTitle}</p>,
    sortable: true,
    searchable: true,
  },
  {
    key: 'recruiterFirstName',
    label: 'Recruiter FirstName',
    customRender: (row: TestResultDTO) => (
      <div className="flex gap-2">
        <VImage className={'w-4 h-4 rounded-full'} src="https://placehold.co/30x30.png" />
        <p className="font-[500] text-theme-primary">{row.recruiterFirstName}</p>
      </div>
    ),
    sortable: true,
    searchable: true,
  },
  {
    key: 'assessmentStatus',
    label: 'Status',
    customRender: (row: TestResultDTO) => (
      <VStatus
        label={row.assessmentStatus}
        type={
          row.assessmentStatus === ResultStatus.Passed
            ? 'positive'
            : row.assessmentStatus === ResultStatus.Under_Review
              ? 'warning'
              : 'negative'
        }
      ></VStatus>
    ),
  },
  {
    key: 'candidatesCount',
    label: 'Candidates',
    customRender: (row: TestResultDTO) => <span>{row.candidatesCount ?? '_'}</span>,
  },
  {
    key: 'completedAt',
    label: 'Completed At',
    customRender: (row: TestResultDTO) => <span>{defaultFormatDtTm(row?.completedAt)}</span>,
  },
  {
    key: 'actions',
    label: 'Actions',
    customRender: (row: TestResultDTO) => <VICon className="text-theme-muted" icon={FiEye}></VICon>,
  },
];
function RecruiterDashboard() {
  const data = {
    summaryCounts: {
      ongoingAssessments: 0,
      completedAssessments: 1,
      totalCandidates: 1,
    },
    assessmentSummaries: [
      {
        testId: '6f85e064-7316-4a0e-9d7e-11b43f23960f',
        testTitle: 'Full Stack Java',
        totalCandidates: 1,
      },
    ],
    recentAssessments: [
      {
        assessmentId: '8b233a5c-f515-4cdb-8031-309f4a7c1e09',
        testId: '6f85e064-7316-4a0e-9d7e-11b43f23960f',
        testTitle: 'Full Stack Java',
        participantId: '48e3fee0-96e4-4278-99a1-519cb6b194e4',
        recruiterId: '67bdf7fa-fdac-8004-b949-381ab479d78c',
        recruiterFirstName: 'Test',
        recruiterLastName: 'User',
        recruiterEmail: 'testuser@valt.com',
        assessmentStatus: 'Under_Review',
        candidatesCount: 1,
        correctAnswersCount: 2,
        score: 2,
        outOf: 6,
        completedAt: '2025-05-31T14:16:15.000Z',
      },
    ],
    experienceLevelCounts: [
      {
        experienceLevelId: 'c2e6b7f2-5d6f-4f95-9e2f-2c8eaf9d6f5b',
        experienceLevelName: 'Intermediate',
        participantCount: 1,
      },
    ],
  };

  const pieChartData = data?.experienceLevelCounts?.map((exp) => ({
    name: exp.experienceLevelName,
    value: exp.participantCount,
  }));

  return (
    <div className="min-h-screen">
      <div className="flex gap-5 items-center">
        <VTypography as="h3">Dashboard</VTypography>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div className="grid grid-cols-2 gap-5">
        <VOverview title="Assessment Overview">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            <VStatSummery
              count={data?.summaryCounts?.ongoingAssessments}
              label="On going assessments"
              children={<span className="text-[10px] text-theme-secondary">+2 since last week</span>}
            />
            <VStatSummery
              count={data?.summaryCounts?.completedAssessments}
              label="Completed Assessments"
              children={<span className="text-[10px] text-theme-secondary">+2 since last week</span>}
            />
            <VStatSummery
              count={data?.summaryCounts?.totalCandidates}
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
            <VPieGraph data={pieChartData} />
          </div>
        </VOverview>
      </div>
      <div className="mt-5">
        <VTable<TestResultDTO>
          title="Test Assessment"
          data={data?.recentAssessments}
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
export { RecruiterDashboard };
