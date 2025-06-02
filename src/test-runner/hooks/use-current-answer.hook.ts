// hooks/useCurrentAnswer.ts
import React from 'react';
import { useTestRunnerSelector } from 'test-runner/store';
import { selectAnswers } from 'test-runner/store/session/answer';
import {
  selectCurrentSectionId,
  selectCurrentQuestionId,
} from 'test-runner/store/session/navigation/navigation.selector';

export const useCurrentAnswer = () => {
  const currentSectionId = useTestRunnerSelector(selectCurrentSectionId);
  const currentQuestionId = useTestRunnerSelector(selectCurrentQuestionId);
  const answers = useTestRunnerSelector(selectAnswers);

  return React.useMemo(() => {
    if (!currentSectionId || !currentQuestionId) return null;
    return answers[currentSectionId]?.[currentQuestionId] ?? null;
  }, [currentSectionId, currentQuestionId, answers]);
};
