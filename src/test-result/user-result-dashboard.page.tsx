import { VButton, VICon, VImage, VStatus } from '@components/atoms';
import { VLoader, VSummaryCard } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VTableColumn } from '@components/organisms';
import VBarChartGraph from '@components/organisms/graph/v-bar-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import VTable from '@components/organisms/table/v-table.organism';
import { UserDashboardTableDTO } from '@dto/response/user-dashbaord-table.dto';
import { UserTestResults } from '@dto/response/user-test-results-response.dto';
import { defaultFormatDtTm } from '@utils/functions';
import { AiOutlineBarChart, AiOutlineClockCircle } from 'react-icons/ai';
import { FiEye } from 'react-icons/fi';
import { MdAssignment, MdOutlineQuiz } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useGetAllTestsSummaryByUserQuery } from 'store/slices/test-result.slice';
import { useAppSelector } from 'store/store';



const mapToAssessmentData = (apiData: UserTestResults[]): UserDashboardTableDTO[] => {
  return apiData.map((item) => ({
    id: item.test.id,
    testId: item.test.id,
    userId: item.user.id,
    participantId: item.participantId,
    testName: item.test.title,
    status: item.status,
    isPassed: item.isPassed,
    completedAt: item.completedAt,
  }));
};

const UserResultDashboard = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.account.user?.id);

  const columnsConfig: VTableColumn<UserDashboardTableDTO>[] = [
    {
      key: 'testName',
      label: 'Assessment Name',
      customRender: (row: UserDashboardTableDTO) => <p className="font-[500]  text-theme-primary">{row.testName}</p>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'status',
      label: 'Status',
      customRender: (row: UserDashboardTableDTO) =>
        row.status ? (
          <VStatus
            label={row.status}
            type={row.status === 'Active' ? 'positive' : row?.status === 'On-Hold' ? 'warning' : 'negative'}
          ></VStatus>
        ) : (
          '-'
        ),
    },
    {
      key: 'isPassed',
      label: 'Pass/Fail',
      customRender: (row: UserDashboardTableDTO) => (
        <VStatus label={row.isPassed ? 'Pass' : 'Fail'} type={row.isPassed ? 'positive' : 'negative'}></VStatus>
      ),
    },
    {
      key: 'completedAt',
      label: 'Completed At',
      customRender: (row: UserDashboardTableDTO) => <span>{defaultFormatDtTm(row?.completedAt)}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      customRender: (row: UserDashboardTableDTO) => (
        <VICon
          className="text-theme-muted"
          icon={FiEye}
          onClick={() => navigate(`/result/${row?.testId}/participants/${row?.participantId}`)}
        ></VICon>
      ),
    },
  ];

  const { data: summaryData, isLoading: summaryLoading } = useGetAllTestsSummaryByUserQuery(
    { userId: userId as string },
    { skip: !userId }
  );

  const assessmentList: UserDashboardTableDTO[] = mapToAssessmentData(summaryData?.recentTestResults || []);

  const pieChartData = summaryData?.subjectStats?.map((stat) => ({
    name: stat.subject,
    value: stat.passRate,
  }));

  if (summaryLoading) {
    return <VLoader position="global" />;
  }

  if (!summaryData) {
    return (
      <div className="flex justify-center items-center">
        <VTypography as="h4">No Data Found...Submit your first test</VTypography>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between">
        <VTypography as="h3">Result Dashboard</VTypography>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <VSummaryCard
          title="Tests Taken"
          value={summaryData?.summaryStats?.[0]?.totalTests  as number}
          icon={MdAssignment}
          variant="primary"
          helperText="Total tests attempted"
        />
        <VSummaryCard
          title="Total Passed"
          value={summaryData?.summaryStats?.[0]?.passed as number}
          icon={MdOutlineQuiz}
          variant="warning"
          helperText="Passes test"
        />
        <VSummaryCard
          title="Average Accuracy"
          value={summaryData?.summaryStats?.[0]?.averageAccuracy as number}
          icon={AiOutlineClockCircle}
          variant="default"
          helperText="Average accuracy on all tests"
        />
        <VSummaryCard
          title="Avg. Score"
          value={summaryData?.summaryStats?.[0]?.averageScore as number}
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
          <div className="p-2 w-full">{pieChartData && <VBarChartGraph data={pieChartData} />}</div>
        </VOverview>

        <VOverview title="Assessment Type Distribution">
          <div className="p-2 w-full h-80">{pieChartData && <VPieGraph data={pieChartData} />}</div>
        </VOverview>
      </div>

      <div className="mt-5">
        <VTable<UserDashboardTableDTO>
          title="Test Assessment"
          data={assessmentList}
          loading={summaryLoading}
          columns={columnsConfig}
          headerClassName="font-[600] text-lg"
          itemsPerPage={5}
          tableClassName="w-full border border-gray-200"
          emptyState={<div>No test found!</div>}
        />
      </div>
    </div>
  );
};

export default UserResultDashboard;
