import { VButton } from '@components/atoms';
import Preview from '../preview/preview.organism';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VTableColumn } from '../table/v-table.organism';
import { VDropdown } from '@components/molecules/index';
import { useFetchIndustriesQuery } from 'store/slices/industry.slice';
import { useFetchDomainsQuery } from 'store/slices/domain.slice';
import { useFetchIndustryRolesQuery } from 'store/slices/industry-role.slice';
import { QuestionRequestDTO } from '@dto/request';
import { DifficultyLevel, QuestionType } from '@utils/enums';
import { useUploadBulkQuestionsMutation } from 'store/slices/questions.slice';
import toast from 'react-hot-toast';

export interface Question {
  id: string;
  'Question Text': string;
  Subject: string;
  'Subject ID'?: string;
  Topic: string;
  'Difficulty Level': string;
  'Question Type': string;
  'Time Limit': number;
  'Experience Level': string;
  'Experience Level ID'?: string;
  Industry: string;
  'Industry ID'?: string;
  Domain: string;
  'Domain ID'?: string;
  IndustryRole: string;
  'IndustryRole ID'?: string;
  Marks: number;
  'Answer Options': string[];
  'Correct Answer': string[];
  'Question Explanation': string;
  'Answer Explanation': string;
  Tags: string[];
  'Is Public': boolean;
}

function PreviewAndSelectQuestions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [questionsFromFile, setQuestionsFromFile] = useState<Question[]>([]);
  const { data: industries = [] } = useFetchIndustriesQuery();
  const { data: domains = [] } = useFetchDomainsQuery();
  const { data: industryRoles = [] } = useFetchIndustryRolesQuery();
  const [, setSelectedQuestionIds] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionRequestDTO[]>([]);
  const [questionErrors, setQuestionErrors] = useState<Record<string, Record<string, string>>>({});
  const [, setValidQuestions] = useState<QuestionRequestDTO[]>([]);
  const [uploadBulkQuestions, { isLoading: isUploading }] = useUploadBulkQuestionsMutation();

  // Populate questions after location.state is available
  useEffect(() => {
    const rawData = location.state?.questionsFromFile ?? [];

    if (Array.isArray(rawData)) {
      const filtered = rawData.filter((q) => !!q['Question Text']?.toString().trim());
      setQuestionsFromFile(filtered);
      console.log('Filtered questionsFromFile:', filtered);
    }
  }, [location.state]);

  const columns: VTableColumn<Question>[] = [
    {
      key: 'Question Text',
      label: 'Question Text',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Question Text'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Question Text'];
      },
    },
    {
      key: 'Industry',
      label: 'Industry',
      sortable: false,
      searchable: false,
      className: '!overflow-visible my-4 !min-w-[300px]',
      customRender: (row: Question) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Industry'];
        return (
          <div className="flex flex-col gap-1">
            <VDropdown
              options={industries.map((industry) => ({
                value: industry.id,
                label: industry.name,
              }))}
              name="Industry"
              placeholder="Select Industry"
              value={row['Industry ID'] || ''}
              onChange={(selectedValue: string | string[]) => {
                const industryId = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
                const selectedIndustry = industries.find((ind) => ind.id === industryId);

                setQuestionsFromFile((prev) =>
                  prev.map((q) =>
                    q.id === row.id
                      ? {
                          ...q,
                          Industry: selectedIndustry?.name ?? '',
                          'Industry ID': industryId,
                          Domain: '',
                          'Domain ID': '',
                          IndustryRole: '',
                          'IndustryRole ID': '',
                        }
                      : q
                  )
                );
              }}
            />
            {errorMessage && <div className="text-theme-negative text-sm">{errorMessage}</div>}
          </div>
        );
      },
    },
    {
      key: 'Domain',
      label: 'Domain',
      sortable: false,
      searchable: false,
      className: '!overflow-visible my-4 !min-w-[300px]',
      customRender: (row: Question) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Domain'];
        const filteredDomains = domains.filter((domain) => domain.industryId === row['Industry ID']);

        return (
          <div className="flex flex-col gap-1">
            <VDropdown
              options={filteredDomains.map((domain) => ({
                value: domain.id,
                label: domain.name,
              }))}
              name="Domain"
              placeholder="Select Domain"
              value={row['Domain ID'] || ''}
              onChange={(selectedValue: string | string[]) => {
                const domainId = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
                const selectedDomain = domains.find((dom) => dom.id === domainId);

                setQuestionsFromFile((prev) =>
                  prev.map((q) =>
                    q.id === row.id
                      ? {
                          ...q,
                          Domain: selectedDomain?.name ?? '',
                          'Domain ID': domainId,
                          IndustryRole: '',
                          'IndustryRole ID': '',
                        }
                      : q
                  )
                );
              }}
            />
            {errorMessage && <div className="text-theme-negative text-sm">{errorMessage}</div>}
          </div>
        );
      },
    },
    {
      key: 'IndustryRole',
      label: 'Domain Role',
      sortable: false,
      searchable: false,
      className: '!overflow-visible my-4 !min-w-[300px]',
      customRender: (row: Question) => {
        const errorMessage = questionErrors[row['Question Text']]?.['IndustryRole'];
        const filteredRoles = industryRoles.filter((role) => role.domainId === row['Domain ID']);

        return (
          <div className="flex flex-col gap-1">
            <VDropdown
              options={filteredRoles.map((role) => ({
                value: role.id,
                label: role.name,
              }))}
              name="IndustryRoles"
              placeholder="Select Industry Role"
              value={row['IndustryRole ID'] || ''}
              onChange={(selectedValue: string | string[]) => {
                const roleId = Array.isArray(selectedValue) ? selectedValue[0] : selectedValue;
                const selectedRole = industryRoles.find((role) => role.id === roleId);

                setQuestionsFromFile((prev) =>
                  prev.map((q) =>
                    q.id === row.id
                      ? {
                          ...q,
                          IndustryRole: selectedRole?.name ?? '',
                          'IndustryRole ID': roleId,
                        }
                      : q
                  )
                );
              }}
            />
            {errorMessage && <div className="text-theme-negative text-sm">{errorMessage}</div>}
          </div>
        );
      },
    },
    {
      key: 'Subject',
      label: 'Subject',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Subject'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row.Subject;
      },
    },
    {
      key: 'Topic',
      label: 'Topic',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Topic'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row.Topic;
      },
    },
    {
      key: 'Difficulty Level',
      label: 'Difficulty Level',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Difficulty Level'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Difficulty Level'];
      },
    },
    {
      key: 'Question Type',
      label: 'Question Type',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Question Type'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Question Type'];
      },
    },
    {
      key: 'Time Limit',
      label: 'Time Limit',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Time Limit'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Time Limit'];
      },
    },
    {
      key: 'Experience Level',
      label: 'Experience Level',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Experience Level'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Experience Level'];
      },
    },
    {
      key: 'Marks',
      label: 'Marks',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Marks'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row.Marks;
      },
    },
    {
      key: 'Answer Options',
      label: 'Answer Options',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Answer Options'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }

        const options = row['Answer Options'];
        if (Array.isArray(options)) {
          return options.join(', ');
        }
        return String(options ?? ''); // Fallback if not array
      },
    },
    {
      key: 'Correct Answer',
      label: 'Correct Answer',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Correct Answer'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }

        const correct = row['Correct Answer'];
        if (Array.isArray(correct)) {
          return correct.join(', ');
        }
        return String(correct ?? '');
      },
    },
    {
      key: 'Question Explanation',
      label: 'Question Explanation',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Question Explanation'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Question Explanation'];
      },
    },
    {
      key: 'Answer Explanation',
      label: 'Answer Explanation',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Answer Explanation'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Answer Explanation'];
      },
    },
    {
      key: 'Tags',
      label: 'Tags',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Tags'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }

        const tags = row.Tags;
        if (Array.isArray(tags)) {
          return tags.join(', ');
        }
        return String(tags ?? '');
      },
    },
    {
      key: 'Is Public',
      label: 'Is Public',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = questionErrors[row['Question Text']]?.['Is Public'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Is Public'] ? 'true' : 'false';
      },
    },
    {
      key: 'Subject ID',
      label: 'Subject ID',
      sortable: false,
      searchable: false,
      hidden: true,
    },
    {
      key: 'Experience Level ID',
      label: 'Experience Level ID',
      sortable: false,
      searchable: false,
      hidden: true,
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requiredFields: (keyof Question)[] = [
    'Question Text',
    'Subject',
    'Topic',
    'Difficulty Level',
    'Question Type',
    'Time Limit',
    'Experience Level',
    'Industry',
    'Domain',
    'IndustryRole',
    'Marks',
    'Answer Options',
    'Correct Answer',
  ];

  // Modify the data passed to the table to mark rows with errors
  const dataWithErrors = questionsFromFile.map((question) => {
    const errorMessage = questionErrors[question['Question Text']];
    if (errorMessage) {
      return {
        ...question,
        isErrorRow: true,
        errorMessage,
      };
    }
    return question;
  });

  const visibleColumns = columns.filter((col) => !col.hidden);

  const expectedHeaders = visibleColumns.map((col) => ({
    key: col.key,
    label: col.label,
  }));

  useEffect(() => {
    const errorsPerQuestion: Record<string, Record<string, string>> = {};
    const validQs: QuestionRequestDTO[] = [];

    questionsFromFile.forEach((question, index) => {
      const fieldErrors: Record<string, string> = {};

      requiredFields.forEach((key) => {
        const label = expectedHeaders.find((h) => h.key === key)?.label || key;
        const value = question[key];
        const isEmpty = value === undefined || value === null || String(value).trim() === '';
        if (isEmpty) {
          fieldErrors[key] = `${label} is required`;
        }
      });

      if (Object.keys(fieldErrors).length > 0) {
        errorsPerQuestion[question['Question Text']] = fieldErrors;
      } else {
        validQs.push({
          id: `tmp-${index}`,
          questionText: question['Question Text'],
          subjectId: question['Subject ID'] ?? '',
          experienceLevelId: question['Experience Level ID'] ?? '',
          domainId: question['Domain ID'] ?? '',
          industryId: question['Industry ID'] ?? '',
          industryRoleId: question['IndustryRole ID'] ?? '',
          subject: question.Subject,
          topic: question.Topic,
          difficulty: question['Difficulty Level'] as DifficultyLevel,
          type: question['Question Type'] as QuestionType,
          timeLimit: question['Time Limit'],
          marks: question.Marks,
          answerOptions: question['Answer Options'],
          correctAnswer: question['Correct Answer'],
          questionExplanation: question['Question Explanation'],
          answerExplanation: question['Answer Explanation'],
          tags: question.Tags,
          isPublic: question['Is Public'],
        });
      }
    });

    setQuestionErrors(errorsPerQuestion);
    setValidQuestions(validQs);
  }, [expectedHeaders, questionsFromFile, requiredFields]);

  const handleUpload = async () => {
    try {
      if (selectedQuestions.length === 0) return;
      await uploadBulkQuestions(selectedQuestions).unwrap();
      navigate('/questions');
    } catch (error) {
      toast.error((error as Error).message);
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      {questionsFromFile.length > 0 ? (
        <>
          <Preview<Question>
            title="Questions Preview"
            data={dataWithErrors}
            columns={visibleColumns}
            getId={(q) => String(q['Question Text'])}
            cellErrors={questionErrors}
            isRowInvalid={(question) => {
              const key = question['Question Text']; // Or your row identifier
              return !!questionErrors[key]; // disable if error exists
            }}
            onSelect={(selectedIds) => {
              setSelectedQuestionIds(selectedIds);
              const selected = dataWithErrors.filter((q) => selectedIds.includes(String(q['Question Text'])));

              const mapped: QuestionRequestDTO[] = selected.map((q, index) => ({
                id: `tmp-${index}`,
                questionText: q['Question Text'],
                subjectId: q['Subject ID'] ?? '',
                experienceLevelId: q['Experience Level ID'] ?? '',
                domainId: q['Domain ID'] ?? '',
                industryId: q['Industry ID'] ?? '',
                industryRoleId: q['IndustryRole ID'] ?? '',
                subject: q.Subject,
                topic: q.Topic,
                difficulty: q['Difficulty Level'] as DifficultyLevel,
                type: q['Question Type'] as QuestionType,
                timeLimit: q['Time Limit'],
                marks: q.Marks,
                answerOptions: q['Answer Options'],
                correctAnswer: q['Correct Answer'],
                questionExplanation: q['Question Explanation'],
                answerExplanation: q['Answer Explanation'],
                tags: q.Tags,
                isPublic: q['Is Public'],
              }));

              setSelectedQuestions(mapped);
            }}
          />
          <div className="w-3/12 flex flex-row gap-5">
            <VButton variant="secondary" className="!w-2/6" onClick={() => navigate('/questions')}>
              Cancel
            </VButton>

            <VButton variant="primary" size="md" onClick={handleUpload} disabled={isUploading} isLoading={isUploading}>
              Import Questions
            </VButton>
          </div>
        </>
      ) : (
        <div>No Data Found.</div>
      )}
    </div>
  );
}

export default PreviewAndSelectQuestions;
