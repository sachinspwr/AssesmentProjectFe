import { DifficultyLevel, QuestionType } from '@utils/enums';
import { Audit, Subject } from 'models';

// --- Main Question Model ---
export class Question extends Audit {
  // **Basic Information**
  public questionText!: string;
  public topic?: string;
  public subject!: Subject;
  public tags?: string;

  // **Question Details**
  public difficulty!: DifficultyLevel;
  public type!: QuestionType;
  public timeLimit?: number;
  public marks?: number;
  public correctAnswer?: string;
  public answerOptions?: string;
  public questionExplanation?: string;
  public answerExplanation?: string;

  // **Relations**
  public industryId?: string;
  public domainId?: string;
  public industryRoleId?: string;

  // **Tracking Property**
  public userResponse?:string;
}
