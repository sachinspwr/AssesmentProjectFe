export interface UserTestSummaryResponseDTO {
  id: string
  title: string
  description: string
  maxPossibleScore: string
  percentageScore: number
  isPassed: boolean
  completedAt: string
  totalDurationSeconds: number
  averageTimePerQuestion: number
  sections: Section[]
  participant: Participant
  session: Session
  security: Security
}

export interface Section {
  id: string
  title: string
  description: string
  totalQuestions: number
  answeredCount: number
  skippedCount: number
  notAttemptedCount: number
  score: number
  maxScore: number
  cutoffScore: number
  isPassed: boolean
  questions: Question[]
}

export interface Question {
  id: string
  text: string
  type: string
  topic: string
  difficulty: string
  answerOptions: string[]
  userAnswer?: string
  correctAnswer: string
  status: string
  isCorrect: boolean
  score: number
  maxScore: number
  explanation: string
  timeSpentSeconds?: number
}

export interface Participant {
  id: string
  type: string
  email: string
  profile: Profile
}

export interface Profile {
  firstName: string
  lastName: string
  phone: string
  gender: string
  dob: Date
  company: string
}

export interface Session {
  id: string
  startedAt: string
  submittedAt: string
  durationSeconds: number
  ipAddress: string
  device: Device
  network: Network
  securityFlags: any[]
  securityEvents: SecurityEvents
}

export interface Device {
  type: string
  os: string
  browser: string
}

export interface Network {
  ipType: string
  proxy: boolean
  bandwidth: string
}

export interface SecurityEvents {
  tabSwitches: number
  fullscreenExits: number
  faceDetectionAttempts: number
  clipboardAccess: ClipboardAccess
}

export interface ClipboardAccess {
  copyAttempts: number
  pasteAttempts: number
}

export interface Security {
  overallRiskScore: number
  securityFlags: string[]
  integrityHash: any
}
