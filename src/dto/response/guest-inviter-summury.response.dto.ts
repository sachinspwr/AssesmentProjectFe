// guest-inviter-summary.dto.ts

export class SummaryCountDTO {
  ongoingAssessments: number;

  completedAssessments: number;

  totalCandidates: number;
}

export class AssessmentSummaryDTO {
  testId: string;

  testTitle: string;

  totalCandidates: number;
}

export class ExperienceLevelCountDTO {
  experienceLevelId: string;

  experienceLevelName: string;

  participantCount: number;
}

export class TestResultDTO {
  assessmentId: string;

  testId: string;

  testTitle: string;

  participantId: string;

  recruiterId: string;

  recruiterFirstName: string;

  recruiterLastName: string;

  recruiterEmail: string;

  assessmentStatus: string;

  candidatesCount: number;

  correctAnswersCount: number;

  score: number;

  outOf: number;

  completedAt: Date | null;

  actions?: string;
}

export class GuestInviterSummaryResponseDTO {
  summaryCounts: SummaryCountDTO;

  assessmentSummaries: AssessmentSummaryDTO[];

  recentAssessments: TestResultDTO[];

  experienceLevelCounts: ExperienceLevelCountDTO[];
}
