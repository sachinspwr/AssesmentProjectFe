import { Icon } from '@components/atoms';
import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { QuizQuestion } from './quiz-question';
import { TestResultResponseDTO } from '@dto/response';

interface questionListProps {
  testResultResponse: TestResultResponseDTO;
}

function QuestionList({ testResultResponse }: questionListProps) {
  const [isAllExpanded, setIsAllExpanded] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 ">
          QUESTIONS ({testResultResponse?.test?.questions?.length})
        </h2>
        <button
          className="text-black-600 hover:text-black-800 flex items-center"
          onClick={() => setIsAllExpanded(!isAllExpanded)}
        >
          Expand all
          {isAllExpanded ? (
            <Icon icon={IoChevronUp} className="w-5 h-5 ml-1" />
          ) : (
            <Icon icon={IoChevronDown} className="w-5 h-5 ml-1" />
          )}
        </button>
      </div>
      {testResultResponse?.test?.questions?.map((question, index) => {
        const testQuestionAnswerObject = testResultResponse?.testQuestionAnswer.find(
          (ans) => ans.questionId.toString() === question.id.toString()
        ); 
        return <QuizQuestion key={question.id} question={question} srNumber={index} testResultResponse={testResultResponse} testQuestionAnswerObject={testQuestionAnswerObject}/>;
      })}
    </div>
  );
}

export { QuestionList };
