import { CodingQuestionGradingStrategy } from "@utils/enums/coding-question-grading-strategy.enum";
import { ProgrammingLanguage } from "@utils/enums/programming-language.enum";
import { TestCaseResponseDTO } from "./test-case-response.dto";
import { StarterCodeResponseDTO } from "./starter-code-response.dto";

export class CodingQuestionResponseDTO {
    public id!: string;

    public questionId!: string;

    public problemMarkdown?: string;

    public primaryLanguage!: ProgrammingLanguage;

    public allowedLanguages!: ProgrammingLanguage[];

    public gradingStrategy!: CodingQuestionGradingStrategy;

    public expectedOutput?: string;

    public outputFormat!: { description: string };

    public inputFormat!: { description: string };

    public timeLimitMs!: number;

    public memoryLimitKb!: number;

    public maxSubmissionCount!: number;

    public slug?: string;

    public publicId?: string;

    public isActive?: boolean;

    public isPremium?: boolean;

    public testCases?: TestCaseResponseDTO[];

    public starterCodes?: StarterCodeResponseDTO[];
}