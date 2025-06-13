import React from 'react';
import { QuestionType } from '@utils/enums';
import { QuestionResponseDTO } from '@dto/response';

import {
  selectSectionPaginationState,
  useTestRunnerSelector,
} from 'test-runner/store';

import { selectCurrentQuestionAnswer } from 'test-runner/store/session/answer';

import FillInTheBlanks from './question-type/fill-in-the-blanks.component';
import { MultipleChoiceQuestion } from './question-type/mcq.component';
import ShortAnswerQuestion from './question-type/short-answer-question.component';
import {SingleChoiceQuestion} from './question-type/single-choice-question.component';
import { CodingTestEditor } from 'test-runner/pages/test-editor-page';

type QuestionProps = {
  question: QuestionResponseDTO;
};

type BaseQuestionProps = {
  question: QuestionResponseDTO;
  index: number;
  defaultSelection: string;
};

// Separate component definition
function QuestionTypeRendererComponent({ question }: QuestionProps) {
  const userAnswer = useTestRunnerSelector(
    React.useCallback(selectCurrentQuestionAnswer, [])
  );

  const currentPage = useTestRunnerSelector(
    React.useCallback((state) => selectSectionPaginationState(state).currentPage, [])
  );

  const commonProps: BaseQuestionProps = React.useMemo(() => ({
    question,
    index: currentPage,
    defaultSelection: userAnswer || '',
  }), [question, currentPage, userAnswer]);

  console.log("defaultSelection", question)

  const questionComponent = React.useMemo(() => {
    switch (question.type) {
      case QuestionType.SingleChoice:
      case QuestionType.TrueFalse:
        return <SingleChoiceQuestion {...commonProps} />;

      case QuestionType.MultipleChoice:
        return <MultipleChoiceQuestion {...commonProps} />;

      case QuestionType.FillInTheBlanks:
        return <FillInTheBlanks {...commonProps} />;

      case QuestionType.Coding:
        return <CodingTestEditor {...commonProps} />;

      case QuestionType.ShortAnswer:
      case QuestionType.Essay:
        return <ShortAnswerQuestion {...commonProps} />;

      default:
        return <div>Unsupported question type</div>;
    }
  }, [question.type, commonProps]);

  return (
    <div className="w-full !min-h-[50vh]">
      {questionComponent}
    </div>
  );
}

// Export memoized version
export const QuestionTypeRenderer = React.memo(QuestionTypeRendererComponent);
