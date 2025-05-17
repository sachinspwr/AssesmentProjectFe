
import { Icon } from '@components/atoms';
import React, { useState } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { QuestionWrapper } from './question-wrapper';
import { QuestionResponseDTO, TestQuestionAnswerResponseDTO, TestResultResponseDTO } from '@dto/response';

interface QuizQuestionProps {
  question: QuestionResponseDTO; 
  srNumber:number;
  testResultResponse:TestResultResponseDTO;
  testQuestionAnswerObject:TestQuestionAnswerResponseDTO | undefined
}
function QuizQuestion({question,srNumber,testResultResponse,testQuestionAnswerObject }:QuizQuestionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between py-4 px-6 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Q. {srNumber+1}</span>
            <span className="text-gray-600">{question?.questionText }</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`font-medium ${testQuestionAnswerObject?.finalMarks==0 ? 'text-red-500' : 'text-green-500'}`}>
              {testQuestionAnswerObject?.finalMarks}
            </span>
            {isExpanded ? <Icon icon={IoChevronUp} className="w-5 h-5 text-gray-400" /> : <Icon icon={IoChevronDown} className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
        {isExpanded && (
          <div className="py-4 px-6">
            <QuestionWrapper type={question?.type} answerOptions={JSON.parse(question?.answerOptions)} testQuestionAnswerObject={testQuestionAnswerObject}/>
          </div>
        )}
      </div>
    )

}


export { QuizQuestion};