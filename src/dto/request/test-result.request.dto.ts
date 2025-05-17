import { AuditRequestDTO } from "./audit-request.dto";

class TestResultRequestDTO extends AuditRequestDTO {
    testId!: string;

    userId!: string;

    participantId!:string;

    testLinkId!: string;

    totalQuestions!: number;

    correctAnswersCount!: number;

    score!: number;

    outOf!: number;

    isPassed!: boolean;

    correctionPercentage!: number;

    feedback!: string;

    completedAt!: Date;
}

export { TestResultRequestDTO };
