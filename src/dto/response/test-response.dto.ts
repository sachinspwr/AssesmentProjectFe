import { TestQuestionFormat, TestStatus } from '@utils/enums';
import { AuditResponseDTO } from './audit-response.dto';
import { TestSectionResponseDTO } from './test-section-response.dto';
import { ExperienceLevelResponseDTO } from './experience-level-response.dto';
import { TestSettingOptionResponseDTO } from './test-setting-option.response.dto';
import { TestRegistrationFieldOptionResponseDTO } from './registration-field-option-response.dto';
import { TestInstructionOptionResponseDTO } from './test-instruction-option-response.dto';

class TestResponseDTO extends AuditResponseDTO {
  
  // **General Information**
  public title!: string;
  public description?: string;
  public tags?: string;

  // **Test Configuration**
  public totalQuestions!: number;
  public totalSections!: number;
  public maxScore!: number;
  public cutoffScorePercentage!: number;
  public durationInMinutes!: number;
  public testQuestionFormat!: TestQuestionFormat;
  public status!: TestStatus;

  // **Experience Level**
  public experienceLevel!: ExperienceLevelResponseDTO;

  // **Relations** (These represent related entities)
  public testSections?: TestSectionResponseDTO[];
  public testRegistrationFields?: TestRegistrationFieldOptionResponseDTO[];
  public testSettings?: TestSettingOptionResponseDTO[];
  public testInstructions?: TestInstructionOptionResponseDTO[];

  public randomizeQuestions?: boolean;
  public hasNegativeMarking?: boolean;
}

export { TestResponseDTO };
