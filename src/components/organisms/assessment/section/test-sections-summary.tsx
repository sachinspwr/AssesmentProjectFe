import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { formatDuration } from '@utils/functions';
import { TestSection } from 'models';

type TestSectionsSummaryProps = {
  sections: TestSection[];
  cutOffPercentage?: number; // Optional overall cutoff percentage
};

function getTestSummaryStats(sections: TestSection[], cutOffPercentage?: number) {
  let totalQuestions = 0;
  let totalDuration = 0;
  let totalMarks = 0;
  let totalCutoffMarks = 0;
  let hasSectionCutoffs = false;

  sections.forEach(section => {
    const questions = section.questions ?? [];
    const sectionMarks = questions.reduce((sum, q) => sum + (q.marks ?? 0), 0);
    
    totalQuestions += questions.length;
    totalDuration += questions.reduce((sum, q) => sum + (q.timeLimit ?? 0), 0);
    totalMarks += sectionMarks;

    // Calculate section-level cutoff if exists
    if (section.cutoffScore) {
      hasSectionCutoffs = true;
      totalCutoffMarks += Math.round((section.cutoffScore / 100) * sectionMarks);
    }
  });

  // Calculate overall cutoff if provided (overrides section-level cutoffs)
  const overallCutoffMarks = cutOffPercentage 
    ? Math.round((cutOffPercentage / 100) * totalMarks)
    : null;

  return {
    totalSections: sections.length,
    totalQuestions,
    totalDuration,
    totalMarks,
    cutoffMarks: overallCutoffMarks ?? (hasSectionCutoffs ? totalCutoffMarks : null),
    cutoffPercentage: overallCutoffMarks ? cutOffPercentage : null
  };
}

export function TestSectionsSummary({ sections, cutOffPercentage }: TestSectionsSummaryProps) {
  const { 
    totalSections,
    totalQuestions,
    totalDuration,
    totalMarks,
    cutoffMarks,
    cutoffPercentage
  } = getTestSummaryStats(sections, cutOffPercentage);

  return (
    <div className="bg-theme-default-alt px-4 py-2 rounded-lg mb-4">
      <div className="flex gap-x-4 flex-wrap items-center">
        <div className="flex gap-1">
          <span className="!text-theme-secondary">Sections:</span>
          <VTypography as="h6" className="!text-theme-secondary">
            {totalSections}
          </VTypography>
        </div>
        
        <p>|</p>
        
        <div className="flex gap-1">
          <span className="!text-theme-secondary">Questions:</span>
          <VTypography as="h6" className="!text-theme-secondary">
            {totalQuestions}
          </VTypography>
        </div>
        
        <p>|</p>
        
        <div className="flex gap-1">
          <span className="!text-theme-secondary">Duration:</span>
          <VTypography as="h6" className="!text-theme-secondary">
            {formatDuration(totalDuration)}
          </VTypography>
        </div>
        
        <p>|</p>
        
        <div className="flex gap-1">
          <span className="!text-theme-secondary">Total Marks:</span>
          <VTypography as="h6" className="!text-theme-secondary">
            {totalMarks}
          </VTypography>
        </div>

        {(cutoffMarks !== null) && (
          <>
            <p>|</p>
            <div className="flex gap-1">
              <span className="!text-theme-secondary">Cutoff Score:</span>
              <VTypography as="h6" className="!text-theme-secondary">
                {cutoffMarks}
                {cutoffPercentage && ` (${cutoffPercentage}%)`}
                {!cutoffPercentage && ' (Auto)'}
              </VTypography>
            </div>
          </>
        )}
      </div>
    </div>
  );
}