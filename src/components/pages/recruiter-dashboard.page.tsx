import { VICon } from '@components/atoms/icon/v-icon.atom';
import { VImage } from '@components/atoms/image/v-image.atom';
import { VStatus } from '@components/atoms/status/v-status.component';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { ChartWrapper } from '@components/organisms/graph/char-wrapper.organisms';
import { VAreaGraph } from '@components/organisms/graph/v-area-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { VStatSummery } from '@components/organisms/overview/v-stat-summery';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { TestResultDTO } from '@dto/response/guest-inviter-summury.response.dto';
import { ResultStatus } from '@utils/enums';
import { defaultFormatDtTm } from '@utils/index';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function RecruiterDashboard() {
  const navigate = useNavigate();

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
      customRender: (row: TestResultDTO) => (
        <VICon
          className="text-theme-muted"
          icon={FiEye}
          onClick={() => navigate(`/result/${row?.testId}/participants/${row?.participantId}`)}
        ></VICon>
      ),
    },
  ];

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
        participantCount: 15,
        value: 1,
        percentage: 33.33,
      },
      {
        experienceLevelId: 'b1d5a6f1-3c4e-4e94-8d1f-1b7d9f8c5e4a',
        experienceLevelName: 'Beginner',
        participantCount: 10,
        value: 2,
        percentage: 70.67,
      },
      {
        experienceLevelId: 'b1d5a6f1-3c4e-4e94-8d1f-1b7d9f8c5e4a',
        experienceLevelName: 'Expert',
        participantCount: 5,
        value: 2,
        percentage: 70.67,
      },
    ],
  };

  type RawData = {
    experienceLevelName: string;
    participantCount: number;
  };

  type PieChartDataWithPercentage = {
    name: string;
    value: number;
    percentage: number;
  };

  function getPieChartData(rawData: RawData[]): PieChartDataWithPercentage[] {
    const totals: Record<string, number> = {};

    for (const item of rawData) {
      const name = item.experienceLevelName;

      totals[name] = (totals[name] || 0) + item.participantCount;
    }

    const totalCount = Object.values(totals).reduce((sum, count) => sum + count, 0);

    return Object.entries(totals).map(([name, value]) => ({
      name,

      value,

      percentage: parseFloat(((value / totalCount) * 100).toFixed(2)),
    }));
  }

  const pieChartData = getPieChartData(data?.experienceLevelCounts ?? []);

  const experienceLevelData = data.experienceLevelCounts.map((item) => ({
    name: item.experienceLevelName,
    participants: item.participantCount,
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
            <VStatSummery count={data?.summaryCounts?.ongoingAssessments} label="On going assessments" />
            <VStatSummery count={data?.summaryCounts?.completedAssessments} label="Completed Assessments" />
            <VStatSummery count={data?.summaryCounts?.totalCandidates} label="Total Candidates" />
          </div>
        </VOverview>
        <VOverview title="Recent Assessments">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
    {(data.assessmentSummaries.length > 0 
      ? [...data.assessmentSummaries, ...Array(3 - data.assessmentSummaries.length).fill(null)]
      : [null, null, null]
    ).map((summary, index) => (
      <div key={index}>
        {summary ? (
          <VStatSummery
            count={summary.totalCandidates}
            label="Total Candidates"
            children={
              <VTypography as="p" className="text-xs">
                {summary.testTitle}
              </VTypography>
            }
          />
        ) : (
          <VStatSummery
            count="-"
            label="Total Candidates"
            children={
              <VTypography as="p" className="text-xs">
                -
              </VTypography>
            }
          />
        )}
      </div>
    ))}
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
            <ChartWrapper title="" data={experienceLevelData}>
              <VAreaGraph data={experienceLevelData} xKey="name" yKey="participants" />
            </ChartWrapper>
          </div>
        </VOverview>

        <VOverview title="Assessment Type Distribution">
          <div className="p-2 w-full">
            <ChartWrapper title="" data={pieChartData}>
              <VPieGraph data={pieChartData} />
            </ChartWrapper>
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
