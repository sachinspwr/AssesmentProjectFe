import { VLoader, VSummaryCard } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { ChartWrapper } from '@components/organisms/graph/char-wrapper.organisms';
import VBarChartGraph from '@components/organisms/graph/v-bar-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { AiOutlineBarChart, AiOutlineClockCircle } from 'react-icons/ai';
import { FiEye } from 'react-icons/fi';
import { MdAssignment, MdOutlineQuiz } from 'react-icons/md';
import { useGetAllTestsGivenByUserQuery, useGetAllTestsSummaryByUserQuery } from 'store/slices/test-result.slice';
import UserTestResultList from './components/user-test-result-list.component';

function UserResultDashboard() {

  const { data: summaryData, isLoading: summaryLoading } = useGetAllTestsSummaryByUserQuery();
  const { data: testsByUser, isLoading: testsByUserLoading } = useGetAllTestsGivenByUserQuery();

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
        <UserTestResultList data={testsByUser?.data ?? []} loading={testsByUserLoading}/>
      </div>
    </div>
  );
}

export default UserResultDashboard;
