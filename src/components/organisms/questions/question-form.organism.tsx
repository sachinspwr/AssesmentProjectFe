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
import { useCreateQuestionMutation, useUpdateQuestionMutation } from 'store/slices/questions.slice';
import { mapToFormFieldData, VFormFields } from '@types';
import TagSelector from '@components/organisms/tag-selector/tag-selector.organism';
import { QuestionResponseDTO } from '@dto/response';
import { extractPlaceholders } from '@utils/functions';
import { DomainResponseDTO } from '@dto/response/domain-response.dto';
import { IndustryRoleResponseDTO } from '@dto/response/industry-role-response.dto';
import ManageQuestionPreviewPage from '@components/pages/question/manage-question-preview.page';

type QuestionFormProps = {
  initialValue?: QuestionResponseDTO;
  renderMode?: ActionMode;
  isPreview: boolean;
  setIsPreview: (isPreview: boolean) => void;
  onSuccess?: () => void;
};

function QuestionForm({ initialValue, renderMode = 'create', isPreview, setIsPreview, onSuccess }: QuestionFormProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [industryDomains, setIndustryDomains] = useState<DomainResponseDTO[]>([]);
  const [domainRoles, setDomainRoles] = useState<IndustryRoleResponseDTO[]>([]);

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

  //#endregion

  const quesformConfig: VFormFields[] = [
    {
      type: 'group',
      label: 'Question Text & Description',
      position: '1 1 10',
      fields: [
        {
          name: 'isPublic',
          label: 'Public',
          type: 'switch',
          classNames: 'w-full flex justify-end',
          position: '1 11 2', // Positioning the field in grid: row 1, column 11, spanning 2 columns
        },
        {
          name: 'questionText',
          label: 'Question Text',
          type: 'text-area',
          required: true,
          placeholder: 'Enter Question Text',
          position: '2 1 6', // Positioning the field in grid: row 2, column 1, spanning 6 columns
        },
        {
          name: 'questionExplanation',
          label: 'Question Description',
          type: 'text-area',
          placeholder: 'Enter Question Description',
          position: '2 7 6', // Positioning the field in grid: row 2, column 7, spanning 6 columns
        },
        {
          name: 'custom',
          type: 'custom',
          customContent: <div className="border-b-2 my-auto"></div>,
          position: '4 1 12',
        },
      ],
    },
    {
      type: 'group',
      position: '5 1 12',
      label: 'Basic Details',
      fields: [
        // First Group: Type, Subject, Topic & Difficulty
        {
          name: 'type',
          label: 'Question Type',
          type: 'select',
          required: true,
          options: Object.entries(QuestionType).map(([, value]) => ({ value: value, label: value })),
          placeholder: 'Select Question Type',
          position: '6 1 3',
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
          position: '6 4 3',
        },
        {
          name: 'topic',
          label: 'Topic',
          type: 'text',
          placeholder: 'Enter Topic',
          position: '6 7 3',
        },
        {
          name: 'difficulty',
          label: 'Difficulty Level',
          type: 'select',
          required: true,
          placeholder: 'Select Difficulty Level',
          options: Object.entries(DifficultyLevel).map(([key, value]) => ({ value: key, label: value })),
          position: '6 10 3',
        },

        // Second Group: Industry & Experience Details
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
          position: '7 1 3',
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
          position: '7 4 3',
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
          position: '7 7 3',
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
          position: '7 10 3',
        },

        // Third Group: Scoring & Additional Info
        {
          name: 'marks',
          label: 'Marks',
          type: 'number',
          placeholder: 'Enter Marks',
          required: true,
          position: '8 1 3',
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
          position: '8 4 3',
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
          renderItem: (value, onChange) => (
            <TagSelector value={value as string[]} onChange={onChange} placeholder={`Search tags...`} />
          ),
          required: true,
          placeholder: 'Enter Tags',
          position: '8 7 4',
        },
        // Divider
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
            const isCorrect = correctAnswer.includes(value as string);
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
          computeDependencies: ['type'],
          compute: ({ type, answerOptions }) => {
            switch (type) {
              case QuestionType.SingleChoice:
              case QuestionType.FillInTheBlanks:
              case QuestionType.MultipleChoice:
                return [];
              case QuestionType.TrueFalse:
                return ['True', 'False'];
              default:
                return answerOptions;
            }
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
    // {
    //   type: 'group',
    //   label: 'Code Snippet',
    //   position: '10 1 12',
    //   shouldRender: ({ type }) => {
    //     return (type as QuestionType) === QuestionType.Coding;
    //   },
    //   fields: [
    //     {
    //       name: 'description',
    //       label: 'Problem Description',
    //       type: 'text-area',
    //       required: true,
    //       position: '11 1 6',
    //     },
    //     {
    //       name: 'answer',
    //       label: 'Answer',
    //       type: 'renderItem',
    //       required: true,
    //       position: '12 1 12',
    //       renderItem: (value, onChange, formData, index) => {
    //         return (
    //          <CodingMetadata />
    //         );
    //       },
    //     },
    //     {
    //       name: 'answerOptions',
    //       label: 'Add answers options here, mark correct answer with toggle',
    //       type: 'list',
    //       placeholder: 'Enter item',
    //       required: ({ type }) => (type === QuestionType.ShortAnswer || type === QuestionType.Essay ? true : false),
    //       disabled: ({ type }) => (type === QuestionType.TrueFalse ? true : false),
    //       shouldRender: ({ type }) =>
    //         [
    //           QuestionType.SingleChoice,
    //           QuestionType.MultipleChoice,
    //           QuestionType.FillInTheBlanks,
    //           QuestionType.TrueFalse,
    //         ].includes(type as QuestionType),
    //       renderItem: (value, onChange, formData, index) => {
    //         const correctAnswer = (formData?.correctAnswer as string[]) ?? [];
    //         const isCorrect = correctAnswer.includes(value as string);
    //         const placeholderCount = extractPlaceholders(formData?.questionText as string)?.length || 0;

    //         return (
    //           <>
    //             <VLabel className="col-span-1">Option {String.fromCharCode(65 + index!)}</VLabel>
    //             <div className="col-span-3">
    //               <VInput
    //                 name={`customList[${index}]`}
    //                 value={value as string}
    //                 placeholder="Enter Details"
    //                 onChange={(newValue) => {
    //                   const updatedAnswers = correctAnswer.map((x) => (x === value ? newValue : x));
    //                   onChange(newValue, { correctAnswer: updatedAnswers });
    //                 }}
    //                 className="w-full h-full"
    //               />
    //             </div>
    //             <div className="col-span-1 mx-auto mt-1">
    //               <VSwitch
    //                 type="primary"
    //                 value={isCorrect ? 'true' : 'false'}
    //                 disabled={
    //                   !value ||
    //                   (isCorrect && correctAnswer.length === 1) ||
    //                   (placeholderCount === 0 && formData?.type === QuestionType.FillInTheBlanks)
    //                 }
    //                 onChange={(isToggled) => {
    //                   let updatedAnswers: string[] | null = null;

    //                   const isCorrect = isToggled === 'true';

    //                   if (isCorrect) {
    //                     switch (formData?.type) {
    //                       case QuestionType.SingleChoice:
    //                       case QuestionType.TrueFalse:
    //                         updatedAnswers = [value as string]; // Only one correct answer
    //                         break;

    //                       case QuestionType.FillInTheBlanks: {
    //                         const currentCorrectAnswers = Array.isArray(correctAnswer) ? correctAnswer : [];
    //                         // If there's only one placeholder, replace the answer
    //                         if (placeholderCount === 1) {
    //                           updatedAnswers = [value as string];
    //                         } else {
    //                           // If multiple placeholders, allow up to `placeholderCount` answers, removing the first if exceeding limit
    //                           if (currentCorrectAnswers.length < placeholderCount) {
    //                             updatedAnswers = [...currentCorrectAnswers, value as string];
    //                           } else {
    //                             updatedAnswers = [...currentCorrectAnswers.slice(1), value as string]; // Remove the first selection
    //                           }
    //                         }

    //                         break;
    //                       }

    //                       case QuestionType.MultipleChoice:
    //                         updatedAnswers = [...correctAnswer, value as string];
    //                         break;

    //                       default:
    //                         updatedAnswers = null; // For other question types, set correctAnswer to null
    //                         break;
    //                     }
    //                   } else {
    //                     updatedAnswers = correctAnswer.filter((x) => x !== value);
    //                   }

    //                   onChange(value, { correctAnswer: updatedAnswers });
    //                 }}
    //               />
    //             </div>
    //           </>
    //         );
    //       },
    //       computeDependencies: ['type'],
    //       compute: ({ type, answerOptions }) => {
    //         switch (type) {
    //           case QuestionType.SingleChoice:
    //           case QuestionType.FillInTheBlanks:
    //           case QuestionType.MultipleChoice:
    //             return [];
    //           case QuestionType.TrueFalse:
    //             return ['True', 'False'];
    //           default:
    //             return answerOptions;
    //         }
    //       },
    //       position: '11 1 12',
    //     },
    //     {
    //       name: 'custom',
    //       type: 'custom',
    //       customContent: <div className="border-b-2 my-auto"></div>,
    //       position: '12 1 12',
    //     },
    //   ],
    // },
    {
      type: 'group',
      label: 'Answer Explanation',
      position: '13 1 12',
      fields: [
        {
          name: 'answerExplanation',
          label: 'Answer Explanation',
          type: 'text-area',
          placeholder: 'Enter Explanation',
          position: '14 1 6', // Positioning the field in grid: row 2, column 1, spanning 6 columns
        },
      ],
    },
    {
      name: 'custom',
      type: 'custom',
      customContent: (
        <VButton variant="secondary" onClick={() => setIsPreview(true)}>
          Preview Question
        </VButton>
      ),
      position: '15 1 2',
    },
    {
      name: 'save',
      label: 'Save Question',
      type: 'submit',
      position: '15 3 2',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (formData: any) => {
    // Prepare the data to match the QuestionRequestDTO structure

    const selectedSubject = subjects.find((subject) => subject.id === formData.subjectId);
    console.log(selectedSubject);

    const requestData: QuestionRequestDTO = {
      ...formData,
      answerOptions: formData.answerOptions.join(','),
      correctAnswer: formData.correctAnswer.join(','),
      tags: formData.tags.join(','),
      isPublic: formData.isPublic ?? false,
      subjectId: formData.subjectId,
      categoryId: 'fc9d453c-f91b-46cd-8d26-56bcccfd1d1e', //todo: remove when sachin remove this field
      subject: selectedSubject?.name,
    };

    try {
      if (renderMode === 'edit') {
        await updateQuestion({ id: initialValue?.id ?? '0', data: requestData }).unwrap(); // Calling the mutation
      } else {
        await createQuestion(requestData).unwrap(); // Calling the mutation
      }
      onSuccess && onSuccess();
    } catch (error) {
      console.error('Failed to create question: ', error);
    }
  };

  return (
    <>
      {!isPreview ? (
        <VDynamicForm
          config={quesformConfig}
          renderMode={renderMode}
          initialValues={mapToFormFieldData({
            ...initialValue,
            answerOptions: initialValue?.answerOptions?.split(',') ?? [],
            correctAnswer: initialValue?.correctAnswer?.split(',') ?? [],
            tags: initialValue?.tags?.split(',') ?? [],
          })}
          isFormSubmitting={isCreatingQuestion || isUpdatingQuestion}
          onSubmit={handleSubmit}
        />
      ) : (
        <ManageQuestionPreviewPage type={initialValue?.type as string} formData={initialValue} />
      )}
    </>
  );
}

export default QuestionForm;
