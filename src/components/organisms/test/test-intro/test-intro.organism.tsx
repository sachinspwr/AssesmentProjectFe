import React from 'react';
import { FaClipboardList, FaBook, FaClock, FaInfoCircle, FaTags, FaQuestionCircle, FaChartPie } from 'react-icons/fa';
import { TestResponseDTO } from '@dto/response';
import { QuestionType, TestStatus } from '@utils/enums'; // Adjust import as needed
import { Card, SummaryItem } from '@components/molecules';
import { tryParseJson } from '@utils/functions';
import { MdScore } from 'react-icons/md';
import { TbStatusChange } from 'react-icons/tb';

interface TestIntroProps {
  test: TestResponseDTO;
}

function TestIntro({ test }: TestIntroProps) {
  const questionCountsByType = test.questions.reduce((acc: { [key: string]: number }, question) => {
    const { type } = question;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card className="p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4 2xl:gap-6">
          <SummaryItem
            icon={FaClipboardList}
            title="Test Format"
            content={test.testQuestionFormat}
            iconClasses="text-blue-500"
          />

          <SummaryItem icon={FaBook} title="Description" content={test.description} iconClasses="text-green-500" />

          <SummaryItem
            icon={FaClock}
            title="Duration"
            content={`${test.durationInMinutes} minutes`}
            iconClasses="text-yellow-500"
          />

          <SummaryItem
            icon={MdScore}
            title="Passing Score"
            content={`${test.cutoffScore}/${test.maxScore}`}
            iconClasses="text-yellow-500"
          />

          <SummaryItem
            icon={FaQuestionCircle}
            title="Total Questions"
            content={test.questions.length.toString()}
            iconClasses="text-purple-500"
          />

          {test?.tags && (
            <SummaryItem
              icon={FaTags}
              title="Tags"
              content={tryParseJson<string[]>(test.tags)?.join(', ')}
              iconClasses="text-teal-500"
            />
          )}
        </div>

        <div className="flex flex-col gap-8">
          <SummaryItem
            icon={FaChartPie}
            title="Questions by Format"
            content={
              <ul className="text-skin-theme-dark list-disc pl-5">
                {Object.entries(questionCountsByType).map(([type, count]) => (
                  <li className="pt-1" key={type}>
                    {type as QuestionType}: <b>{count}</b>
                  </li>
                ))}
              </ul>
            }
            iconClasses="text-green-500"
          />

          <SummaryItem
            icon={FaInfoCircle}
            title="Instructions"
            content={
              <ol className="list-decimal pl-5">
                {test.instructions &&
                  JSON.parse(test.instructions).map((inst: string, index: number) => (
                    <li className="p-1" key={index}>
                      {' '}
                      {inst}
                    </li>
                  ))}
              </ol>
            }
            iconClasses="text-purple-500"
          />

          <SummaryItem
            icon={TbStatusChange}
            title="Status"
            content={`${test.status ?? TestStatus.Draft}`}
            iconClasses="text-cyan-500"
          />
        </div>
      </div>
    </Card>
  );
}

export { TestIntro };
