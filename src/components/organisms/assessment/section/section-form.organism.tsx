import { useRef, useState } from 'react';
import { useSearchQuestionMutation } from 'store/slices/questions.slice';
import QuestionsTable from './questions-table.organism';
import { SectionInputFields } from './section-input-fields.organism';
import { VButton, VCard } from '@components/atoms';
import { useCreateTestSectionMutation, useUpdateTestSectionMutation } from 'store/slices/test-section.slice';
import { TestSectionRequestDTO } from '@dto/request/test-section-request.dto';
import toast from 'react-hot-toast';
import { AdvancedQuestionFilter } from './advanced-question-filter.organism';
import { QuestionRequestDTO, SearchRequestDTO } from '@dto/request';
import { VToggle } from '@components/organisms/toggle/v-toggle.organism';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { SectionStats } from './section-stat.organism';
import { Question, TestSection } from 'models';
import { mapper } from 'mapper';
import { QuestionResponseDTO } from '@dto/response';
import { VLoader } from '@components/molecules/index';
import { VFilterRef } from '@components/organisms/filter/v-filter.organism';

type SectionFormProps = {
  testId: string;
  testSection?: TestSection;
  onCancel: () => void;
  onComplete: (section: TestSection) => void;
  testQuestionFormat: string;
};

function SectionForm({ testId, testSection, onCancel, onComplete, testQuestionFormat }: SectionFormProps) {
  const [sectionDetails, setSectionDetail] = useState<TestSection>(testSection ?? new TestSection());
  const [createTestSection, { isLoading: isCreatingSection }] = useCreateTestSectionMutation();
  const [updateTestSection, { isLoading: isUpdatingSection }] = useUpdateTestSectionMutation();
  const [searchQuestion, { data: paginationResponse, isLoading: isSearching }] = useSearchQuestionMutation();
  const [hasSearched, setHasSearched] = useState(false);
  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  

  const questions = (paginationResponse?.data || []).map((question) =>
    mapper.map(question, QuestionResponseDTO, Question)
  );

  const handleFilterApply = (searchRequest: SearchRequestDTO<QuestionRequestDTO>) => {
    setHasSearched(true);
    searchQuestion(searchRequest);
  };

  const handleAddQuestions = (selectedIds: string[]) => {
    const selectedData = questions.filter((q) => selectedIds.includes(q.id!));
    const filteredSectQuestions = sectionDetails.questions?.filter((q) => selectedIds.includes(q.id!));
    const updatedQuestions = [
      ...(filteredSectQuestions ?? []),
      ...selectedData.filter((newQuestion) => !sectionDetails.questions?.some((q) => q.id === newQuestion.id)),
    ];
    setSectionDetail((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleRemoveQuestions = (selectedIds: string[]) => {
    const updatedQuestions = sectionDetails.questions?.filter((q) => selectedIds.includes(q.id!)) ?? [];
    setSectionDetail((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const handleSaveSection = async () => {
    const sectionId = sectionDetails?.id;
    const sectionData: TestSectionRequestDTO = {
      ...{ ...sectionDetails, testId },
      questionIds: sectionDetails?.questions?.map((q) => q.id) || [],
      isPublic: false,
    };

    try {
      let sectionSaved = {};
      if (sectionId) {
        sectionSaved = await updateTestSection({ testId, sectionId, sectionData }).unwrap();
      } else {
        sectionSaved = await createTestSection({ testId, sectionData }).unwrap();
      }
      onComplete({ ...sectionDetails, ...sectionSaved });
    } catch (error) {
      toast.error('Failed to create section. Please try again.');
    }
  };

  const hasSelectedQuestions = (sectionDetails?.questions ?? []).length > 0;
  

  const handleFilterReset = () => {
    setHasSearched(false);
    searchQuestion(SearchRequestDTO.default([]));
  };
  

  return (
    <div className="flex flex-col">
      <SectionInputFields sectionDetails={sectionDetails} onSectionDetailChange={setSectionDetail} />

      {/* Available Questions Table */}
      <VToggle title={<VTypography as="h5">Add Questions</VTypography>} defaultOpen={!hasSelectedQuestions}>
       <VCard className='shadow-sm'>
       <AdvancedQuestionFilter onFilterApply={handleFilterApply} onReset={handleFilterReset} selectedTestFormat={testQuestionFormat} filterRef={filterRef} filterButtonRef={filterButtonRef}/>
        {isSearching ? (
          <VLoader size="md" />
        ) : questions.length > 0 ? (
          <QuestionsTable
            mode="select"
            questions={questions}
            selectedQuestions={sectionDetails?.questions ?? []}
            onSelect={handleAddQuestions}
          />
        ) : hasSearched ? (
          <div className="text-center text-gray-500 py-8">No results found</div>
        ) : null }
       </VCard>
      </VToggle>

      <hr className="my-4" />

      {/* Selected Questions Table */}
      <>
        <SectionStats section={sectionDetails} />
        {sectionDetails?.questions && (
          <QuestionsTable
            mode="select"
            questions={sectionDetails?.questions ?? []}
            selectedQuestions={sectionDetails?.questions ?? []}
            onSelect={handleRemoveQuestions}
          />
        )}
      </>

      <div className="flex gap-5 my-8">
        <VButton variant="secondary" className="!w-20" onClick={onCancel}>
          Cancel
        </VButton>
        <VButton className="!w-44" onClick={handleSaveSection} isLoading={isCreatingSection || isUpdatingSection}>
          Save
        </VButton>
      </div>
    </div>
  );
}

export { SectionForm };
