import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import { VTitleWithIcon } from '@components/molecules/icon-title/v-title-with-icon.mol';
import UserTestResultList from 'test-result/components/user-test-result-list.component';
import { useGetFilteredTestResultsQuery } from 'store/slices/test-result.slice';
import { ResultFilter } from '../component/result-filter.component';
import { FormFieldData } from '@types';
import { VFilterRef } from '@components/organisms/filter/v-filter.organism';
import VFilterToggle from '@components/organisms/filter/v-filter-toggle.organism';

function ResultPage() {
  const navigate = useNavigate();
  const filterRef = useRef<VFilterRef>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [queryParams, setQueryParams] = useState<Record<string, string | number>>({});

  const {
    data: filteredTests,
    isLoading: isFilteredLoading,
  } = useGetFilteredTestResultsQuery(queryParams);

  const handleApplyFilter = (formData: FormFieldData) => {
    const filtered: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        filtered[key] = value.toString();
      }
    });

    setQueryParams(filtered); // 👈 triggers the RTK query
  };

  const handleReset = () => {
    setQueryParams({});
  };

  return (
    <>
      <VTitleWithIcon as="h3" icon={MdArrowBack} onClick={() => navigate(-1)}>
        Result
      </VTitleWithIcon>
      <div className="text-nowrap">
        <VFilterToggle ref={filterButtonRef} filterRef={filterRef} />
      </div>

      <ResultFilter
        onApplyFilter={handleApplyFilter}
        onReset={handleReset}
        filterRef={filterRef}
        filterButtonRef={filterButtonRef}
      />

      <div className="border border-theme-default mb-5 mt-5"></div>

      <UserTestResultList data={filteredTests?.data ?? []} loading={isFilteredLoading} />
    </>
  );
}

export default ResultPage;
