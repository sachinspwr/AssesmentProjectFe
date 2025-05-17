import { VTextArea } from '@components/atoms';
import { Card } from '@components/molecules/advance-card/card.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';

interface ConsolePanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  codeOutput: string;
  codeError: string;
  sampleInput: string;
  onSampleInputChange: (value: string) => void;
  executionTime?: number;  // Add execution time prop
  memoryUsage?: string;   // Add memory usage prop
}

export function ConsolePanel({
  isCollapsed,
  onToggle,
  codeOutput,
  codeError,
  sampleInput,
  onSampleInputChange,
  executionTime,
  memoryUsage
}: ConsolePanelProps) {
  // Determine if we have any output to show
  const hasOutput = codeOutput || codeError;

  // Format execution information
  const executionInfo = [];
  if (executionTime) executionInfo.push(`Time: ${executionTime}s`);
  if (memoryUsage) executionInfo.push(`Memory: ${memoryUsage}KB`);

  return (
    <>
      {/* Floating toggle button - always rendered */}
      {isCollapsed && (
        <div className="fixed bottom-4 right-6">
          <button
            onClick={onToggle}
            className="p-2 text-theme-default rounded-full shadow-lg bg-theme-primary focus:outline-none"
            aria-label="Expand console"
          >
            <HiChevronUp className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Console content - only shown when expanded */}
      {!isCollapsed && (
        <Card className="!p-0 border rounded-lg shadow my-2">
          <div>
            <div className="flex justify-between items-center !border-b-2">
              <VTypography as='span' className="font-medium text-theme-primary border-b-2 border-theme-primary-hover p-2">
                Console
              </VTypography>
              <button
                onClick={onToggle}
                className="pr-2"
                aria-label="Collapse console"
              >
                <HiChevronDown className="h-5 w-5" />
              </button>
            </div>
            <div className='flex-1 overflow-y-auto'>
              <div className="grid grid-cols-2 gap-1 px-1 border-b-2">
                <div>
                  <VTypography as='p'>Input:</VTypography>
                  <VTextArea
                    className="w-full h-32 p-1 border rounded-sm resize-none text-sm"
                    value={sampleInput}
                    onChange={onSampleInputChange}
                    name={''}
                  />
                </div>
                <div>
                  <VTypography as='p'>Output:</VTypography>
                  <div className="w-full h-32 p-1 bg-gray-900 text-theme-default-disabled text-sm overflow-auto">
                    {codeOutput && (
                      <pre className="whitespace-pre-wrap break-words">{codeOutput}</pre>
                    )}
                    {codeError && (
                      <pre className="text-theme-negative-lite whitespace-pre-wrap break-words">{codeError}</pre>
                    )}
                    {!hasOutput && (
                      <pre className="text-theme-default-disabled">0</pre>
                    )}
                  </div>
                </div>
              </div>
              <div className='p-2'>
                {hasOutput ? (
                  <VTypography as='span'>
                    Execution {codeError ? 'Failed' : 'Completed Successfully'}
                    {executionInfo.length > 0 && ` (${executionInfo.join(', ')})`}
                  </VTypography>
                ) : (
                  <VTypography as='span'>Ready to execute code</VTypography>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}