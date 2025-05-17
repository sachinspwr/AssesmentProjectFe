import { Button } from '@components/atoms';
import React from 'react';

type QuestionStatusItemProps = DefaultProps & {
  questionId: string; // questionId prop
  questionIndex: number; // Sequential number to display
  isAnswered: boolean;
  isSubmitted: boolean;
  isCurrent: boolean;
  setActiveQuestionId: (newQuestionId: string) => void; // Function to set active question ID
};

function QuestionStatusItem({
  questionId,
  questionIndex,
  isSubmitted,
  isCurrent,
  setActiveQuestionId,
  className,
}: QuestionStatusItemProps) {
  const getColor = (isCurrent: boolean, isSubmitted: boolean) => {
    if (isCurrent) return '!bg-green-600';
    else if (isSubmitted) return '!bg-purple-600';
    else '';
  };
  return (
    <div className="relative">
      <Button
        key={questionId}
        className={`${className} ${getColor(isCurrent, isSubmitted)}`}
        onClick={() => setActiveQuestionId(questionId)}
      >
        {questionIndex}
      </Button>

      {/* {isAnswered && isCurrent && (
        <div className={`${className} absolute top-0 text-skin-theme-invert`}>
          <div className="text-sm font-medium tracking-wider w-10 h-10 flex items-center justify-center bg-purple-500 rounded-full">
            {questionIndex}
          </div>
        </div>
      )} */}

      {isSubmitted && isCurrent && (
        <div className={`${className} absolute top-0 text-skin-theme-invert`}>
          <div className="text-sm font-medium tracking-wider w-10 h-10 flex items-center justify-center bg-purple-500 rounded-full">
            {questionIndex}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionStatusItem;
