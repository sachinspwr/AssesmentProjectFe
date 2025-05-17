import React, { useMemo } from 'react';
import { QuestionSummary } from './question-summary.component';
import NavigationButtons from './navigation-button.component';
import { RadioButtonGroup, RadioOption } from '@components/molecules';
import { QuestionProps } from 'test-runner/types';

function SingleChoiceQuestion({
  question,
  currentQuestionId,
  questionAnswer,
  isLastQuestion,
  onAnswer,
  onSubmit,
  onNext,
  onBack,
}: QuestionProps) {
  const options = useMemo(() => {
    return JSON.parse(question.answerOptions).map((x: string) => ({ label: x, value: x }) as RadioOption);
  }, [question.answerOptions]);

  return (
    <div className="flex flex-col gap-4">
      <QuestionSummary question={question} className="shadow-sm rounded-md border" />

      <RadioButtonGroup
        selectedValue={questionAnswer as string}
        wrapperClasses="my-5 gap-5"
        optionContainerClasses="p-4 shadow-sm border rounded-md "
        name="answerText"
        options={options}
        onChange={(value) => value && onAnswer(currentQuestionId, value)}
      />

      <NavigationButtons
        onSubmit={onSubmit}
        onNext={onNext}
        onBack={onBack}
        isSubmitDisabled={false}
        isLastQuestion={isLastQuestion}
        className="flex justify-start items-center"
      />
    </div>
  );
}

export { SingleChoiceQuestion };
