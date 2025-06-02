
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
  
