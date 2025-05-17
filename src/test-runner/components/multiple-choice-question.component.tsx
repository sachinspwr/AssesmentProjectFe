import React, { useMemo } from 'react';
import { QuestionSummary } from './question-summary.component';
import NavigationButtons from './navigation-button.component';
import { RadioOption } from '@components/molecules/index';
import { QuestionProps } from 'test-runner/types';
import { CheckboxGroup } from '@components/molecules/checkbox-group/checkbox-group.mol';

function MultipleChoiceQuestion({
  question,
  currentQuestionId,
  questionAnswer,
  onAnswer,
  onSubmit,
  onNext,
  onBack,
}: QuestionProps) {
  const options = useMemo(() => {
    return JSON.parse(question.answerOptions).map((x: string) => ({ label: x, value: x }) as RadioOption);
  }, [question.answerOptions]);

  return (
    <div className="flex flex-col gap-4" id={currentQuestionId}>
      <QuestionSummary question={question} className="shadow-sm rounded-md border" />

      <CheckboxGroup
        name={currentQuestionId}
        wrapperClasses="my-5 gap-5"
        checkboxContainerClasses="shadow-sm p-4 rounded-md border"
        options={options}
        selectedValues={questionAnswer as []}
        onChange={(value) => value && value.length > 0 && onAnswer(currentQuestionId, value)}
      />

      <NavigationButtons
        onSubmit={onSubmit}
        onNext={onNext}
        onBack={onBack}
        className="flex justify-start items-center"
      />
    </div>
  );
}

export { MultipleChoiceQuestion };
