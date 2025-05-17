import { TestStatus } from '@utils/enums';
import { AuditRequestDTO } from './audit-request.dto';
import { TestQuestionFormat } from '@utils/enums/test-question-format.enum';

class TestSectionRequestDTO {
  public name!: string;
  public isPublic!: boolean;
  public cutoffScore!: string;
  public description!: string;
  public questionIds!: string[];
}

class TestRequestDTO extends AuditRequestDTO {
  /**
   * General test information
   */
  public title!: string;
  public description?: string;
  public tags?: string[];
  
  /**
   * Test configuration
   */
  public testQuestionFormat!: TestQuestionFormat;
  public status!: TestStatus;
  public durationInMinutes!: number;
  public maxScore?: number;
  public cutoffScorePercentage?: number;
  
  /**
   * Experience level (stored as string ID)
   */
  public hasNegativeMarking: boolean;
  public randomizeQuestions: boolean;
  public experienceLevelId!: string;
  
  public sections!: TestSectionRequestDTO[];
  public questionIds?: string[];
  public defaultTestInstructionIds?: string[];
  public defaultTestSettingIds?: string[];
  
}
export { TestRequestDTO };
