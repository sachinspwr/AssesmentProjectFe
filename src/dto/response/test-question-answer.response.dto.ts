import { BaseDTO } from '@dto/base.dto';
import { QuestionResponseDTO } from './question-response.dto';

export class TestQuestionAnswerResponseDTO extends BaseDTO {

  testId!: string;

  questionId!: number;

  participantId!:string;

  sectionId!:string;

  // userId!: number;

  // question?: QuestionResponseDTO;

  answerText!: string | string[];

  accuracyPercentage?: number |string;

  finalMarks?: number | string;

  resultComments!: string;
}
