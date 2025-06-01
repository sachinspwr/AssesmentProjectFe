import { VButton, VICon } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { formatDuration, splitAndCapitalize } from '@utils/functions';
import { TestInstructionOption } from 'models';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'store/store';

interface SectionWiseData {
  id: number;
  sectionName: string;
  difficultyLevel: string;
  totalQuestions: number;
  cutoffScore: string;
  duration?: number;
  score?: number;
}
const TestMetadatapage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const testDetails = useAppSelector((state) => state.testRunner.testDetails);

  // const sectionWiseData: SectionWiseData[] = [
  //   {
  //     id: 1,
  //     sectionName: 'General Knwoledge',
  //     totalQuestions: 10,
  //     difficultyLevel: 'Easy',
  //     questionType: 'Multiple Choice',
  //     duration: 20,
  //     score: 90,
  //   },
  //   {
  //     id: 2,
  //     sectionName: 'It is a long established fact...',
  //     totalQuestions: 10,
  //     difficultyLevel: 'Medium',
  //     questionType: 'True/False',
  //     duration: 15,
  //     score: 85,
  //   },
  //   {
  //     id: 3,
  //     sectionName: 'It is a long established fact...',
  //     totalQuestions: 10,
  //     difficultyLevel: 'Hard',
  //     questionType: 'Multiple Choice',
  //     duration: 30,
  //     score: 75,
  //   },
  //   {
  //     id: 4,
  //     sectionName: 'It is a long established fact...',
  //     totalQuestions: 10,
  //     difficultyLevel: 'Easy',
  //     questionType: 'Multiple Choice',
  //     duration: 25,
  //     score: 95,
  //   },
  // ];

  const sectionWiseData: SectionWiseData[] = testDetails?.testSections?.map((section) => {
    const totalSectionScore=section?.questions?.reduce((total, que) => total + (que.marks || 0), 0)
    const sectionCutoff = Math.floor(
      (((section?.cutoffScore as number) / 100) * totalSectionScore) as number
    );
    return {
      id: section?.id,
      sectionName: section?.name,
      totalQuestions: section?.questions?.length,
      cutoffScore: sectionCutoff,
      duration: formatDuration(section?.questions?.reduce((total, que) => total + (que.timeLimit || 0), 0) as number),
      score: totalSectionScore,
    };
  });

  // Group instructions by category
  const groupedInstructions = testDetails?.testInstructions?.reduce(
    (acc: Record<string, TestInstructionOption[]>, instruction) => {
      if (!acc[instruction.category]) {
        acc[instruction.category] = [];
      }
      acc[instruction.category].push(instruction as TestInstructionOption);
      return acc;
    },
    {}
  );

  const cutoffMarks = Math.floor(
    (((testDetails?.cutoffScorePercentage as number) / 100) * testDetails?.maxScore) as number
  );

  const columnsConfig: VTableColumn<SectionWiseData>[] = [
    {
      key: 'sectionName',
      label: 'Section Name',
      customRender: (row: SectionWiseData) => (
        <VTypography as="p" className="text-theme-primary">
          {row.sectionName}
        </VTypography>
      ),
    },
    {
      key: 'totalQuestions',
      label: 'Total Questions',
      customRender: (row: SectionWiseData) => (
        <VTypography as="p" className="text-theme-primary">
          {row.totalQuestions}
        </VTypography>
      ),
    },
    {
      key: 'cutoffScore',
      label: 'Cutoff Score',
      customRender: (row: SectionWiseData) => (
        <VTypography as="p" className="text-theme-primary">
          {row.cutoffScore}
        </VTypography>
      ),
    },
    {
      key: 'duration',
      label: 'Duration in Minutes',
      customRender: (row: SectionWiseData) => (
        <VTypography as="p" className="text-theme-primary">
          {row.duration}
        </VTypography>
      ),
    },
    {
      key: 'score',
      label: 'Score',
      customRender: (row: SectionWiseData) => (
        <VTypography as="p" className="text-theme-primary">
          {row.score}
        </VTypography>
      ),
    },
  ];
  function handleStartTest(): void {
    navigate(`/test-runner/${id}/test-interface`);
  }

  return (
    <div className="py-5 px-16">
      <div className="flex items-center gap-5">
        {/* <VICon icon={FaArrowLeft} size={18}/> */}
        <VTypography as="h4">Test Details</VTypography>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <VTypography as="h4">{testDetails?.title}</VTypography>
      <VTypography as="small" color="muted">{`Test Description : ${testDetails?.description}`}</VTypography>
      <div className="mt-5 flex gap-5 items-center">
        <div>
          <VTypography as="small" color="muted">
            Total Sections:{' '}
            <VTypography as="label" className="font-semibold">
              {testDetails?.totalSections}
            </VTypography>
          </VTypography>
        </div>
        <div>
          <VTypography as="small" color="muted">
            Total Questions:{' '}
            <VTypography as="label" className="font-semibold">
              {testDetails?.totalQuestions}
            </VTypography>
          </VTypography>
        </div>
        <div>
          <VTypography as="small" color="muted">
            Level:
            <VTypography as="label" className="font-semibold">
              {testDetails?.experienceLevel.name}
            </VTypography>
          </VTypography>
        </div>
        <div>
          <VTypography as="small" color="muted">
            Pass Criteria:
            <VTypography as="label" className="font-semibold">
              {' '}
              {`${cutoffMarks} / ${testDetails?.maxScore}`}
            </VTypography>
          </VTypography>
        </div>
        <div>
          <VTypography as="small" color="muted">
            Duration:
            <VTypography as="label" className="font-semibold">
              {formatDuration(testDetails?.durationInMinutes as number)}
            </VTypography>
          </VTypography>
        </div>
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div>
        <VTypography as="h4">Section Details</VTypography>
        <VTable<SectionWiseData>
          title={
            <VTypography as="small">{`List of all Sections(Total Sections: ${testDetails?.totalSections})`}</VTypography>
          }
          data={sectionWiseData}
          columns={columnsConfig}
          headerClassName="font-[600]"
          itemsPerviewMode={5}
          tableClassName="w-full border border-gray-200"
          emptyState={<div>No Section found!</div>}
        />
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div>
        <VTypography as="h4">Instructions</VTypography>
        <VTypography as="small">Rules and regulations for your assessment.</VTypography>

        {groupedInstructions && (
          <div className="mt-3 space-y-4 text-sm text-theme-primary">
            {Object.entries(groupedInstructions).map(([category, instructions]) => (
              <div key={category}>
                <VTypography as="h6" className="font-medium">
                  {splitAndCapitalize(category)}
                </VTypography>
                <ul className="list-disc pl-5 space-y-1">
                  {instructions.map((instruction, index) => (
                    <li key={index}>{instruction.description}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border border-theme-default mb-5 mt-5"></div>
      <div className="flex items-center gap-5 w-[50%]">
        <VButton type="button" variant="secondary">
          Cancel
        </VButton>
        <VButton type="button" variant="primary" className={"text-nowrap"}>
          Sample Assessment
        </VButton>
        <VButton type="button" variant="primary" className={"text-nowrap"} onClick={handleStartTest} disabled={testDetails?.testSections?.length==0}>
          Start Test
        </VButton>
      </div>
    </div>
  );
};

export default TestMetadatapage;
