import React from 'react';
import { QuestionType } from '@utils/enums';
import { SingleChoiceQuestion, MultipleChoiceQuestion, CodingQuestion } from '.';
import { QuestionProps } from 'test-runner/types';

type QuestionPropsExtended = QuestionProps & {
  onTimeElapsed: () => void;
};

function QuestionComponent({ question, ...rest }: QuestionPropsExtended) {
  const { type: questionType } = question;
  const renderQuestionComponent = () => {
    switch (questionType) {
      case QuestionType.SingleChoice:
        return <SingleChoiceQuestion question={question} {...rest} />;
      case QuestionType.MultipleChoice:
        return <MultipleChoiceQuestion question={question} {...rest} />;
      case QuestionType.Coding:
        return <CodingQuestion question={question} {...rest} />;
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <>
      <div className="w-full">{renderQuestionComponent()}</div>
    </>
  );
}

export { QuestionComponent };
