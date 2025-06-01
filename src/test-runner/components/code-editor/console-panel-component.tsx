import { VTextArea } from '@components/atoms/text-area/v-text-area.atom';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { TestCaseResponseDTO } from '@dto/response/test-case-response.dto';
import { CodingQuestionGradingStrategy } from '@utils/enums/coding-question-grading-strategy.enum';
import { useEffect, useMemo, useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { HiTerminal } from 'react-icons/hi';
import { HiCheckCircle, HiChevronDown, HiChevronUp, HiInformationCircle, HiXCircle } from 'react-icons/hi2';

export interface TestCaseResult {
  caseNumber: number;
  passed: boolean;
  actualOutput?: string;
  error?: string;
  executionTime?: number;
  memoryUsage?: string;
}

interface ConsolePanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  codeOutput: string;
  codeError: string;
  sampleInput: string;
  onSampleInputChange: (value: string) => void;
  executionTime?: number;
  memoryUsage?: string;
  testCases: TestCaseResponseDTO[];
  gradingStrategy: CodingQuestionGradingStrategy;
  expectedOutput?: string;
  activeTab?: 'testcase' | 'input' | 'result';
  onTabChange?: (tab: 'testcase' | 'input' | 'result') => void;
}

export function ConsolePanel({
  isCollapsed,
  onToggle,
  codeOutput,
  codeError,
  sampleInput,
  onSampleInputChange,
  executionTime,
  memoryUsage,
  testCases,
  gradingStrategy,
  expectedOutput = '',
  activeTab: externalActiveTab,
  onTabChange: externalOnTabChange,
}: ConsolePanelProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<'testcase' | 'input' | 'result'>(
    gradingStrategy === CodingQuestionGradingStrategy.Custom
      ? 'result'
      : gradingStrategy === CodingQuestionGradingStrategy.TestCases
        ? 'testcase'
        : 'input'
  );
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab;
  const setActiveTab = externalOnTabChange || setInternalActiveTab;
  const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);
  const [selectedTestCase, setSelectedTestCase] = useState(
    testCases[0]?.caseNumber ?? 0
  );

  const isTestCasesMode = gradingStrategy === CodingQuestionGradingStrategy.TestCases;
  const isOutputMatchingMode = gradingStrategy === CodingQuestionGradingStrategy.OutputMatch;
  const isCustomMode = gradingStrategy === CodingQuestionGradingStrategy.Custom;
  const hasOutput = codeOutput || codeError;

  const checkTestCases = (userOutput: string) => {
    return testCases.map(tc => {
      const expected = tc.expectedOutput?.trim();
      const actual = userOutput.trim();

      return {
        caseNumber: tc.caseNumber!,
        passed: actual === expected,
        actualOutput: actual,
        error: actual === expected ? undefined : "Output mismatch",
      };
    });
  };

  useEffect(() => {
    if (hasOutput && isTestCasesMode && !codeError) {
      setTestCaseResults(checkTestCases(codeOutput));
    } else if (codeError) {
      setTestCaseResults(testCases.map(tc => ({
        caseNumber: tc.caseNumber!,
        passed: false,
        error: codeError
      })));
    }
  }, [hasOutput, isTestCasesMode, codeError, codeOutput, testCases]);

  const tabs = useMemo(() => {
    if (isCustomMode) return [{ value: 'result', name: 'Output', icon: <HiTerminal /> }];
    if (isTestCasesMode) return [
      { value: 'testcase', name: 'TestCases', icon: <HiCheckCircle /> },
      { value: 'result', name: 'Test Result', icon: <HiTerminal /> }
    ];
    return [
      { value: 'input', name: 'Input', icon: <HiInformationCircle /> },
      { value: 'result', name: 'Output', icon: <HiTerminal /> }
    ];
  }, [isCustomMode, isTestCasesMode]);

  const executionInfo = useMemo(() => {
    const info: string[] = [];
    if (executionTime !== undefined) info.push(`Time: ${executionTime}ms`);
    if (memoryUsage) info.push(`Memory: ${memoryUsage}KB`);
    return info;
  }, [executionTime, memoryUsage]);

  const selectedCase = useMemo(
    () => testCases.find(tc => tc.caseNumber === selectedTestCase),
    [selectedTestCase, testCases]
  );

  return (
    <div>
      <div className="border rounded-lg">
        <div className="flex justify-between items-center px-3 pb-0">
          <div className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.value}
                className={`flex items-center py-1 font-medium rounded-t  ${activeTab === tab.value
                  ? 'text-theme-primary-hover border-b-2 border-theme-primary-hover'
                  : 'text-theme-muted'
                  }`}
                onClick={() => setActiveTab(tab.value as 'testcase' | 'input' | 'result')}
              >
                <VTypography as='p' className="mr-2">{tab.icon}</VTypography>
                {tab.name}
              </button>
            ))}
          </div>
          <button
            onClick={onToggle}
            className="p-1 text-theme-muted hover:text-theme-primary"
            aria-label="Toggle console"
          >
            {isCollapsed ? <HiChevronUp className="h-5 w-5" /> : <HiChevronDown className="h-5 w-5" />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="h-40 flex flex-col overflow-auto p-4 border-t">
            {activeTab === 'testcase' && isTestCasesMode && selectedCase ? (
              <>
                <div className="flex space-x-2 mb-4">
                  {testCases.map(tc => {
                    const result = testCaseResults.find(r => r.caseNumber === tc.caseNumber);
                    return (
                      <button
                        key={tc.caseNumber}
                        className={`flex items-center px-3 py-1 text-sm rounded ${selectedTestCase === tc.caseNumber
                          ? 'bg-theme-primary text-theme-on-primary'
                          : 'bg-theme-default-hover text-theme-default'
                          }`}
                        onClick={() => {
                          setSelectedTestCase(tc.caseNumber!);
                          onSampleInputChange(tc.input ?? '');
                        }}
                      >
                        {result ? (
                          result.passed ? (
                            <HiCheckCircle className="mr-1 text-theme-positive" />
                          ) : (
                            <HiXCircle className="mr-1 text-theme-negative" />
                          )
                        ) : null}
                        Case {tc.caseNumber}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <VTypography as="p">
                    Input
                  </VTypography>
                  <pre className="p-2 bg-theme-default-hover rounded text-sm font-mono whitespace-pre-wrap text-theme-default">
                    {selectedCase.input}
                  </pre>

                  <VTypography as="p">
                    Expected Output
                  </VTypography>
                  <pre className="p-2 bg-theme-default-hover rounded text-sm font-mono whitespace-pre-wrap text-theme-default">
                    {selectedCase.expectedOutput}
                  </pre>
                </div>
              </>
            ) : activeTab === 'input' && isOutputMatchingMode ? (
              <div className="space-y-4">
                <div>
                  <VTypography as="p">
                    Expected Output
                  </VTypography>
                  <pre className="p-2 bg-theme-default-hover rounded text-sm font-mono whitespace-pre-wrap text-theme-default">
                    {expectedOutput}
                  </pre>
                </div>
                <div>
                  <VTypography as="p" >
                    <HiTerminal className="mr-1" />
                    Input
                  </VTypography>
                  <VTextArea
                    className="w-full h-20 p-2 mt-1 border rounded text-sm font-mono"
                    value={sampleInput}
                    onChange={onSampleInputChange}
                    placeholder="Enter custom input (as string)"
                    name="customInput"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {hasOutput ? (
                  <>
                    <div className="flex items-center gap-2">
                      <BsCircleFill
                        className={`text-xs ${isOutputMatchingMode
                          ? 'text-gray-400'
                          : codeError
                            ? 'text-red-500'
                            : 'text-green-500'
                          }`}
                      />
                      <VTypography as="p">
                        {isOutputMatchingMode
                          ? 'Output Matching Result'
                          : `Execution ${codeError ? 'Failed' : 'Completed Successfully'}`}
                      </VTypography>
                    </div>

                    <div className="p-3 bg-theme-default-hover rounded">
                      {isOutputMatchingMode && (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`w-3 h-3 rounded-full ${codeOutput.trim() === expectedOutput.trim()
                                ? 'bg-theme-positive'
                                : 'bg-theme-negative'
                                }`}
                            />
                            <span>
                              {codeOutput.trim() === expectedOutput.trim()
                                ? 'Correct!'
                                : 'Incorrect'}
                            </span>
                          </div>
                          <VTypography as="p">
                            Expected:
                          </VTypography>
                          <pre className="p-2 bg-theme-default-hover rounded text-sm font-mono whitespace-pre-wrap text-theme-default">
                            {expectedOutput}
                          </pre>
                        </>
                      )}
                      <pre
                        className={`p-2 bg-theme-default-hover rounded text-sm font-mono whitespace-pre-wrap text-theme-default ${codeError ? 'text-red-500 dark:text-red-400' : ''
                          }`}
                      >
                        {codeError || codeOutput}
                      </pre>
                    </div>

                    {executionInfo.length > 0 && (
                      <div className="text-sm text-theme-muted">
                        {executionInfo.join(' • ')}
                      </div>
                    )}
                  </>
                ) : (
                  <VTypography as="p">Run your code to see output.</VTypography>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}