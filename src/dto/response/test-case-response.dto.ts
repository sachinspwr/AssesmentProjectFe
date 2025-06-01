import { TestCaseKind } from "@utils/enums/test-kind.enum";
 
export class TestCaseResponseDTO {

  public id?: string;
    
  public codingQuestionId?: string;
 
  public input?: string;
 
  public expectedOutput?: string;
 
  public kind?: TestCaseKind;
 
  public caseNumber?: number;
 
  public weight?: number;
}
 
 