import { DifficultyLevel, QuestionType } from "@utils/enums";

// types.ts
export interface RegistrationField {
  name: string;
  type: 'text' | 'email' | 'select' | 'checkbox';
  label: string;
  placeholder: string;
  options?: string;
  required: boolean;
}

export interface TestSettings {
  [key: string]: {
    value: string | number | boolean;
    valueType: 'string' | 'number' | 'boolean';
  };
}

export interface TestInstruction {
    category: string;
    description: string;
}

export interface ExperienceLevel {
    name: string;
    description: string;
}

export interface Question {
  id: string;
  questionText: string;
  type: QuestionType;
  answerOptions: string;
  marks: number;
  timeLimit: number;
  difficulty: DifficultyLevel;
  questionExplanation?: string;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  sectionOrder: number;
  questions: Question[];
}

export interface TestDetails {
  id: string;
  title: string;
  description: string;
  durationInMinutes: number;
  totalQuestions: number;
  totalSections: number;
  sections: Section[];
  settings: TestSettings;
  instructions: TestInstruction[];
  experienceLevel: ExperienceLevel;
  hasNegativeMarking: boolean;
  canPauseTest: boolean;
  randomizeQuestions: boolean;
  requiresProctoring: boolean;
}

export interface AnswerPayload {
  questionId: string;
  answer: string | string[];
  timestamp: number;
}

export interface QuestionNavigationPayload {
  questionId: string;
  sectionId: string;
  navigationType: 'manual' | 'auto';
}

export interface NavigationHistory {
  sectionId: string;
  questionId: string;
  timestamp: string;
  eventType: string;
}

export interface CurrentPosition {
  sectionId: string;
  questionId: string;
  confidence?: number;
}

export interface NavigationState {
  history: NavigationHistory[];
  currentPosition: CurrentPosition;
  navigationType: string;
}

export interface TimerState {
  sectionTimeSpent: Record<string, number>;
  totalElapsed: number;
  lastUpdated: string;
}

export interface SecurityEvents {
  fullscreenExits: number;
  tabSwitches: number;
  faceDetection: {
    attempts: number;
    verified: boolean;
    lastChecked: string | null;
  };
  clipboardAccess?: {
    pasteAttempts: number;
    copyAttempts: number;
  };
}

export interface StateSnapshot {
  navigation: NavigationState;
  answers: Record<string, string | string[]>;
  timers: TimerState;
  _version?: number;
}

export interface TestSession {
  id: string;
  participantId: string;
  testId: string;
  expiresAt?: string;
  timeRemaining?: number;
  status: 'NotStarted' | 'Started' | 'Completed' | 'Submitted';
  stateSnapshot?: StateSnapshot;
  securityEvents?: SecurityEvents;
  token: string;
}

export interface TestResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  detailedResults: Record<string, { correct: boolean; correctAnswer?: string | string[] }>;
}
