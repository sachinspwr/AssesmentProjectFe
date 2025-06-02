import React from 'react';
import { VRadioButtonGroup } from '@components/molecules/index';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import QuestionSection from '../question-section.component';
import { QuestionResponseDTO } from '@dto/response';
import { setAnswer } from 'test-runner/store/session';
import { useTestRunnerDispatch } from 'test-runner/store';

type SingleChoiceQuestionProps = {
  question: QuestionResponseDTO;
  defaultSelection: string;
  index: number;
};

const SingleChoiceQuestion = React.memo(
  ({ index, question, defaultSelection }: SingleChoiceQuestionProps) => {
    const dispatch = useTestRunnerDispatch();
    const questionId = question.id;

    const handleAnswerChange = React.useCallback(
      (answer: string | string[]) => {
        const answerString = Array.isArray(answer) ? answer[0] : answer;
        dispatch(
          setAnswer({
            questionId,
            answer: answerString.trim(),
          })
        );
      },
      [dispatch, questionId]
    );

    const options = React.useMemo(() => {
      return (
        question?.answerOptions?.split(',').map((option: string) => ({
          label: option.trim(),
          value: option.trim().toLowerCase(),
        })) || []
      );
    }, [question.answerOptions]);

    console.log('Single choice def selection', defaultSelection);

    return (
      <div className="">
        <QuestionSection question={question} index={index} />
        <VTypography as="h5" className="mb-3">
          Select Option
        </VTypography>

        {options.length > 0 && (
          <VRadioButtonGroup
            key={question.id}
            name={`answerOptions-${questionId}`}
            direction="vertical"
            options={options}
            onChange={handleAnswerChange}
            defaultValue={defaultSelection}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.question.id === nextProps.question.id &&
    prevProps.defaultSelection === nextProps.defaultSelection &&
    prevProps.index === nextProps.index
);

export { SingleChoiceQuestion };
