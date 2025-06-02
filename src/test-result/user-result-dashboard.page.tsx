import { VICon, VStatus } from '@components/atoms';
import { VLoader, VSummaryCard } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VTableColumn } from '@components/organisms';
import { ChartWrapper } from '@components/organisms/graph/char-wrapper.organisms';
import VBarChartGraph from '@components/organisms/graph/v-bar-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import VTable from '@components/organisms/table/v-table.organism';
import { UserResponseDTO } from '@dto/response';
import { InviterAssessmentResponseDto } from '@dto/response/inviter-assessment.response.dto';
import { UserTestResults } from '@dto/response/user-test-results-response.dto';
import { ResultStatus } from '@utils/enums';
import { defaultFormatDtTm } from '@utils/functions';
import { AiOutlineBarChart, AiOutlineClockCircle } from 'react-icons/ai';
import { FiEye } from 'react-icons/fi';
import { MdAssignment, MdOutlineQuiz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useGetAllTestsSummaryByUserQuery } from 'store/slices/test-result.slice';

const mapToAssessmentData = (
  apiData: UserTestResults[]
): (InviterAssessmentResponseDto & {
  user: UserResponseDTO;
})[] => {
  return apiData.map((item) => ({
    id: item.test.id,
    testId: item.test.id,
    userId: item.user.id,
    participantId: item.participantId,
    testName: item.test.title,
    status: item.status,
    isPassed: item.isPassed,
    completedAt: item.completedAt,
    user: {
      firstName: item.user.firstName,
      lastName: item.user.lastName,
    },
  }));
};

function UserResultDashboard() {
  const navigate = useNavigate();

  const columnsConfig: VTableColumn<
    InviterAssessmentResponseDto & {
      user: UserResponseDTO;
    }
  >[] = [
    {
      key: 'testName',
      label: 'Assessment Name',
      customRender: (row: InviterAssessmentResponseDto) => (
        <p className="font-[500]  text-theme-primary">{row.testName}</p>
      ),
      sortable: true,
      searchable: true,
    },
    {
      key: 'candidateName',
      label: 'Candidate Name',
      customRender: (row) => <p>{`${row.user.firstName} ${row.user.lastName}`}</p>,
      searchable: true,
    },
    {
      key: 'status',
      label: 'Status',
      customRender: (row: InviterAssessmentResponseDto) =>
        row.status ? (
          <VStatus
            label={row.status}
            type={
              row.status === ResultStatus.Passed
                ? 'positive'
                : row?.status === ResultStatus.Under_Review
                  ? 'warning'
                  : 'negative'
            }
          ></VStatus>
        ) : (
          '-'
        ),
    },
    {
      key: 'isPassed',
      label: 'Pass/Fail',
      customRender: (row: InviterAssessmentResponseDto) => (
        <VStatus
          label={row.isPassed ? ResultStatus.Passed : ResultStatus.Failed}
          type={row.isPassed ? 'positive' : 'negative'}
        ></VStatus>
      ),
    },
    {
      key: 'completedAt',
      label: 'Completed At',
      customRender: (row: InviterAssessmentResponseDto) => <span>{defaultFormatDtTm(row?.completedAt)}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      customRender: (row: InviterAssessmentResponseDto) => (
        <VICon
          className="text-theme-muted"
          icon={FiEye}
          onClick={() => navigate(`/test-results/c187bf11-353d-4843-9e21-50e7cc578aa1`)}
        ></VICon>
      ),
    },
  ];

  const { data: summaryData, isLoading: summaryLoading } = useGetAllTestsSummaryByUserQuery();

  const assessmentList: InviterAssessmentResponseDto[] = mapToAssessmentData(summaryData?.recentTestResults || []);

  const barChartData = summaryData?.subjectStats?.map((stat) => ({
    name: stat.subject,
    value: stat.passRate,
  }));

  const pieChartData = summaryData?.subjectStats?.map((stat) => ({
    name: stat.subject,
    value: stat.passRate,
    percentage: stat.passRate * 100,
  }));

  console.log(pieChartData);

  if (summaryLoading) {
    return <VLoader position="global" />;
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between">
        <VTypography as="h3">Dashboard</VTypography>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <VSummaryCard
          title="Tests Taken"
          value={summaryData?.summaryStats?.[0]?.totalTests ?? '0'}
          icon={MdAssignment}
          variant="primary"
          helperText="Total tests attempted"
        />
        <VSummaryCard
          title="Total Passed"
          value={summaryData?.summaryStats?.[0]?.passed ?? '0'}
          icon={MdOutlineQuiz}
          variant="warning"
          helperText="Passed tests"
        />
        <VSummaryCard
          title="Average Accuracy"
          value={summaryData?.summaryStats?.[0]?.averageAccuracy ?? '0'}
          icon={AiOutlineClockCircle}
          variant="default"
          helperText="Average accuracy on all tests"
        />
        <VSummaryCard
          title="Avg. Score"
          value={summaryData?.summaryStats?.[0]?.averageScore ?? '0'}
          icon={AiOutlineBarChart}
          variant="default"
          helperText="Across all completed tests"
        />
      </div>

      <div className="grid grid-cols-2 gap-5 mt-3">
        <VOverview
          title="Assessment Trend"
          overViewLableChildren={
            <VTypography as="p" color="secondary" className="text-xs">
              Y - Axis no. of assessments
            </VTypography>
          }
        >
          <div className="p-2 w-full">
            {barChartData && (
              <ChartWrapper title="" data={barChartData ?? []}>
                {barChartData && barChartData.length > 0 ? <VBarChartGraph data={barChartData} /> : null}
              </ChartWrapper>
            )}
          </div>
        </VOverview>

        <VOverview title="Assessment Type Distribution">
          <div className="p-2 w-full h-80">
            <ChartWrapper title="" data={pieChartData ?? []}>
              {pieChartData && pieChartData.length > 0 ? <VPieGraph data={pieChartData} /> : null}
            </ChartWrapper>
          </div>
        </VOverview>
      </div>

      <div className="mt-5">
        <VTable<InviterAssessmentResponseDto & { user: UserResponseDTO }>
          title="Test Assessment"
          data={assessmentList}
          columns={columnsConfig}
          headerClassName="font-[600] text-lg"
          itemsPerPage={5}
          tableClassName="w-full border border-gray-200"
          emptyState={<div>No test found!</div>}
        />
      </div>
    </div>
  );
}

export default UserResultDashboard;
