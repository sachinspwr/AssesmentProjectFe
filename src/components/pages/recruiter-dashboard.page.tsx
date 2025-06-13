import { VICon } from '@components/atoms/icon/v-icon.atom';
import { VStatus } from '@components/atoms/status/v-status.component';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { ChartWrapper } from '@components/organisms/graph/char-wrapper.organisms';
import { VAreaGraph } from '@components/organisms/graph/v-area-graph.organism';
import { VPieGraph } from '@components/organisms/graph/v-pie-graph.organisms';
import { VOverview } from '@components/organisms/overview/v-overview.organism';
import { VStatSummery } from '@components/organisms/overview/v-stat-summery';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { InvitedUserTestResultResponseDTO } from '@dto/response/user-test-result.response.dto';
import { ResultStatus } from '@utils/enums';
import { defaultFormatDtTm } from '@utils/index';
import { FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useGetAllTestResultsGivenByInvitedUserQuery, useGetInvitedParticipantsResultSummaryQuery } from 'store/slices/test-result.slice';

function RecruiterDashboard() {
  const { data: summary } = useGetInvitedParticipantsResultSummaryQuery();
  const { data: invitedTestsByUser, isLoading: invitedTestsByUserLoading } = useGetAllTestResultsGivenByInvitedUserQuery();
  console.log("Invited Test User Result : ",invitedTestsByUser);
  const navigate = useNavigate();

  const columnsConfig: VTableColumn<InvitedUserTestResultResponseDTO>[] = [
    {
      key: 'testTitle',
      label: 'Assessment Name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'candidateName',
      label: 'Candidate Name',
      sortable: true,
      searchable: true,
    },
    {
      key: 'resultStatus',
      label: 'Status',
      customRender: (row) => (
        <VStatus
          label={row.resultStatus}
          type={
            row.resultStatus === ResultStatus.Passed
              ? 'positive'
              : row.resultStatus === ResultStatus.Under_Review
              ? 'warning'
              : 'negative'
          }
        />
      ),
    },
    {
      key: 'startedAt',
      label: 'Started At',
      customRender: (row) => <span>{defaultFormatDtTm(row.startedAt)}</span>,
    },
    {
      key: 'submittedAt',
      label: 'Submitted At',
      customRender: (row) => <span>{defaultFormatDtTm(row?.submittedAt)}</span>,
    },
    {
      key: 'action',
      label: 'Actions',
      customRender: (row) => (
        <VICon
          className="text-theme-muted cursor-pointer"
          icon={FiEye}
          onClick={() => navigate(`/test-results/${row?.assessmentId}`)}
        />
      ),
    },
  ];

  // Pie Chart Data Preprocessing
  const pieChartData = (summary?.experienceLevelCounts ?? []).reduce((acc, { experienceLevelName, participantCount }) => {
    const existing = acc.find((item) => item.name === experienceLevelName);
    if (existing) existing.value += participantCount;
    else acc.push({ name: experienceLevelName, value: participantCount });
    return acc;
  }, [] as { name: string; value: number }[]).map(({ name, value }, _, arr) => {
    const total = arr.reduce((sum, item) => sum + item.value, 0);
    return { name, value, percentage: parseFloat(((value / total) * 100).toFixed(2)) };
  });

  const experienceLevelData = summary?.experienceLevelCounts?.map(({ experienceLevelName, participantCount }) => ({
    name: experienceLevelName,
    participants: participantCount,
  })) ?? [];

  const assessmentSummaries = summary?.assessmentSummaries ?? [];
  const paddedSummaries = [...assessmentSummaries, ...Array(Math.max(0, 3 - assessmentSummaries.length)).fill(null)];

  return (
    <div className="min-h-screen">
      <div className="flex gap-5 items-center">
        <VTypography as="h3">Dashboard</VTypography>
      </div>
      <div className="border border-theme-default my-5"></div>

      <div className="grid grid-cols-2 gap-5">
        {/* Assessment Overview */}
        <VOverview title="Assessment Overview">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            <VStatSummery count={summary?.summaryCounts?.ongoingAssessments} label="On going assessments" />
            <VStatSummery count={summary?.summaryCounts?.completedAssessments} label="Completed Assessments" />
            <VStatSummery count={summary?.summaryCounts?.totalCandidates} label="Total Candidates" />
          </div>
        </VOverview>

        {/* Recent Assessments */}
        <VOverview title="Recent Assessments">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            {paddedSummaries.map((item, index) => (
              <div key={index}>
                {item ? (
                  <VStatSummery count={item.totalCandidates} label="Total Candidates">
                    <VTypography as="p" className="text-xs">{item.testTitle}</VTypography>
                  </VStatSummery>
                ) : (
                  <VStatSummery count="-" label="Total Candidates">
                    <VTypography as="p" className="text-xs">-</VTypography>
                  </VStatSummery>
                )}
              </div>
            ))}
          </div>
        </VOverview>

        {/* Area Graph */}
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

        {/* Pie Chart */}
        <VOverview title="Assessment Type Distribution">
          <div className="p-2 w-full">
            <ChartWrapper title="" data={pieChartData}>
              <VPieGraph data={pieChartData} />
            </ChartWrapper>
          </div>
        </VOverview>
      </div>

      {/* Table */}
      <div className="mt-5">
        <VTable<InvitedUserTestResultResponseDTO>
          title="Test Assessment"
          data={invitedTestsByUser?.data ?? []}
          loading={invitedTestsByUserLoading}
          columns={columnsConfig}
          headerClassName="font-[600] text-lg"
          itemsPerPage={5}
          tableClassName="w-full border border-gray-200"
          emptyState={<div>No users found!</div>}
        />
      </div>
    </div>
  );
}

export { RecruiterDashboard };
