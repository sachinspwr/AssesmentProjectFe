import { QuestionResponseDTO } from '@dto/response';
import React from 'react';
import { QuestionTypeRenderer } from 'test-runner/components/question-type-renderer.component';
import { selectCurrentQuestion, useTestRunnerSelector } from 'test-runner/store';

export function CurrentQuestionView() {
  const question = useTestRunnerSelector(selectCurrentQuestion);

  if (!question) return <div>No question found</div>;

  return (
    <div>
      <QuestionTypeRenderer question={question as QuestionResponseDTO} />
    </div>
  );
}
