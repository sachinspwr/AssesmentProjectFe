import { ProgrammingLanguage } from "@utils/enums/programming-language.enum";

export class StarterCodeRequestDTO {

  codingQuestionId?: string;

  language!: ProgrammingLanguage;

  template!: string;

  solutionCode!: string;

  isPublic?: boolean;
}