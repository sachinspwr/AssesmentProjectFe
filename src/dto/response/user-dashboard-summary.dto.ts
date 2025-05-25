import { UserTestResults } from "./user-test-results-response.dto";



export class UserDashbaordSummaryDTO{
    summaryStats!: SummaryStatDTO[];
    subjectStats!: SubjectStatDTO[];
    recentTestResults!: UserTestResults[];
}


export class SummaryStatDTO {
    averageScore!: number;
    averageAccuracy!: number;
    totalTests!: number;
    passed!: number;
    failed!: number;
    passedStatus!: number;
    failedStatus!: number;
    incompleteStatus!: number;
  }
  
  export class SubjectStatDTO {
    subject!: string;
    totalQuestions!: number;
    correctAnswers!: number;
    passRate!: number;
  }
  
  

  
