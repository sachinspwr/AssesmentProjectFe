
export interface UserTestResultResponseDTO {
    id: string
    testId: string
    testTitle: string
    userId: string
    participantId: string
    userFirstName: string
    userLastName: string
    userEmail: string
    totalQuestions: number
    correctAnswersCount: number
    score: string
    outOf: string
    isPassed: boolean
    correctionPercentage: string
    feedback: any
    status: string
    completedAt: string
    createdAt: string
    updatedAt: string
    action: string;
  }
  
  export interface InvitedUserTestResultResponseDTO {
    assessmentId: string
    testSessionId: string
    testId: string
    testTitle: string
    participantId: string
    status: string
    candidateName: string
    resultStatus: string
    correctAnswersCount: number
    score: string
    outOf: string
    startedAt: string
    submittedAt: string
    experienceLevel: string
    experienceLevelId: string
    action: string;
  }
  