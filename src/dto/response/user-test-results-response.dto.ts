import { Test, User } from "models";

class UserTestResults {
  id: string;
  participantId: string;
  totalQuestions: number;
  correctAnswersCount: number;
  outOf: string;
  score: string;
  correctionPercentage: string;
  feedback: string;
  completedAt: string;
  isPassed: boolean;
  user: User;
  test: Test;
  status:string;
  }
  
  export { UserTestResults };