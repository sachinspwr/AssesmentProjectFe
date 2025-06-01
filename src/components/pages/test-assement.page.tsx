import { VButton } from '@components/atoms';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { useEffect, useRef, useState } from 'react';
import { VDatePicker, VRadioButtonGroup } from '../molecules';
import VFilter, { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import VFilterToggle from '@components/organisms/filter/v-filter-toggle.organism';
import { VFormFields } from '@types';
import { MatchOn, Operator, QuestionType, TestStatus } from '@utils/enums';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import { SearchCriteria, SearchRequestDTO, TestRequestDTO } from '@dto/request';
import { TestResponseDTO } from '@dto/response';
import { useFetchTestsQuery, useSearchTestsMutation } from 'store/slices/test-assessment.slice';

type Scope ='public' | 'personal';

function TestAssessmentpage () 
{
  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [scope, setScope] = useState<Scope>('public');
  
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch experience level and tests on initial load
  const { data: experienceLevel } = useFetchExperienceLevelQuery();
  const [currentpage,] = useState(1);
  const { data: tests, isLoading, isError } = useFetchTestsQuery({ page: currentpage, limit: 6 });
  const [searchTests, { data: searchedTests }] = useSearchTestsMutation();
  const [filteredTests, setFilteredTests] = useState<TestResponseDTO[]>([]);

  useEffect(() => {
      
    setFilteredTests(tests?.data ?? []); // Initialize with full fetched data
          
  }, [tests]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTests(tests?.data || []); // Reset to full list if search query is empty
    } else {
      const filtered = tests?.data?.filter((test) => test?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));
      setFilteredTests(filtered || []);
    }
  }, [searchQuery, tests]);
      
  useEffect(() => {

          setFilteredTests(searchedTests?.data ?? []);
          
  }, [searchedTests]);

  const filterConfig: VFormFields[] = [
    {
      name: 'status',
      type: 'select',
      options: Object.entries(TestStatus).map(([, value]) => ({ value: value, label: value })),
      label: 'Select Status',
      position: '1 1 2',
    },
    {
      name: 'testQuestionFormat',
      type: 'select',
      label: 'Select Question Type',
      position: '1 3 2',
      options: Object.entries(QuestionType).map(([, value]) => ({ value: value, label: value })),
    },
    {
      name: 'experienceLevelId',
      type: 'select',
      options: experienceLevel?.map((experience: { id: string; name: string }) => ({
        value: experience.id,
        label: experience.name,
      })),
      label: 'Select Experience Level',
      position: '1 5 3',
    },
    {
      name: 'submit',
      label: 'Apply',
      type: 'submit',
      position: '1 8 2',
      classNames: '!mt-8',
    },
    {
      name: 'clear',
      type: 'discard',
      label: 'Clear Filters',
      position: '1 10 2',
      classNames: '!mt-8',
      onClick: () => {
        setFilteredTests(tests?.data ?? []);
      },
    },
  ];

  return (
    <><div className="min-h-screen">
      <VTypography as="h4" className="font-semibold">
        Test Assessment
      </VTypography>
      <div className="flex justify-between items-center mt-5">
        <div className="flex justify-center items-center gap-5">
          <div className="text-nowrap min-w-52">
            <VDatePicker onChange={() => { } } />
            {/* <VDropdown
      options={options}
      isMultiSelect={false}
      placeholder="Select Date"
      name="dropdown"
      onChange={() => {}}
      showSearch={false}
      disabled={false}
    /> */}
          </div>

          <VRadioButtonGroup
            name="group"
            options={[
              { label: 'Test Engine Library', value: 'public' },
              { label: 'My Own Tests', value: 'personal' },
            ]}
            defaultValue="public"
            direction="horizontal"
            onChange={(value) => setScope(value as Scope)}
            wrapperClasses={'!w-fit'} />
          <div className="text-nowrap">
            <VFilterToggle ref={filterButtonRef} filterRef={filterRef} />
          </div>
        </div>
        <div>
          <VButton>Create Assessment</VButton>
        </div>
      </div>
      <VFilter
        ref={filterRef}
        filterConfig={filterConfig}
        filterToggleRef={filterButtonRef}
        onApplyFilter={(formData) => {
          const searchCriteria = Object.keys(formData).map(
            (x) => ({
              operator: Operator.OR,
              field: x,
              value: formData[x],
              matchOn: MatchOn.LIKE,
            }) as SearchCriteria<TestRequestDTO>
          );
          searchCriteria.push({
            operator: Operator.OR,
            field: 'isPublic',
            matchOn: MatchOn.EQUAL,
            value: scope === 'public',
          } as SearchCriteria<TestRequestDTO>);
          console.log(searchCriteria);
          searchTests(SearchRequestDTO.default(searchCriteria));
        } }
        notchPositionFromLeft={10} />
      <div className="border border-theme-default mb-5 mt-5"></div>
      <VTestList 
        data={{ 
          data: filteredTests, 
          totalpages: tests?.totalpages ?? 0, 
          currentpage, 
          pageSize: tests?.pageSize ?? 0, 
          totalItems: tests?.totalItems ?? 0 
        }}  
        loading={isLoading} 
        error={isError}
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        />
    </div>
    </>
  );
};

export default TestAssessmentpage;
