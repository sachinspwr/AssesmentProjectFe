import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { selectCurrentSection, useTestRunnerSelector } from 'test-runner/store';
import { SectionProgressSummary } from './section-progress-summary.component';
import { TestSectionPagination } from './section-pagination.component';

export function TestSectionHeader({ children }: { children?: React.ReactNode }) {
  const section = useTestRunnerSelector(selectCurrentSection);

  return (
    <div className='flex flex-col gap-2'>
      <VTypography as="h4" color="primary">
          {section?.name}
        </VTypography>
      {section?.description && (
        <VTypography as="p" color="secondary">
          {section.description}
        </VTypography>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {children || (
          <>
            <SectionProgressSummary />
            <TestSectionPagination />
          </>
        )}
      </div>
    </div>
  );
}