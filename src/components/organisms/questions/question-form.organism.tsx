import { VDynamicForm } from '@components/organisms/dynamic-form/v-dynamic-form.organism';
import { VButton, VInput, VLabel, VSwitch } from '@components/atoms';
import { useFetchSubjectsQuery } from 'store/slices/subject.slice';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import { useFetchIndustriesQuery } from 'store/slices/industry.slice';
import { useFetchDomainsQuery } from 'store/slices/domain.slice';
import { DifficultyLevel, QuestionType } from '@utils/enums';
import { useEffect, useState } from 'react';
import { useFetchIndustryRolesQuery } from 'store/slices/industry-role.slice';
import { QuestionRequestDTO } from '@dto/request';
import {
  useCreateQuestionMutation,
  usePublishQuestionMutation,
  useUpdateQuestionMutation,
} from 'store/slices/questions.slice';
import { mapToFormFieldData, VFormFields } from '@types';
import TagSelector from '@components/organisms/tag-selector/tag-selector.organism';
import { QuestionResponseDTO } from '@dto/response';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryRoleResponseDTO } from '@dto/response/industry-role-response.dto';
import ManageQuestionPreviewpage from '@components/pages/question/manage-question-preview.page';
import { TestCase, TestCaseList } from './test-cases.organism';
import { ProblemStatementList, ProblemStatementValues } from './problem-configuration.organism';
import { ProgrammingLanguage } from '@utils/enums/programming-language.enum';
import { CodingQuestionGradingStrategy } from '@utils/enums/coding-question-grading-strategy.enum';
import { ProblemDescriptionEditor } from './problem-description.organism';
import { StarterCode, StarterCodeList } from './starter-code.organism';
import { TestCaseKind } from '@utils/enums/test-kind.enum';
import toast from 'react-hot-toast';
import { QuestionStatus } from '@utils/enums/question-status.enum';

type QuestionFormProps = {
  initialValue?: QuestionResponseDTO;
  renderMode?: ActionMode;
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void;
  onSuccess?: () => void;
  mode?: 'view' | 'edit';
  viewMode?: string;
  pageChildren?: React.ReactNode;
};

function QuestionForm({
  initialValue,
  renderMode = 'create',
  isPreview,
  setIsPreview,
  onSuccess,
  mode = 'edit',
  viewMode = 'content',
}: QuestionFormProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [industryDomains, setIndustryDomains] = useState<DomainResponseDTO[]>([]);
  const [domainRoles, setDomainRoles] = useState<IndustryRoleResponseDTO[]>([]);

  const [isPublic, setIsPublic] = useState(true);
  const [isSavedOrSubmitted, setIsSavedOrSubmitted] = useState(false);
  const [publishQuestion, { isLoading: isPublishing }] = usePublishQuestionMutation();

  //#region load prerequisite
  const { data: subjects = [] } = useFetchSubjectsQuery();
  const { data: experience_level = [] } = useFetchExperienceLevelQuery();
  const { data: industries = [] } = useFetchIndustriesQuery();
  const { data: domains = [] } = useFetchDomainsQuery();
  const { data: industryRoles = [] } = useFetchIndustryRolesQuery();

  const [createQuestion, { isLoading: isCreatingQuestion }] = useCreateQuestionMutation();
  const [updateQuestion, { isLoading: isUpdatingQuestion }] = useUpdateQuestionMutation();

  useEffect(() => {
    const filteredDomains = domains.filter((domain) => domain.industryId === selectedIndustry) ?? [];
    setIndustryDomains(filteredDomains);

    const filteredRoles = industryRoles.filter((role) => role.domainId === selectedDomain) ?? [];
    setDomainRoles(filteredRoles);
  }, [selectedIndustry, selectedDomain, domains, industryRoles]);

  useEffect(() => {
    if (renderMode === 'edit') {
      const initialDomains = domains.filter((domain) => domain.industryId === initialValue?.industryId) ?? [];
      setIndustryDomains(initialDomains);

      const initialRoles = industryRoles.filter((role) => role.domainId === initialValue?.domainId) ?? [];
      setDomainRoles(initialRoles);

      setSelectedIndustry(initialValue?.industryId ?? null);
      setSelectedDomain(initialValue?.domainId ?? null);
    }
  }, [renderMode, initialValue, domains, industryRoles]);

  function extractPlaceholders(text: string): string[] {
    const matches = text?.match(/\{(\d+)\}/g);
    return matches ? Array.from(new Set(matches)) : [];
  }

  //#endregion

  const quesformConfig: VFormFields[] = [
    {
      type: 'group',
      position: '1 1 12',
      label: 'Basic Details',
      fields: [
        {
          name: 'isPublic',
          label: 'Public',
          type: 'switch',
          classNames: 'w-full flex justify-end',
          onChange: (value: string) => {
            setIsPublic(value === 'true');
          },
          position: '1 11 2',
        },
        {
          name: 'type',
          label: 'Question Type',
          type: 'select',
          required: true,
          options: Object.entries(QuestionType).map(([, value]) => ({ value: value, label: value })),
          placeholder: 'Select Question Type',
          position: '2 1 3',
          onChange: (selectedValue) => {
            console.log('Selected value: ', selectedValue);
          },
        },
        {
          name: 'subjectId',
          label: 'Subject',
          type: 'select',
          required: true,
          placeholder: 'Select Subject',
          options: subjects.map((subject: { id: string; name: string }) => ({
            value: subject.id,
            label: subject.name,
          })),
          position: '2 4 3',
        },
        {
          name: 'topic',
          label: 'Topic',
          type: 'text',
          placeholder: 'Enter Topic',
          position: '2 7 3',
        },
        {
          name: 'difficulty',
          label: 'Difficulty Level',
          type: 'select',
          required: true,
          placeholder: 'Select Difficulty Level',
          options: Object.entries(DifficultyLevel).map(([key, value]) => ({ value: key, label: value })),
          position: '2 10 3',
        },
        {
          name: 'industryId',
          label: 'Industry',
          type: 'select',
          required: true,
          placeholder: 'Select Industry',
          options: industries.map((industry: { id: string; name: string }) => ({
            value: industry.id,
            label: industry.name,
          })),
          onChange: (selectedValue) => {
            setSelectedIndustry(selectedValue);
          },
          position: '3 1 3',
        },
        {
          name: 'domainId',
          label: 'Domain',
          type: 'select',
          required: true,
          placeholder: 'Select Domain',
          options: industryDomains.map((domain: { id: string; name: string }) => ({
            value: domain.id,
            label: domain.name,
          })),
          onChange: (selectedValue) => {
            setSelectedDomain(selectedValue);
          },
          position: '3 4 3',
        },
        {
          name: 'industryRoleId',
          label: 'Domain Role',
          type: 'select',
          required: true,
          placeholder: 'Select Domain Role',
          options: domainRoles.map((industryRoles: { id: string; name: string }) => ({
            value: industryRoles.id,
            label: industryRoles.name,
          })),
          position: '3 7 3',
        },
        {
          name: 'experienceLevelId',
          label: 'Experience Level',
          type: 'select',
          required: true,
          placeholder: 'Select Experience Level',
          options: experience_level.map((experience: { id: string; name: string }) => ({
            value: experience.id,
            label: experience.name,
          })),
          position: '3 10 3',
        },
        {
          name: 'marks',
          label: 'Marks',
          type: 'number',
          placeholder: 'Enter Marks',
          required: true,
          position: '4 1 3',
          validate(value) {
            if (Number(value) < 0) {
              return 'Marks must be a Positive Number';
            } else if (Number(value) === 0) {
              return 'Marks should not be 0';
            }
            return '';
          },
        },
        {
          name: 'timeLimit',
          label: 'Time Limit (In Min)',
          type: 'number',
          required: true,
          placeholder: 'Enter Duration',
          position: '4 4 3',
          validate(value) {
            if (Number(value) < 0) {
              return 'Time Limit must be a Positive Number';
            } else if (Number(value) === 0) {
              return 'Time Limit should not be 0';
            }
            return '';
          },
        },
        {
          name: 'tags',
          label: 'Add Tags',
          type: 'renderItem',
          renderItem: (value, onChange, formData, mode) => (
            <TagSelector value={value as string[]} onChange={onChange} placeholder={`Search tags...`} mode={mode} />
          ),
          required: true,
          placeholder: 'Enter Tags',
          position: '4 7 4',
        },
        {
          name: 'custom',
          type: 'custom',
          customContent: <div className="border-b-2 my-auto"></div>,
          position: '5 1 12',
        },
      ],
    },
    {
      type: 'group',
      label: 'Question Text & Description',
      shouldRender: ({ type }) => type !== QuestionType.Coding,
      position: '6 1 10',
      fields: [
        {
          name: 'questionText',
          label: 'Question Text',
          type: 'text-area',
          // required: true,
          placeholder: 'Enter Question Text',
          position: '7 1 6', // Positioning the field in grid: row 7, column 1, spanning 6 columns
        },
        {
          name: 'questionExplanation',
          label: 'Question Description',
          type: 'text-area',
          placeholder: 'Enter Question Description',
          position: '7 7 6', // Positioning the field in grid: row 7, column 7, spanning 6 columns
        },
        {
          name: 'custom',
          type: 'custom',
          customContent: <div className="border-b-2 my-auto"></div>,
          position: '9 1 12',
        },
      ],
    },
    {
      type: 'group',
      label: 'Answer Options',
      position: '10 1 12',
      shouldRender: ({ type }) =>
        [
          QuestionType.SingleChoice,
          QuestionType.MultipleChoice,
          QuestionType.FillInTheBlanks,
          QuestionType.TrueFalse,
        ].includes(type as QuestionType),
      fields: [
        {
          name: 'correctAnswer',
          type: 'hidden',
          required: ({ type }) => type === QuestionType.ShortAnswer || type === QuestionType.Essay,
          computeDependencies: ['type'],
          compute: () => {
            return [];
          },
        },
        {
          name: 'answerOptions',
          label: 'Add answers options here, mark correct answer with toggle',
          type: 'list',
          placeholder: 'Enter item',
          required: ({ type }) => (type === QuestionType.ShortAnswer || type === QuestionType.Essay ? true : false),
          disabled: ({ type }) => (type === QuestionType.TrueFalse ? true : false),
          shouldRender: ({ type }) =>
            [
              QuestionType.SingleChoice,
              QuestionType.MultipleChoice,
              QuestionType.FillInTheBlanks,
              QuestionType.TrueFalse,
            ].includes(type as QuestionType),
          renderItem: (value, onChange, formData, index) => {
            const correctAnswer = (formData?.correctAnswer as string[]) ?? [];
            const isCorrect = correctAnswer.includes((value ?? '') as string);
            const placeholderCount = extractPlaceholders(formData?.questionText as string)?.length || 0;

            return (
              <>
                <VLabel className="col-span-1">Option {String.fromCharCode(65 + index!)}</VLabel>
                <div className="col-span-3">
                  <VInput
                    name={`customList[${index}]`}
                    value={value as string}
                    placeholder="Enter Details"
                    onChange={(newValue) => {
                      const updatedAnswers = correctAnswer.map((x) => (x === value ? newValue : x));
                      onChange(newValue, { correctAnswer: updatedAnswers });
                    }}
                    className="w-full h-full"
                    mode={mode}
                  />
                </div>
                <div className="col-span-1 mx-auto mt-1">
                  <VSwitch
                    type="primary"
                    value={isCorrect ? 'true' : 'false'}
                    disabled={
                      !value ||
                      (isCorrect && correctAnswer.length === 1) ||
                      (placeholderCount === 0 && formData?.type === QuestionType.FillInTheBlanks)
                    }
                    onChange={(isToggled) => {
                      let updatedAnswers: string[] | null = null;

                      const isCorrect = isToggled === 'true';

                      if (isCorrect) {
                        switch (formData?.type) {
                          case QuestionType.SingleChoice:
                          case QuestionType.TrueFalse:
                            updatedAnswers = [value as string]; // Only one correct answer
                            break;

                          case QuestionType.FillInTheBlanks: {
                            const currentCorrectAnswers = Array.isArray(correctAnswer) ? correctAnswer : [];
                            // If there's only one placeholder, replace the answer
                            if (placeholderCount === 1) {
                              updatedAnswers = [value as string];
                            } else {
                              // If multiple placeholders, allow up to `placeholderCount` answers, removing the first if exceeding limit
                              if (currentCorrectAnswers.length < placeholderCount) {
                                updatedAnswers = [...currentCorrectAnswers, value as string];
                              } else {
                                updatedAnswers = [...currentCorrectAnswers.slice(1), value as string]; // Remove the first selection
                              }
                            }

                            break;
                          }

                          case QuestionType.MultipleChoice:
                            updatedAnswers = [...correctAnswer, value as string];
                            break;

                          default:
                            updatedAnswers = null; // For other question types, set correctAnswer to null
                            break;
                        }
                      } else {
                        updatedAnswers = correctAnswer.filter((x) => x !== value);
                      }

                      onChange(value, { correctAnswer: updatedAnswers });
                    }}
                  />
                </div>
              </>
            );
          },
          computeDependencies: ['type', 'questionText'],
          compute: ({ type, questionText }) => {
            if (type === QuestionType.TrueFalse) {
              return ['True', 'False'];
            }

            if (type === QuestionType.FillInTheBlanks && typeof questionText === 'string') {
              const placeholders = extractPlaceholders(questionText);
              return Array.from({ length: placeholders.length }, () => '');
            }

            return [];
          },
          position: '11 1 12',
        },
        {
          name: 'custom',
          type: 'custom',
          customContent: <div className="border-b-2 my-auto"></div>,
          position: '12 1 12',
        },
      ],
    },
    {
      type: 'group',
      label: 'Problem Description',
      position: '10 1 12',
      shouldRender: ({ type }) => {
        return (type as QuestionType) === QuestionType.Coding;
      },
      fields: [
        {
          name: 'problemMarkdown',
          type: 'renderItem',
          position: '11 1 12',
          renderItem: (value, onChange) => (
            <ProblemDescriptionEditor name="problemMarkdown" value={value as string} onChange={onChange} />
          ),
          computeDependencies: ['type'],
        },
        {
          name: 'problemConfiguration',
          type: 'renderItem',
          position: '12 1 12',
          renderItem: (value, onChange) => (
            <ProblemStatementList
              name="problemStatement"
              value={value as unknown as ProblemStatementValues}
              onChange={onChange}
            />
          ),
          computeDependencies: ['type'],
        },
        // Test Cases Section
        {
          name: 'testCases',
          type: 'renderItem',
          label: 'Test Cases',
          position: '13 1 12',
          renderItem: (value, onChange) => {
            const testCases = Array.isArray(value)
              ? value.map((item, index) =>
                  typeof item === 'string'
                    ? {
                        caseNumber: index++,
                        title: `Test Case ${index + 1}`,
                        input: item,
                        expectedOutput: '',
                        kind: TestCaseKind.Sample,
                        weight: 10,
                        isPublic: false,
                      }
                    : (item as TestCase)
                )
              : [];

            return <TestCaseList name="testCases" value={testCases} onChange={onChange} />;
          },
          computeDependencies: ['type'],
        },
        {
          name: 'starterCode',
          type: 'renderItem',
          label: 'Starter Codes',
          position: '14 1 12',
          computeDependencies: ['type', 'problemConfiguration'],
          renderItem: (value, onChange, formData) => {
            const config = formData?.problemConfiguration as ProblemStatementValues | undefined;
            const allowedLangs = config?.allowedLanguages ?? [];

            const starterCodes = Array.isArray(value)
              ? value.map((item, index) =>
                  typeof item === 'string'
                    ? {
                        language: `lang${index + 1}` as ProgrammingLanguage,
                        template: item,
                        solutionCode: item,
                      }
                    : (item as StarterCode)
                )
              : [];

            return (
              <StarterCodeList
                name="starterCodes"
                value={starterCodes}
                allowedLanguages={allowedLangs}
                onChange={onChange}
              />
            );
          },
        },
        {
          name: 'custom',
          type: 'custom',
          customContent: <div className="border-b-2 my-auto"></div>,
          position: '15 1 12',
        },
      ],
    },
    {
      type: 'group',
      label: 'Answer Explanation',
      position: '16 1 12',
      fields: [
        {
          name: 'answerExplanation',
          label: 'Answer Explanation',
          type: 'text-area',
          placeholder: 'Enter Explanation',
          position: '17 1 6', // Positioning the field in grid: row 2, column 1, spanning 6 columns
        },
      ],
    },
    {
      name: 'custom',
      type: 'custom',
      customContent: (
        <VButton name="preview-button" variant="secondary" onClick={() => setIsPreview(true)}>
          Preview Question
        </VButton>
      ),
      position: '18 1 2',
    },
    {
      name: 'save',
      label: 'Save Question',
      type: 'submit',
      position: '18 3 2',
    },
    {
      name: 'buttons',
      type: 'custom',
      customContent:
        isPublic && viewMode === 'content' ? (
          <VButton type="submit" name="save-and-review" className="!w-60">
            Save & Mark For Review
          </VButton>
        ) : (
          <VButton
            className="!w-48"
            name="publish-button"
            onClick={() => handlePublish()}
            disabled={!isPublic}
            isLoading={isPublishing}
          >
            Publish Question
          </VButton>
        ),
      position: '18 5 3',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any, source: string) => {
    console.log('Form Data : ', formData);
    console.log('Source : ', source);

    const selectedSubject = subjects.find((subject) => subject.id === formData.subjectId);
    const problemConfig = formData.problemConfiguration;

    // Base request data with detailed configuration
    const baseRequestData: QuestionRequestDTO = {
      ...formData,
      questionText: formData.type === 'Coding' ? formData.problemMarkdown : formData.questionText,
      answerOptions: formData.answerOptions.join(','),
      correctAnswer: formData.correctAnswer.join(','),
      tags: formData.tags.join(','),
      isPublic: formData.isPublic ?? false,
      subjectId: formData.subjectId,
      categoryId: 'fc9d453c-f91b-46cd-8d26-56bcccfd1d1e', // temporary
      subject: selectedSubject?.name,
      codingQuestion: {
        questionId: formData?.id,
        problemMarkdown: formData?.problemMarkdown ?? 'Test',
        primaryLanguage: problemConfig?.primaryLanguage ?? ProgrammingLanguage.Typescript,
        allowedLanguages: problemConfig?.allowedLanguages ?? [],
        gradingStrategy: problemConfig?.gradingStrategy ?? CodingQuestionGradingStrategy.TestCases,
        inputFormat: { description: problemConfig?.inputFormat?.description || '' },
        outputFormat: { description: problemConfig?.outputFormat?.description || '' },
        timeLimitMs: Number(problemConfig?.timeLimitMs) || 0,
        memoryLimitKb: Number(problemConfig?.memoryLimitKb) || 0,
        maxSubmissionCount: Number(problemConfig?.maxSubmissionCount) || 0,
        testCases: formData.testCases ?? [],
        starterCode: formData.starterCode ?? [],
      },
    };

    // Update status based on source
    const requestData: QuestionRequestDTO = {
      ...baseRequestData,
      status: source === 'save' ? QuestionStatus.Draft : QuestionStatus.InReview,
    };

    try {
      if (renderMode === 'edit') {
        await updateQuestion({ id: initialValue?.id ?? '0', data: requestData }).unwrap();
      } else {
        // Create is only applicable for "save"
        if (source === 'save') {
          const response = await createQuestion(requestData).unwrap();
          setIsSavedOrSubmitted(true);
          console.log('Response', response);
        } else {
          toast.error("You can't mark a new question as InReview before saving it.");
          return;
        }
      }
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Failed to process question: ', error);
      toast.error((error as Error).message);
    }
  };

  const handlePublish = async () => {
    try {
      await publishQuestion(initialValue?.id).unwrap();
      // maybe navigate or show toast
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!isPreview ? (
        <VDynamicForm
          config={quesformConfig}
          renderMode={renderMode}
          mode={mode}
          initialValues={mapToFormFieldData({
            ...initialValue,
            answerOptions: initialValue?.answerOptions?.split(',') ?? [],
            correctAnswer: initialValue?.correctAnswer?.split(',') ?? [],
            tags: initialValue?.tags?.split(',') ?? [],
            problemMarkdown: initialValue?.codingQuestion?.problemMarkdown,
            problemConfiguration: {
              questionId: initialValue?.id,
              primaryLanguage: initialValue?.codingQuestion?.primaryLanguage,
              allowedLanguages: initialValue?.codingQuestion?.allowedLanguages,
              gradingStrategy: initialValue?.codingQuestion?.gradingStrategy,
              timeLimitMs: initialValue?.codingQuestion?.timeLimitMs,
              memoryLimitKb: initialValue?.codingQuestion?.memoryLimitKb,
              maxSubmissionCount: initialValue?.codingQuestion?.maxSubmissionCount,
              inputFormat: { description: initialValue?.codingQuestion?.inputFormat?.description },
              outputFormat: { description: initialValue?.codingQuestion?.outputFormat?.description },
            },
            testCases: initialValue?.codingQuestion?.testCases?.map((tc) => ({
              ...tc,
              weight: typeof tc.weight === 'string' ? parseFloat(tc.weight) : tc.weight,
            })),
            starterCode: initialValue?.codingQuestion?.starterCodes,
          })}
          isFormSubmitting={isCreatingQuestion || isUpdatingQuestion}
          onSubmit={handleSubmit}
        />
      ) : (
        <ManageQuestionPreviewpage type={initialValue?.type as string} formData={initialValue} mode="preview" />
      )}
    </>
  );
}

export default QuestionForm;
