import { TestQuestionFormat } from "@utils/enums/test-question-format.enum";

export class TestResponseDTOs {

    public title!: string;

    public description!: string;

    public durationInMinutes!: number;

    public id?: string;

    public experienceLevel!: string;

    public status!: string;

    public testQuestionFormat!: TestQuestionFormat;

    public cutoffScore?: number;

    public maxScore?: number;

}
