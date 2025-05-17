import React, { useCallback, useEffect, useImperativeHandle, useState, forwardRef, ForwardedRef } from 'react';
import { FormFields, FormFieldData } from '@types'; // Adjust import path
import { DynamicForm } from '../dynamic-form/dynamic-form.organism';
import { useSearch } from '@hooks';
import { SearchCriteria, SearchRequestDTO } from '@dto/request';
import { MatchOn, Operator, OrderDirection } from '@utils/enums';
import { SearchBox } from '@components/molecules';
import { FaFilter } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { throttle } from '@utils/functions'; // Import throttle
import { UseMutateFunction } from 'react-query';
import { IconType } from 'react-icons';

type SearchProps<TREQ, TRES> = DefaultProps & {
  searchEndpoint: string;
  formConfig: FormFields[];
  searchRequestOptions?: SearchRequestDTO<TREQ>;
  searchButtonLabel?: string;
  onResults: (results: TRES) => void;
  initialCriteria?: SearchCriteria<TREQ>[];
  showSearchBox?: boolean;
  searchContainerSize?: number;
  searchBoxBtnProps?: {
    icon?: IconType;
    label?: string;
    onClick?: () => void;
  }[];
};

// Define the ref type with methods and properties to be exposed
export type SearchComponentRef<TREQ, TRES> = {
  searchData: UseMutateFunction<TRES, Error, SearchRequestDTO<TREQ>, unknown>;
  performThrottledSearch: (value: string) => void;
  getResults: () => TRES | null;
  isLoading: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
function SearchComponent<TREQ, TRES>(
  {
    searchEndpoint,
    searchRequestOptions,
    searchButtonLabel,
    formConfig,
    onResults,
    className,
    initialCriteria,
    showSearchBox = true,
    searchContainerSize = 4,
    searchBoxBtnProps = [],
  }: SearchProps<TREQ, TRES>,
  ref: ForwardedRef<SearchComponentRef<TREQ, TRES>>
) {
  const [showSearchForm, setShowSearchForm] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [results, setResults] = useState<TRES | null>(null);

  // Mutation hook to perform the search
  const { mutate: searchData, isLoading, isSuccess, data } = useSearch<TREQ, TRES>(searchEndpoint);

  // Throttled search function
  const throttledSearch = useCallback(
    throttle((value: string) => {
      if (!results) return;

      const match = JSON.stringify(results).toLowerCase().includes(value.toLowerCase());
      if (match) {
        onResults(results); // Pass the result if it matches
      }
    }, 300),
    [results, onResults]
  );
  // Expose searchData function and other methods to parent component
  useImperativeHandle(ref, () => ({
    searchData,
    performThrottledSearch: (value: string) => {
      throttledSearch(value);
    },
    getResults: () => results,
    isLoading,
  }));

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    throttledSearch(value);
  };

  // Handle form submission and convert form data to search criteria
  const handleFormSubmit = useCallback(
    (formData: FormFieldData) => {
      const criteria: SearchCriteria<TREQ>[] = Object.keys(formData)
        .filter((key) => formData[key])
        .map((key) => ({
          field: key as keyof TREQ,
          operator: Operator.AND,
          matchOn: MatchOn.LIKE,
          value: formData[key] as string | number,
        }));

      if (criteria.length <= 0) {
        toast.error('At least one search value required');
        return;
      }

      const searchRequest: SearchRequestDTO<TREQ> = {
        criteria,
        limit: searchRequestOptions?.limit ?? 100,
        offset: searchRequestOptions?.offset ?? 0,
        order: searchRequestOptions?.order ?? [{ field: 'createdAt', direction: OrderDirection.DESC }],
      };

      searchData(searchRequest);
    },
    [searchData, searchRequestOptions]
  );

  useEffect(() => {
    if (initialCriteria) {
      const searchRequest: SearchRequestDTO<TREQ> = {
        criteria: initialCriteria,
        limit: searchRequestOptions?.limit ?? 100,
        offset: searchRequestOptions?.offset ?? 0,
        order: searchRequestOptions?.order ?? [{ field: 'createdAt', direction: OrderDirection.DESC }],
      };

      searchData(searchRequest);
    }
  }, [initialCriteria, searchRequestOptions, searchData]);

  useEffect(() => {
    if (isSuccess && data) {
      setResults(data);
      onResults(data);
      setShowSearchForm(false);
    }
  }, [data, isSuccess, onResults]);

  return (
    <div className={`w-full relative ${className}`}>
      <div className="w-full flex">
        <div className="w-full">
          {showSearchBox && (
            <SearchBox
              value={searchValue}
              onChange={handleSearchValueChange}
              buttonsProps={[
                ...searchBoxBtnProps!,
                {
                  icon: FaFilter,
                  iconSize: 20,
                  onClick: () => setShowSearchForm(!showSearchForm),
                },
              ]}
            />
          )}
        </div>
      </div>
      {showSearchForm && (
        <div
          className={`w-${String(searchContainerSize)}/6 absolute top-14 right-0 p-5 bg-skin-theme-light border rounded-md shadow-xl z-10`}
        >
          <DynamicForm
            config={formConfig}
            onSubmit={handleFormSubmit}
            submitButtonLabel={searchButtonLabel ?? 'Search'}
            submitButtonLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

export default forwardRef(SearchComponent) as <TREQ, TRES>(
  props: SearchProps<TREQ, TRES> & { ref?: ForwardedRef<SearchComponentRef<TREQ, TRES>> }
) => JSX.Element;
