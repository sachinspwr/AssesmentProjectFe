import { TestLinkAnonymousUserResponseDTO, TestLinkResponseDTO } from './test-link-response.dto';
import { TestQuestionAnswerResponseDTO } from './test-question-answer.response.dto';
import { TestResponseDTO } from './test-response.dto';
import { TestResponseObjDTO } from './test-result-obj-response.dto';
import { UserResponseDTO } from './user-response.dto';

class TestResultResponseDTO {

  user!:UserResponseDTO;

  test!:TestResponseDTO;

  testQuestionAnswer!:TestQuestionAnswerResponseDTO[];

  testResults!:TestResponseObjDTO[];

  testId!: string;

  userId!: string;

  testLinkId!: string;

  totalQuestions!: number;

  correctAnswersCount!: number;

  score!: number;

  outOf!: number;

  isPassed!: boolean;

  correctionPercentage!: number;

  feedback!: string;

  completedAt!: Date;

  createdAt!: Date;

  updatedOn!: Date;

  testLink!: TestLinkResponseDTO;

  testLinkAnonymousUser!: TestLinkAnonymousUserResponseDTO;

}
export { TestResultResponseDTO };
