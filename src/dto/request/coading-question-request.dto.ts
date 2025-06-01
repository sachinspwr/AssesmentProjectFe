import { CodingQuestionGradingStrategy } from "@utils/enums/coding-question-grading-strategy.enum";
import { ProgrammingLanguage } from "@utils/enums/programming-language.enum";
import { TestCaseRequestDTO } from "./test-case-request.dto";
import { StarterCodeRequestDTO } from "./starter-code-request.dto";

export class CodingQuestionRequestDTO {

    public problemMarkdown?: string;

    public primaryLanguage!: ProgrammingLanguage;

    public allowedLanguages!: ProgrammingLanguage[];

    public gradingStrategy!: CodingQuestionGradingStrategy;

    public outputFormat?: { description: string };

    public inputFormat?: { description: string }

    public timeLimitMs!: number;

    public memoryLimitKb!: number;

    public slug?: string;

    public publicId?: string;

    public isActive?: boolean;

    public isPremium?: boolean;

    public testCases!: TestCaseRequestDTO[];

    public starterCodes!: StarterCodeRequestDTO[];
}

