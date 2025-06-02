import React from 'react';
import { QuestionResponseDTO } from '@dto/response';
import QuestionSection from '../question-section.component';
import { VLabelledTextArea } from '@components/molecules';
import { useTestRunnerDispatch } from 'test-runner/store';
import { setAnswer } from 'test-runner/store/session';

type EssayQuestionProps = {
  question: QuestionResponseDTO;
  defaultSelection: string;
  index: number;
};

const EssayQuestion = React.memo(
  ({ question, index, defaultSelection }: EssayQuestionProps) => {
    const dispatch = useTestRunnerDispatch();
    const questionId = question.id;

    const handleAnswerChange = React.useCallback(
      (value?: string) => {
        if (value === undefined) return;
        dispatch(setAnswer({ questionId, answer: value.trim() }));
      },
      [dispatch, questionId]
    );

    return (
      <div>
        <QuestionSection question={question} index={index} />
        <VLabelledTextArea
          value={defaultSelection}
          name={`essay-answer-${questionId}`}
          placeholder={`Write your ${question.type} response here...`}
          onChange={(_, e) => handleAnswerChange(e?.target.value)}
          disabled={false}
          cols={20}
          label={undefined}
          rows={20} // Added more rows for essay answers
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.question.id === nextProps.question.id &&
    prevProps.defaultSelection === nextProps.defaultSelection &&
    prevProps.index === nextProps.index
);

export  {EssayQuestion};