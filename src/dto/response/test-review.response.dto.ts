import { BaseDTO } from "@dto/base.dto"

export interface TestReviewResponseDTO extends BaseDTO{
    createdById: string
    updatedById: string
    reviewerId: string
    isPublic: boolean
    testId: string
    comment: string
    status: string
  }
  

  export interface TestReviewSubmitResponseDTO {
    _isSuccess: boolean
    _error: Error
    _value: Value
  }
  
  export interface Error {
    statusCode: number
  }
  
  export interface Value {
    percentageScore: number
    questionResults: QuestionResult[]
    sectionResults: SectionResult[]
    performanceByType: PerformanceByType
    performanceByDifficulty: PerformanceByDifficulty
    id: string
    testSessionId: string
    testId: string
    participantId: string
    tenantId: string
    status: string
    completedAt: string
    isPassed: boolean
    finalScore: number
    maxPossibleScore: number
    correctAnswers: number
    incorrectAnswers: number
    unansweredQuestions: number
    partialAnswers: number
    totalDurationSeconds: number
    averageTimePerQuestion: number
    sectionTimings: SectionTimings
    overallRiskScore: number
    securityFlags: string[]
    technicalMetadata: TechnicalMetadata
    securityEvents: SecurityEvents
    gradingMethod: string
    reviewedAt: string
    reviewedBy: string
    reviewerComments: string
    overallFeedback: string
    integrityHash: string
    createdAt: string
    updatedAt: string
  }
  
  export interface QuestionResult {
    questionId: string
    sectionId: string
    status: string
    score: number
    maxScore: number
    timeSpentSeconds: number
    gradingStatus: string
    graderFeedback: string
    securityFlags: string
    riskScore: number
    isCorrect: boolean
    isSkipped: boolean
  }
  
  export interface SectionResult {
    sectionId: string
    score: number
    maxScore: number
    percentage: number
    correctAnswers: number
    incorrectAnswers: number
    correctCount: number
    incorrectCount: number
    unanswered: number
    timeSpentSeconds: number
  }
  
  export interface PerformanceByType {
    unknown: Unknown
  }
  
  export interface Unknown {
    correct: number
    incorrect: number
    unanswered: number
    averageScore: number
  }
  
  export interface PerformanceByDifficulty {
    unknown: Unknown2
  }
  
  export interface Unknown2 {
    correct: number
    incorrect: number
    unanswered: number
    averageScore: number
  }
  
  export interface SectionTimings {
    "eda5cf01-089c-44bb-8f10-91848578ed16": number
    "bc697616-c1ea-4013-af1f-82c0c6f5d547": number
  }
  
  export interface TechnicalMetadata {
    device: Device
    network: Network
    integrity: Integrity
    ipAddress: string
    userAgent: string
    timestamps: Timestamps
  }
  
  export interface Device {
    os: Os
    type: string
    browser: Browser
  }
  
  export interface Os {
    name: string
  }
  
  export interface Browser {
    name: string
  }
  
  export interface Network {
    proxy: boolean
    ipType: string
    bandwidth: string
  }
  
  export interface Integrity {
    hash: string
  }
  
  export interface Timestamps {
    capturedAt: string
  }
  
  export interface SecurityEvents {
    tabSwitches: number
    faceDetection: FaceDetection
    clipboardAccess: ClipboardAccess
    fullscreenExits: number
  }
  
  export interface FaceDetection {
    attempts: number
    verified: boolean
    lastChecked: string
  }
  
  export interface ClipboardAccess {
    copyAttempts: number
    pasteAttempts: number
  }
  
  