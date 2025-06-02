import { createSelector } from "@reduxjs/toolkit";
import { TestRunnerState } from "test-runner/store/test-runner.store";
import { selectCurrentQuestionId } from "../navigation/navigation.selector";

// Root selector
export const selectAnswers = (state: TestRunnerState) => state.answers;

// Get answer for a specific questionId
export const selectAnswerByQuestionId = (questionId: string) => 
  (state: TestRunnerState) => state.answers[questionId];

// Get total number of answered questions
export const selectTotalAnsweredQuestions = (state: TestRunnerState) =>
  Object.keys(state.answers).length;

// Get all question IDs that have been answered
export const selectAnsweredQuestionIds = (state: TestRunnerState) =>
  Object.keys(state.answers);

export const selectCurrentQuestionAnswer = createSelector(
  [selectAnswers, selectCurrentQuestionId],
  (answers, currentQuestionId) => answers[currentQuestionId]
);