import { QuestionResponseDTO } from '@dto/response';
import { Answer } from './answer.type';

export interface QuestionProps {
  question: QuestionResponseDTO;
  currentQuestionId: string;
  questionAnswer: Answer;
  isLastQuestion: boolean;
  onAnswer: (questionId: string, answer: Answer) => void;
  onSubmit: () => void;
  onNext: () => void;
  onBack: () => void;
}
