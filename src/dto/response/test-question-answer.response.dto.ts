import { BaseDTO } from '@dto/base.dto';

export class TestQuestionAnswerResponseDTO extends BaseDTO {

  testId!: string;

  questionId!: string;

  participantId!:string;

  sectionId!:string;

  // userId!: number;

  // question?: QuestionResponseDTO;

  answerText!: string | string[];

  accuracyPercentage?: number |string;

  finalMarks?: number | string;

  resultComments!: string;
}
