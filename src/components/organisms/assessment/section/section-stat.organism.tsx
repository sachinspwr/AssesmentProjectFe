import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { formatDuration } from '@utils/functions';
import { TestSection } from 'models';

type Props = {
  section: TestSection;
};

function getSectionStats(section: TestSection) {
  const questions = section.questions ?? [];
  const questionCount = questions.length;
  const sectionDuration = questions.reduce((sum, q) => sum + (q.timeLimit ?? 0), 0);
  const sectionMarks = questions.reduce((sum, q) => sum + (q.marks ?? 0), 0);

  // Calculate actual cutoff marks from percentage
  const cutoffMarks = section.cutoffScore ? Math.round((section.cutoffScore / 100) * sectionMarks) : null;

  return {
    questionCount,
    sectionDuration,
    sectionMarks,
    cutoffMarks,
  };
}

export function SectionStats({ section }: Props) {
  const { questionCount, sectionDuration, sectionMarks, cutoffMarks } = getSectionStats(section);

  return (
    <div className="flex gap-x-4 flex-wrap">
      <p className="flex gap-1">
        <span className="!text-theme-secondary">Questions:</span>{' '}
        <VTypography as="h6" className="!text-theme-secondary">
          {questionCount}
        </VTypography>
      </p>
      <p>|</p>
      <p className="flex gap-1">
        <span className="!text-theme-secondary">Duration:</span>{' '}
        <VTypography as="h6" className="!text-theme-secondary">
          {formatDuration(sectionDuration)}
        </VTypography>
      </p>
      <p>|</p>
      <p className="flex gap-1">
        <span className="!text-theme-secondary">Marks:</span>{' '}
        <VTypography as="h6" className="!text-theme-secondary">
          {sectionMarks}
        </VTypography>
      </p>
      <p>|</p>
      <p className="flex gap-1">
        <span className="!text-theme-secondary">CutOff:</span>{' '}
        <VTypography as="h6" className="!text-theme-secondary">
          {cutoffMarks !== null ? `${cutoffMarks} (${section.cutoffScore}%)` : 'NA'}
        </VTypography>
      </p>
    </div>
  );
}
