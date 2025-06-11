import { VRadioButtonGroup } from '@components/molecules/radio-button-group/v-radio-group.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useCallback, useEffect, useRef, useState } from 'react';
import { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import VFilterToggle from '@components/organisms/filter/v-filter-toggle.organism';
import { useFetchQuestionsQuery, useSearchQuestionMutation } from 'store/slices/questions.slice';
import { QuestionRequestDTO, SearchRequestDTO } from '@dto/request';
import QuestionList from '@components/organisms/questions/question-list.organism';
import { useLocation } from 'react-router-dom';
import PreviewAndSelectQuestions from '@components/organisms/import-questions/preview-and-select-questions.organisms';
import ImportQuestions from '@components/organisms/import-questions/import-questions.organisms';
import { AdvancedQuestionFilter } from '@components/organisms/assessment/section/advanced-question-filter.organism';

// Constants
const SERVER_page_SIZE = 10; // Matches API default

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

function Questionspage() {
  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [scope, setScope] = useState<Scope>('public');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [currentServerpage, setCurrentServerpage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const [showImportQuestions, setShowImportQuestions] = useState(false);

  const handleImportClick = () => {
    setShowImportQuestions(true);
  };

  const {
    data: initialQuestions,
    isFetching: isFetchingQuestions,
    refetch,
  } = useFetchQuestionsQuery(
    { scope: scope, page: currentServerpage, limit: SERVER_page_SIZE },
    { skip: !hasSearched || isSearchActive } // Skip unless explicitly fetching
  );

  const [searchQuestion, { data: searchedQuestions, isLoading: isSearching, reset: resetSearch }] =
    useSearchQuestionMutation();

  console.log(searchedQuestions);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = (hasSearched && isSearchActive ? searchedQuestions?.data : initialQuestions?.data) ?? [];
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
    setCurrentServerpage(page);
  }, []);

  const handleScopeChange = (value: string) => {
    const newScope = value as Scope;
    setScope(newScope);
    setCurrentServerpage(1);
    resetSearch();
    window.history.replaceState(null, '', `?scope=${newScope}`);
  };

  const handleFilterApply = (searchRequest: SearchRequestDTO<QuestionRequestDTO>) => {
    setHasSearched(true);
    setIsSearchActive(true);
    searchQuestion(searchRequest);
  };

  const handleFilterReset = () => {
    setHasSearched(false);
    setIsSearchActive(false);
    searchQuestion(SearchRequestDTO.default([]));
  };

  return (
    <div>
      <div>
        <VTypography as="h3">Questions</VTypography>
        <div className="w-full flex flex-col justify-between my-2">
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

          <AdvancedQuestionFilter
            onFilterApply={handleFilterApply}
            scope={scope}
            onReset={handleFilterReset}
            selectedTestFormat={null}
            filterRef={filterRef}
            filterButtonRef={filterButtonRef}
          />
        </div>
      </div>

      {questionsFromFile.length > 0 ? (
        <PreviewAndSelectQuestions />
      ) : (
        <QuestionList
          data={hasSearched ? questions : []}
          loading={isLoading}
          onImportClick={handleImportClick}
          noDataMessage={
            hasSearched ? 'No data available for the selected filters.' : 'Apply a filter to see questions.'
          }
          onDeleteSuccess={() => {
            refetch();
            resetSearch();
            setCurrentServerpage(1);
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

export default Questionspage;
