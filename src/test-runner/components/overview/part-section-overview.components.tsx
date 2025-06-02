import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VTableColumn } from '@components/organisms';
import VTable from '@components/organisms/table/v-table.organism';
import { DifficultyLevel, QuestionType } from '@utils/enums';
import { formatDuration } from '@utils/functions';
import { TestDetails } from 'test-runner/types';
import { analyzeSection } from 'test-runner/utils';

interface SectionWiseData {
  id: string;
  sectionName: string;
  totalQuestions: number;
  difficulty: DifficultyLevel;
  sectionQuestionFormat: QuestionType | 'Hybrid';
  duration: string;
  score: string;
}

type PartSectionOverviewProps = {
  test: TestDetails;
};

export function PartSectionOverview({ test }: PartSectionOverviewProps) {
  const { sections = [], totalSections = 0 } = test;

  const sectionWiseData: SectionWiseData[] =
    sections.map((section) => {
      const totalScore = section.questions.reduce((sum, q) => sum + q.marks, 0);
      const totalTime = section.questions.reduce((sum, q) => sum + q.timeLimit, 0);
      const { dominantDifficulty, questionTypes } = analyzeSection(section);
      return {
        id: section.id,
        sectionName: section.name,
        totalQuestions: section.questions.length,
        difficulty: dominantDifficulty,
        sectionQuestionFormat: questionTypes.dominantType,
        duration: formatDuration(totalTime),
        score: `${totalScore}marks`,
      };
    }) ?? [];

  const columnsConfig: VTableColumn<SectionWiseData>[] = [
    { key: 'sectionName', label: 'Section Name' , customRender: (row: SectionWiseData) => <p className="font-[500]  text-theme-primary">{row.sectionName}</p>,},
    { key: 'difficulty', label: 'Difficulty Level' },
    { key: 'totalQuestions', label: 'Total Questions' },
    { key: 'sectionQuestionFormat', label: 'Question Format' },
    { key: 'duration', label: 'Duration' },
    { key: 'score', label: 'Score' },
  ];

  return (
    <div className="mb-4">
      <div>
        <div className="flex flex-col gap-4">
          <VTypography as="h4">Section Details</VTypography>
          <VTypography as="h6">{`List of All Sections (Total Sections: 0${totalSections})`}</VTypography>
        </div>
        <VTable<SectionWiseData>
          data={sectionWiseData}
          columns={columnsConfig}
          containerClassName="!p-0 !m-0" // Remove padding and margin from the container
          emptyState={<div>No Section found!</div>}
        />
      </div>
    </div>
  );
}

export default PartSectionOverview;
