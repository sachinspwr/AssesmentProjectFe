import { Answer } from 'test-runner/types';

export class TestQuestionAnswerRequestDTO {
  testId!: string;

  questionId!: string;

  userId?: string;

  testLinkId?: string;

  testLinkAnonymousUserId?: string;

  answer!: Answer;

  answerText?: string;
}
