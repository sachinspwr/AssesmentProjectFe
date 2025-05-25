export interface UserDashboardTableDTO {
    id: string;
    sectionId?: string;
    question?: string;
    difficultyLevel?: string;
    questionType?: string;
    duration?: number;
    score?: number | null;
    testId?: string;
    userId?: string;
    participantId?: string;
    testName?: string;
    status?: string | null;
    completedAt?: string;
    isPassed?: boolean;
    actions?: string;
  }