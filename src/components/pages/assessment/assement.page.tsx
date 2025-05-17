import { VButton, VImage } from '@components/atoms';
import { VIConInput } from '@components/molecules/icon-input/v-icon-input.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useRef, useState, useCallback, useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';
import { VRadioButtonGroup } from '../../molecules';
import VFilterToggle from '@components/organisms/filter/v-filter-toggle.organism';
import { TestResponseDTO } from '@dto/response';
import { clearSelectedTest, useFetchTestsQuery, useSearchTestsMutation } from 'store/slices/test-assessment.slice';
import { MatchOn, Operator } from '@utils/enums';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import { SearchCriteria, SearchRequestDTO, TestRequestDTO } from '@dto/request';
import { useNavigate } from 'react-router-dom';
import AssessmentOverview from '@components/organisms/assessment/overview/overview.organism';
import { useAppDispatch } from 'store/store';
import { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import { FormFieldData } from '@types';
import { TestFilter } from '@components/organisms/assessment/filter/test-filter.organism';
import { VPaginatedList } from '@components/organisms/pagination';
import { AxiosBaseQueryError } from 'api/base.query';

// Constants
const SERVER_PAGE_SIZE = 10; // Matches API default
const CLIENT_PAGE_SIZE = 6;

type Scope = 'all' | 'public' | 'personal';

function AssessmentPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentServerPage, setCurrentServerPage] = useState(1);
  const [scope, setScope] = useState<Scope>('public');
  const [isSearchActive, setIsSearchActive] = useState(false);
  // Track all loaded items
  const [allLoadedTests, setAllLoadedTests] = useState<TestResponseDTO[]>([]);
  const [filteredData, setFilteredData] = useState<TestResponseDTO[]>([]);

  const { data: experienceLevel } = useFetchExperienceLevelQuery();
  const {
    data: fetchedTests,
    refetch,
    isLoading,
    isFetching,
  } = useFetchTestsQuery({
    scope,
    page: currentServerPage,
    limit: SERVER_PAGE_SIZE,
  });

  const [searchTests, { data: searchedTests, error, reset: resetSearch, isLoading: isSearchLoading }] =
    useSearchTestsMutation();

  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  // Determine which data to use (search results or regular fetch)
  const currentData = isSearchActive ? searchedTests : fetchedTests;
  const currentLoading = isLoading || isFetching || isSearchLoading;

  // Accumulate data from all fetches
  useEffect(() => {
    if (currentData?.data) {
      if (currentData.currentPage === 1) {
        // Reset on first page or new search
        setAllLoadedTests(currentData.data ?? []);
      } else {
        // Merge new data with existing
        setAllLoadedTests((prev) => [
          ...prev,
          ...currentData.data.filter((newItem) => !prev.some((item) => item.id === newItem.id)),
        ]);
      }
    }
  }, [currentData, currentServerPage]);

  //filter data based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(allLoadedTests);
    } else {
      const results = allLoadedTests.filter((test) => test.title.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredData(results);
    }
  }, [searchQuery, allLoadedTests]);

  //clear tests when no data found
  useEffect(() => {
    if ((error as AxiosBaseQueryError)?.status === 404) {
      setAllLoadedTests([]);
    }
  }, [error]);

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

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateAssessment = () => {
    dispatch(clearSelectedTest());
    navigate('/assessments/0');
  };

  const handleApplyFilter = useCallback(
    (formData: FormFieldData) => {
      const searchCriteria: SearchCriteria<TestRequestDTO>[] = [];

      Object.entries(formData).forEach(([key, value]) => {
        if (!value || value === '') return;

        const trimmedKey = key.trim();

        if (trimmedKey === 'durationMin') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'durationInMinutes',
            matchOn: MatchOn.GREATER_THAN,
            value: Number(value),
          });
        } else if (trimmedKey === 'durationMax') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'durationInMinutes',
            matchOn: MatchOn.LESS_THAN,
            value: Number(value),
          });
        } else if (trimmedKey === 'maxScoreMin') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'maxScore',
            matchOn: MatchOn.GREATER_THAN,
            value: Number(value),
          });
        } else if (trimmedKey === 'maxScoreMax') {
          searchCriteria.push({
            operator: Operator.AND,
            field: 'maxScore',
            matchOn: MatchOn.LESS_THAN,
            value: Number(value),
          });
        } else if (!['durationRange', 'maxScoreRange'].includes(trimmedKey)) {
          searchCriteria.push({
            operator: Operator.AND,
            field: trimmedKey as keyof TestRequestDTO,
            value: value as string,
            matchOn: MatchOn.EQUAL,
          });
        }
      });

      searchCriteria.push({
        operator: Operator.AND,
        field: 'isPublic',
        matchOn: MatchOn.EQUAL,
        value: scope === 'public',
      });

      searchTests(SearchRequestDTO.default(searchCriteria));
      setIsSearchActive(true);
      setCurrentServerPage(1);
    },
    [scope, searchTests]
  );

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center gap-4 min-h-72">
      <VImage src="src\assets\svgs\no-data.svg" />
      <div className="flex flex-col gap-1">
        <VTypography as="h5" className="!text-theme-secondary">
          No assessments found
        </VTypography>
        <VTypography as="p" className="!text-theme-secondary">
          Try changing search criteria
        </VTypography>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <VTypography as="h4" className="font-semibold">
        Test Assessment
      </VTypography>

      <div className="flex justify-between items-center mt-5">
        <div className="flex justify-center items-center gap-5">
          <VRadioButtonGroup
            name="scope"
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
        <div>
          <VButton onClick={handleCreateAssessment}>Create Assessment</VButton>
        </div>
      </div>

      <TestFilter
        experienceLevel={experienceLevel || []}
        scope={scope}
        onApplyFilter={handleApplyFilter}
        onReset={() => {
          resetSearch();
          setIsSearchActive(false);
        }}
        filterRef={filterRef}
        filterButtonRef={filterButtonRef}
      />

      <div className="mt-6 mb-6 border-b theme-border-default"></div>

      <div className="flex items-center gap-5">
        <VTypography as="h5" className="font-semibold">
          Assessments
        </VTypography>
        <div className="min-w-80">
          <VIConInput
            type="text"
            name="query"
            placeholder="Search Assessment"
            value={searchQuery}
            onChange={handleSearchChange}
            iconProps={{ icon: IoSearch, size: 20, className: 'text-theme-primary' }}
            iconPosition="left"
          />
        </div>
      </div>

      <VPaginatedList
        serverSideData={filteredData}
        loading={currentLoading}
        renderItem={(test: TestResponseDTO) => (
          <AssessmentOverview
            key={test.id}
            test={test}
            onDeleteSuccess={() => {
              refetch();
              resetSearch();
              setCurrentServerPage(1);
            }}
          />
        )}
        emptyState={renderEmptyState()}
        serverPageSize={SERVER_PAGE_SIZE}
        clientPageSize={CLIENT_PAGE_SIZE}
        totalItems={filteredData.length}
        fetchMore={handleFetchMore}
        gridClasses="grid grid-cols-3 gap-5 mt-5"
      />
    </div>
  );
}

export default AssessmentPage;
