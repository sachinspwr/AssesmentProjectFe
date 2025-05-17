import React, { useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import SearchComponent from '@components/organisms/search-form/search-form.organism';
import { SearchCriteria, TestResultRequestDTO } from '@dto/request';
import { MatchOn, Operator } from '@utils/enums';
import { FormField } from '@types';
import { Column, Table } from '@components/organisms';
import { TestResultResponseDTO } from '@dto/response';
import { tokenService } from '@services/token.service';

type TestResultProps = {
  defaultTestResults: TestResultResponseDTO[];
};

function TestResult({ defaultTestResults }: TestResultProps) {
  const { testId } = useParams<{ testId: string }>();
  const [testResults, setTestResults] = useState<TestResultResponseDTO[]>(defaultTestResults);

  // Memoized initial criteria based on testId
  const initialCriteria = useMemo<SearchCriteria<TestResultRequestDTO>[]>(
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
        placeholder: 'Test Id',
      },
      {
        name: 'userId',
        label: 'User Id',
        type: 'text',
        required: false,
        placeholder: 'Enter user Id',
      },
      {
        name: 'testLinkId',
        label: 'Test Link Id',
        type: 'text',
        required: false,
        placeholder: 'Enter test link Id',
      },
      {
        name: 'completedAt',
        label: 'Completed On',
        type: 'date',
        required: false,
        placeholder: 'Select completion date',
      },
    ],
    [testId]
  );

  const columns: Column[] = useMemo(
    () => [
      {
        header: 'User',
        accessor: 'user',
      },
      {
        header: 'Test Link',
        accessor: 'testLink',
      },
      {
        header: 'Score',
        accessor: 'score',
        contentPosition: 'center',
      },
      {
        header: 'Out Of',
        accessor: 'outOf',
        contentPosition: 'center',
      },
      {
        header: 'Correct Answers',
        accessor: 'correctAnswersCount',
        contentPosition: 'center',
      },
      {
        header: 'Percentage',
        accessor: 'correctionPercentage',
        contentPosition: 'center',
      },
      {
        header: 'Feedback',
        accessor: 'feedback',
      },
      {
        header: 'Completed On',
        accessor: 'completedAt',
        // Formatting date
        Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString(),
      },
      {
        header: 'Passed',
        accessor: 'isPassed',
        contentPosition: 'center',
        Cell: ({ value }: { value: boolean }) => (value ? 'Yes' : 'No'),
      },
    ],
    []
  );

  const handleSearchResults = useCallback((results: TestResultResponseDTO | TestResultResponseDTO[]) => {
    const normalizedResults = Array.isArray(results) ? results : [results];
    setTestResults(normalizedResults);
  }, []);

  const getUser = (x: TestResultResponseDTO) => {
    if (x?.testLinkAnonymousUser) {
      return `${x.testLinkAnonymousUser.lastName}, ${x.testLinkAnonymousUser.firstName}`;
    }

    if (!x.user) {
      return 'Unknown User';
    }

    return `${x.user?.lastName}, ${x.user.firstName}`;
  };

  const formatData = (result: TestResultResponseDTO[]) => {
    return result?.map((x) => {
      const isPassed = x.isPassed ? 'PASSED' : 'FAILED';
      const user = getUser(x);
      const testLink = x.testLink ? x.testLink.testLinkName : 'Unknown Link';
      return { ...x, isPassed, user, testLink };
    });
  };

  return (
    <div className="w-full">
      <SearchComponent<TestResultRequestDTO, TestResultResponseDTO>
        searchEndpoint="/tests/results/search"
        formConfig={searchConfig}
        initialCriteria={initialCriteria}
        showSearchBox={false}
        onResults={handleSearchResults}
        searchContainerSize={3}
      />
      {testResults.length === 0 ? (
        <p className="text-center text-skin-theme-dark">No test results available</p>
      ) : (
        <Table keySelector="testId" columns={columns} data={formatData(testResults)} />
      )}
    </div>
  );
}

export { TestResult };
