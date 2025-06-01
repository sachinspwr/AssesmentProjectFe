import { DifficultyLevel, QuestionType } from '@utils/enums';
import { AuditRequestDTO } from './audit-request.dto';
import { CodingQuestionRequestDTO } from './coading-question-request.dto';

class QuestionRequestDTO extends AuditRequestDTO {
  public questionText!: string;

  public subjectId!: string;

  public subject!: string;

  public experienceLevelId!: string;

  public domainId!: string;

  public industryId!: string;

  public industryRoleId!: string;

  public status: string;

  public topic!: string;

  public difficulty!: DifficultyLevel;

  public type!: QuestionType;

  timeLimit!: number;

  marks!: number;

  public answerOptions!: string[];

  public correctAnswer?: string[];

  public questionExplanation?: string;

  public answerExplanation?: string;

  public tags?: string[];

  public codingQuestion?: CodingQuestionRequestDTO;
}

export { QuestionRequestDTO };
