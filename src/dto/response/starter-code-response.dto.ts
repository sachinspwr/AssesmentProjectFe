import { ProgrammingLanguage } from "@utils/enums/programming-language.enum";

export class StarterCodeResponseDTO {

  public id!: string;

  public codingQuestionId!: string;

  public language!: ProgrammingLanguage;

  public template!: string;

  public solutionCode!: string;
}