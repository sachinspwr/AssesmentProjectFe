import { QuestionResponseDTO } from './question-response.dto';

class TestSectionResponseDTO {
  id?: string;
  name!: string;
  testId?: string;
  isPublic?: boolean;
  cutoffScore?: number;
  score?:number;
  outOf?:number;
  description!: string;
  questions?: QuestionResponseDTO[];
  question?: QuestionResponseDTO[]; 
}

export { TestSectionResponseDTO };
