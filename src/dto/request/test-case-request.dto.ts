import { TestCaseKind } from "@utils/enums/test-kind.enum";

export class TestCaseRequestDTO {

    public input!: string;

    public expectedOutput!: string;

    public kind!: TestCaseKind;

    public caseNumber!: number;

    public weight!: number;

    public ispublic?: boolean;

}