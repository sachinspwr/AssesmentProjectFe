import { TestQuestionFormat } from '@utils/enums/test-question-format.enum';

class TestRequestsDTO {

    public title!: string;

    public description!: string;

    public durationInMinutes!: string;

    public maxScore!: string;

    // public roleId!: string;

    public experienceLevel!: string;

    public status!: string;

    public testQuestionFormat!: TestQuestionFormat;

    public isPublic!: boolean;

    public cutoffScore!: string;

    public tags?: string[];
}

export { TestRequestsDTO };
