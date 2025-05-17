import { TestQuestionFormat, TestStatus } from '@utils/enums';
import { Audit, ExperienceLevel, TestInstructionOption, TestSection, TestSettingOption } from 'models';
import { TestRegistrationFieldOption } from './registration-field-opition';

export class Test extends Audit {
  // **General Information**
  public title!: string;
  public description?: string;
  public tags?: string;

  // **Test Configuration**
  public totalQuestions!: number;
  public totalSections!: number;
  public durationInMinutes!: number;
  public maxScore!: number;
  public cutoffScorePercentage!: number;
  public testQuestionFormat!: TestQuestionFormat;
  public status!: TestStatus;

  // **Experience Level**
  public experienceLevel!: ExperienceLevel;
  public experienceLevelId!: string;

  // **Relations** (Related entities)
  public testSections?: TestSection[];
  public testRegistrationFields?: TestRegistrationFieldOption[];
  public testSettings?: TestSettingOption[];
  public testInstructions?: TestInstructionOption[];

  public isPublic!: boolean;
  public randomizeQuestions?: boolean;
  public hasNegativeMarking?: boolean;
}
