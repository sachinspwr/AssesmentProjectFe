import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { formatDuration } from '@utils/functions';
import { selectSectionProgress, selectSyncData, useTestRunnerSelector } from 'test-runner/store';

export function SectionProgressSummary() {
  const {
    answeredCount = 0,
    totalQuestions = 0,
    totalTime = 0,
    progressPercentage = 0,
  } = useTestRunnerSelector(selectSectionProgress) || {};

  const syncData = useTestRunnerSelector(selectSyncData);

  const infoItems = [
    {
      label: 'Total Questions',
      value: totalQuestions,
      color: 'text-theme-primary',
    },
    {
      label: 'Answered',
      value: `${answeredCount}/${totalQuestions}`,
      color: 'text-theme-positive',
    },
    {
      label: 'Progress',
      value: `${progressPercentage}%`,
      color: 'text-theme-info',
    },
    {
      label: 'Time Spent',
      value: formatDuration(totalTime),
      color: '',
    },
    {
      label: 'Session',
      value: syncData?.activityStatus ?? '-',
      color: 'text-theme-info',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-6">
      {infoItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <VTypography as="p" className="text-theme-secondary text-sm tracking-wider">
            {item.label}:
          </VTypography>
          <VTypography as="span" className={`font-medium capitalize ${item.color}`}>
            {item.value}
          </VTypography>
        </div>
      ))}
    </div>
  );
}
