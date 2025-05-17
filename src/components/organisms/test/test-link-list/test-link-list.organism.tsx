import React, { useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SearchComponent from '@components/organisms/search-form/search-form.organism';
import { SearchCriteria, TestLinkRequestDTO } from '@dto/request';
import { MatchOn, Operator, TestLinkType } from '@utils/enums';
import { FormField } from '@types';
import { getOptionsFromEnum } from '@utils/functions';
import { Column, Table } from '@components/organisms';
import { TestLinkResponseDTO } from '@dto/response';
import { tokenService } from '@services/token.service';

type TestLinkListProps = {
  defaultTestLinks: TestLinkResponseDTO[];
};

function TestLinkList({ defaultTestLinks }: TestLinkListProps) {
  const { testId } = useParams<{ testId: string }>();
  const [testLinks, setTestLinks] = useState<TestLinkResponseDTO[]>(defaultTestLinks);

  // Memoized initial criteria based on testId
  const initialCriteria = useMemo<SearchCriteria<TestLinkRequestDTO>[]>(
    () => [
      {
        field: 'testId',
        operator: Operator.AND,
        matchOn: MatchOn.EQUAL,
        value: `${testId}`,
      },
      {
        field: 'createdById',
        operator: Operator.OR,
        matchOn: MatchOn.EQUAL,
        value: `${tokenService.getValueFromToken('id')}`,
      },
    ],
    [testId]
  );

  const searchConfig: FormField[] = useMemo(
    () => [
      {
        name: 'testId',
        label: 'Test Id',
        type: 'hidden',
        value: testId,
        required: false,
        placeholder: 'Enter link name',
      },
      {
        name: 'testLinkName',
        label: 'Link Name',
        type: 'text',
        required: false,
        placeholder: 'Enter link name',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
        required: false,
        placeholder: 'Enter description',
      },
      {
        name: 'linkType',
        label: 'Link Type',
        type: 'select',
        options: getOptionsFromEnum(TestLinkType),
        placeholder: 'Select link type',
      },
      {
        name: 'expiringOn',
        label: 'Expiring On',
        type: 'date',
        required: false,
        placeholder: 'Select expiration date',
      },
    ],
    [testId]
  );

  const columns: Column[] = useMemo(
    () => [
      {
        header: 'Test Link Name',
        accessor: 'testLinkName',
      },
      {
        header: 'Link Type',
        accessor: 'linkType',
        contentPosition: 'left',
      },
      {
        header: 'Description',
        accessor: 'description',
      },
      {
        header: 'Max Attempts',
        accessor: 'maxAttemptsForLink',
        contentPosition: 'center',
      },
      {
        header: 'Usage Count Limit',
        accessor: 'usageCountLimit',
        contentPosition: 'center',
      },
      {
        header: 'Expiring On',
        accessor: 'expiringOn',
        // Formatting date
        Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString(),
      },
    ],
    []
  );

  const handleSearchResults = useCallback((results: TestLinkResponseDTO | TestLinkResponseDTO[]) => {
    const normalizedResults = Array.isArray(results) ? results : [results];
    setTestLinks(normalizedResults);
  }, []);

  return (
    <div className="w-full h-full">
      <SearchComponent<TestLinkRequestDTO, TestLinkResponseDTO>
        searchEndpoint="/tests/links/search"
        formConfig={searchConfig}
        initialCriteria={initialCriteria}
        showSearchBox={false}
        onResults={handleSearchResults}
        searchContainerSize={3}
      />
      {testLinks.length === 0 ? (
        <p className="flex justify-center items-center text-skin-theme-dark min-h-screen" style={{ minHeight: '60vh' }}>
          No test links available
        </p>
      ) : (
        <Table keySelector="" columns={columns} data={testLinks} classes={{ wrapper: 'bg-skin-theme' }} />
      )}
    </div>
  );
}

export { TestLinkList };
