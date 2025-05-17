import { VRadioButtonGroup } from '@components/molecules/radio-button-group/v-radio-group.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import VFilterToggle from '@components/organisms/filter/v-filter-toggle.organism';
import { FormFieldData } from '@types';
import { MatchOn, Operator } from '@utils/enums';
import { useFetchSubjectsQuery } from 'store/slices/subject.slice';
import { useFetchQuestionsQuery, useSearchQuestionMutation } from 'store/slices/questions.slice';
import { QuestionRequestDTO, SearchCriteria, SearchRequestDTO } from '@dto/request';
import QuestionList from '@components/organisms/questions/question-list.organism';
import { useLocation } from 'react-router-dom';
import PreviewAndSelectQuestions from '@components/organisms/import-questions/preview-and-select-questions.organisms';
import ImportQuestions from '@components/organisms/import-questions/import-questions.organisms';
import { QuestionFilter } from '@components/organisms/questions/filter/question-filter.organisms';

// Constants
const SERVER_PAGE_SIZE = 10; // Matches API default

type Scope = 'all' | 'public' | 'personal';

interface Question {
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

function QuestionsPage() {
  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [scope, setScope] = useState<Scope>('public');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentServerPage, setCurrentServerPage] = useState(1);

  const [showImportQuestions, setShowImportQuestions] = useState(false);

  const handleImportClick = () => {
    setShowImportQuestions(true);
  };

  const { data: subjects = [] } = useFetchSubjectsQuery();
  const {
    data: initialQuestions,
    isFetching: isFetchingQuestions,
    refetch,
  } = useFetchQuestionsQuery({ scope, page: currentServerPage, limit: SERVER_PAGE_SIZE });

  const [searchQuestion, { data: searchedQuestions, isLoading: isSearching, reset: resetSearch }] =
    useSearchQuestionMutation();

  console.log(searchedQuestions);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = (isSearchActive ? searchedQuestions?.data : initialQuestions?.data) ?? [];
  const isLoading = isSearching || isFetchingQuestions;

  const location = useLocation();
  const [questionsFromFile, setQuestionsFromFile] = useState<Question[]>([]);
  // Populate questions after location.state is available
  useEffect(() => {
    const rawData = location.state?.questionsFromFile ?? [];

    if (Array.isArray(rawData)) {
      const filtered = rawData.filter((q) => !!q['Question Text']?.toString().trim());
      setQuestionsFromFile(filtered);
      // console.log('Filtered questionsFromFile:', filtered);
    }
  }, [location.state]);

  //handler functions
  const handleFetchMore = useCallback((page: number) => {
    setCurrentServerPage(page);
  }, []);

  const handleScopeChange = (value: string) => {
    const newScope = value as Scope;
    setScope(newScope);
    setCurrentServerPage(1);
    resetSearch();
    window.history.replaceState(null, '', `?scope=${newScope}`);
  };

  const handleApplyFilter = useCallback(
    (formData: FormFieldData) => {
      const searchCriteria: SearchCriteria<QuestionRequestDTO>[] = [];

      Object.entries(formData).forEach(([key, value]) => {
        if (!value || value === '') return;

        const trimmedKey = key.trim();

        if (trimmedKey === 'durationMin') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'timeLimit',
            matchOn: MatchOn.GREATER_THAN,
            value: Number(value),
          });
        } else if (trimmedKey === 'durationMax') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'timeLimit',
            matchOn: MatchOn.LESS_THAN,
            value: Number(value),
          });
        } else if (trimmedKey === 'maxScoreMin') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'marks',
            matchOn: MatchOn.GREATER_THAN,
            value: Number(value),
          });
        } else if (trimmedKey === 'maxScoreMax') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'marks',
            matchOn: MatchOn.LESS_THAN,
            value: Number(value),
          });
        } else if (!['durationRange', 'maxScoreRange'].includes(trimmedKey)) {
          searchCriteria.push({
            operator: Operator.AND,
            field: trimmedKey as keyof QuestionRequestDTO,
            value: value as string,
            matchOn: MatchOn.EQUAL,
          });
        }
      });

      // Add scope-specific filter
      searchCriteria.push({
        operator: Operator.AND,
        field: 'isPublic',
        matchOn: MatchOn.EQUAL,
        value: scope === 'public',
      });

      const payload = SearchRequestDTO.default(searchCriteria);
      console.log('Search payload:', payload); //  Now has all filters
      searchQuestion(payload); //  Correctly built
      setIsSearchActive(true);
      setCurrentServerPage(1);
    },
    [scope, searchQuestion]
  );

  return (
    <div>
      <div>
        <VTypography as="h3">Questions</VTypography>
        <div className="w-full flex flex-col justify-between my-2 mb-[40px]">
          <div className="flex gap-6 items-center">
            <VRadioButtonGroup
              name="group"
              options={[
                { label: 'All', value: 'all' },
                { label: 'Test Engine Library', value: 'public' },
                { label: 'My Own Questions', value: 'personal' },
              ]}
              defaultValue="public"
              direction="horizontal"
              onChange={handleScopeChange}
              wrapperClasses={'!w-fit'}
            />
            <div className="text-nowrap">
              <VFilterToggle ref={filterButtonRef} filterRef={filterRef} />
            </div>
          </div>

          <QuestionFilter
            subjects={subjects || []}
            scope={scope}
            onApplyFilter={handleApplyFilter}
            onReset={() => {
              resetSearch();
              setIsSearchActive(false);
            }}
            filterRef={filterRef}
            filterButtonRef={filterButtonRef}
          />
        </div>
      </div>

      <div className="w-5xl mt-3xl mb-5 border-b theme-border-default"></div>

      {questionsFromFile.length > 0 ? (
        <>
          <PreviewAndSelectQuestions />
        </>
      ) : (
        <QuestionList
          data={questions}
          loading={isLoading}
          onImportClick={handleImportClick}
          onDeleteSuccess={() => {
            refetch();
            resetSearch();
            setCurrentServerPage(1);
          }}
          fetchMore={handleFetchMore}
        />
      )}
      {showImportQuestions && (
        <ImportQuestions
          isOpen={showImportQuestions}
          onClose={() => setShowImportQuestions(false)}
          onFileChange={() => {
            setShowImportQuestions(true);
          }}
        />
      )}
    </div>
  );
}

export default QuestionsPage;
