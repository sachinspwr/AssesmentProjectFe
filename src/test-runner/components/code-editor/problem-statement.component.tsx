/* eslint-disable @typescript-eslint/no-explicit-any */
import { VStatus } from "@components/atoms";
import { VTypography } from "@components/molecules/typography/v-typography.mol"
import VMarkdown from "@components/organisms/markdown/v-markdown-render.organism";
import { QuestionResponseDTO } from "@dto/response"
import { CodingQuestionResponseDTO } from "@dto/response/coading-question-response.dto";
import { useMemo } from "react";

interface ProblemStatementProps extends Omit<QuestionResponseDTO, 'id'> {
  questionText: string;
  questionExplanation?: string;
  codingQuestion?: CodingQuestionResponseDTO;
}

function ProblemStatementComponent({
  questionText,
  questionExplanation,
  codingQuestion,
  difficulty,
  type,
  timeLimit,
  marks,
}: ProblemStatementProps) {
  // Memoize derived values for performance
  const { sampleTestCase, inputFormat, outputFormat } = useMemo(() => ({
    sampleTestCase: codingQuestion?.testCases?.find((tc: any) => tc.kind === "Sample"),
    inputFormat: codingQuestion?.inputFormat?.description,
    outputFormat: codingQuestion?.outputFormat?.description
  }), [codingQuestion]);

  // Metadata items for the header
  const metadataItems = [
    { label: "Difficulty", value: difficulty, type: getDifficultyType(difficulty) },
    { label: "Type", value: type, type: 'default' },
    { label: "Time Limit", value: `${timeLimit} mins`, type: 'primary' },
    { label: "Marks", value: `${marks.toString()} Marks`, type: 'positive' }
  ].filter(item => item.value);

  // Helper function to determine difficulty chip type
  function getDifficultyType(difficulty?: string) {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'positive';
      case 'medium': return 'warning';
      case 'hard': return 'negative';
      default: return 'default';
    }
  }

  return (
    <div className="w-full h-full bg-theme-default flex flex-col">
      {/* <div className="space-y-6 p-2.5"> */}
      {/* Header Section */}
      <div className="p-2.5 border-theme-default">
        <section className="space-y-4">
          <div className="border-b border-theme-default pb-2 flex justify-between items-center">
            <VTypography as="h3">
              Problem Statement
            </VTypography>
          </div>
        </section>
      </div>

      {/* Content Sections */}

      <div className="flex-1 overflow-auto p-2.5 space-y-8">
        <div className="flex gap-3 flex-wrap">
          {metadataItems.map((item, index) => (
            <VStatus
              key={index}
              label={`${item.value}`}
              type={item.type as any}
              className="py-1 px-3"
            />
          ))}
        </div>
        <VTypography as="p">
          {questionText}
        </VTypography>
        {questionExplanation && (
          <section className="space-y-3">
            <VTypography as="h5">
              Description
            </VTypography>
            <VTypography as="p">
              {questionExplanation}
            </VTypography>
          </section>
        )}

        {(inputFormat || outputFormat) && (
          <div className="grid md:grid-cols-2 gap-6">
            {inputFormat && (
              <section className="space-y-3">
                <VTypography as="h6">
                  Input Format
                </VTypography>
                <div className="bg-theme-default-hover p-4 rounded-lg border border-theme-default">
                  <pre
                    className="whitespace-pre-wrap font-mono text-sm text-theme-default"
                  >
                    {inputFormat}
                  </pre>
                </div>
              </section>
            )}

            {outputFormat && (
              <section className="space-y-3">
                <VTypography as="h6">
                  Output Format
                </VTypography>
                <div className="bg-theme-default-hover p-4 rounded-lg border border-theme-default">
                  <pre
                    className="whitespace-pre-wrap font-mono text-sm text-theme-default"
                  >
                    {outputFormat}
                  </pre>
                </div>
              </section>
            )}
          </div>
        )}

        {sampleTestCase && (
          <div className="grid md:grid-cols-2 gap-6">
            <section className="space-y-3">
              <VTypography as="h6">
                Sample Input
              </VTypography>
              <div className="bg-theme-default-hover p-4 rounded-lg border border-theme-default">
                <pre className="whitespace-pre-wrap font-mono text-sm text-theme-default">
                  {sampleTestCase.input}
                </pre>
              </div>
            </section>
            <section className="space-y-3">
              <VTypography as="h6">
                Sample Output
              </VTypography>
              <div className="bg-theme-default-hover p-4 rounded-lg border border-theme-default">
                <pre className="whitespace-pre-wrap font-mono text-sm text-theme-default">
                  {sampleTestCase.expectedOutput}
                </pre>
              </div>
            </section>
          </div>
        )}

        {codingQuestion?.problemMarkdown && (
          <section className="space-y-3">
            <VTypography as="h6">
              Additional Details
            </VTypography>
            <div className=" p-4 rounded-lg border">
              <VMarkdown
                content={codingQuestion.problemMarkdown}
              />
            </div>
          </section>
        )}
      </div>
      {/* </div> */}
    </div>
  )
}

export { ProblemStatementComponent }