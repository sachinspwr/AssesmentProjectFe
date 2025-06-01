export interface UserTestSummaryResponseDTO {
  summaryStats: SummaryStat[]
  subjectStats: SubjectStat[]
  recentTestResults: RecentTestResult[]
}

export interface SummaryStat {
  averageScore: number
  averageAccuracy: number
  totalTests: number
  passed: number
  failed: number
  passedStatus: number
  failedStatus: number
  incompleteStatus: number
}

export interface SubjectStat {
  subject: string
  totalQuestions: number
  correctAnswers: number
  passRate: number
}

export interface RecentTestResult {
  id: string
  testId: string
  testTitle: string
  userId: string
  participantId: string
  totalQuestions: number
  correctAnswersCount: number
  score: number
  outOf: number
  isPassed: boolean
  correctionPercentage: number
  feedback: string
  status: string
  completedAt: string
  createdAt: string
  updatedAt: string
  userFirstName: string
  userLastName: string
  userEmail: string
  test: Test
  user: User
}

export interface Test {
  id: string
  title: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}
