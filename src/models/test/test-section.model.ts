import { Question } from 'models/question/question.model';

export class TestSection {
  id!: string;
  name!: string;
  testId!: string;
  description?: string;
  cutoffScore?: number;
  questions?: Question[];
  testQuestionFormat: string;
}
