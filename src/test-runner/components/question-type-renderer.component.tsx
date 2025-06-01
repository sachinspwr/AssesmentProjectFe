import React from 'react';
import { QuestionType, TestQuestionFormat } from '@utils/enums';
import { MultipleChoiceQuestion } from './question-type/mcq.component';
import SingleChoiceQuestion from './question-type/single-choice-question.component';
import FillInTheBlanks from './question-type/fill-in-the-blanks.component';
import { QuestionResponseDTO } from '@dto/response';
import { CodingQuestion } from './code-editor/coding-question.component';
import ShortAnswerQuestion from './question-type/short-answer.component';

type QuestionProps = {
  question: QuestionResponseDTO;
  index: number;
};

function QuestionTypeRenderer({question, index }: QuestionProps) {
  const { type: questionType } = question;
  const renderQuestionComponent = () => {
    switch (questionType) {
      case QuestionType.SingleChoice:
        return <SingleChoiceQuestion question={question} index={index} />;
      case QuestionType.MultipleChoice:
        return <MultipleChoiceQuestion question={question} index={index} />;
      case QuestionType.FillInTheBlanks:3
        return <FillInTheBlanks question={question} index={index} />;
      case QuestionType.TrueFalse:
        return <SingleChoiceQuestion question={question} index={index} />;
      case QuestionType.Coding:
        return <CodingTestEditor question={question} currentQuestionId={question.id} />;
      case QuestionType.Essay:
        return <ShortAnswerQuestion question={question} index={index} />;
      case QuestionType.ShortAnswer:
        return <ShortAnswerQuestion question={question} index={index} />;
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

export { QuestionTypeRenderer };
