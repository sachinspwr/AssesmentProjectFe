import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';
import { VICon } from '@components/atoms';
import { FiEye } from 'react-icons/fi';
import { TestResultResponseDTO } from '@dto/response';
import { InviterAssessmentResponseDto } from '@dto/response/inviter-assessment.response.dto';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import React from 'react';

function AssessmentQuestionTable({
  detailedResultData,
  onReviewQuestion,
}: {
  detailedResultData: TestResultResponseDTO;
  onReviewQuestion: (args: { questionId: string; sectionId: string }) => void;
}) {
  const { sections = [] } = detailedResultData ?? {};

  // Group questions by section
  const sectionQuestionData = sections.map((section) => {
    const questions: InviterAssessmentResponseDto[] = section?.questions?.map((q) => {
      return {
        id: q.id,
        sectionId: section.id,
        question: q.text || 'Unknown Question',
        difficultyLevel: q.difficulty || 'Unknown',
        questionType: q.type || 'Unknown',
        duration: q.timeSpentSeconds ?? 0,
        score: q?.maxScore ? parseFloat(q?.maxScore as unknown as string) : 0,
      };
    });

    return {
      sectionId: section.id,
      sectionName: section.title,
      questions,
    };
  });

  const columnsConfig: VTableColumn<InviterAssessmentResponseDto>[] = [
    {
      key: 'question',
      label: 'Questions',
      className: 'w-2/5',
      sortable: true,
    },
    {
      key: 'difficultyLevel',
      label: 'Difficulty',
    },
    {
      key: 'questionType',
      label: 'Type',
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
    },
    {
      key: 'actions',
      label: 'Actions',
      customRender: (row) => (
        <VICon
          className="text-theme-brand"
          icon={FiEye}
          onClick={() => onReviewQuestion({ questionId: row.id, sectionId: row.sectionId ?? '' })}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {sectionQuestionData.map((section) => (
        <div key={section.sectionId}>
          <VTypography as="h5">{section.sectionName}</VTypography>
          <VTable
            title={
              <VTypography as="small">
                Questions in {section.sectionName} (Total {section.questions.length})
              </VTypography>
            }
            data={section.questions}
            columns={columnsConfig}
            itemsPerPage={5}
            emptyState={<div>No questions found in this section!</div>}
            tableClassName="table-fixed w-full"
          />
        </div>
      ))}
    </div>
  );
}

export default AssessmentQuestionTable;
