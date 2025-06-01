import { DifficultyLevel, QuestionType } from '@utils/enums';
import { AuditResponseDTO } from './audit-response.dto';
import { CodingQuestionResponseDTO } from './coading-question-response.dto';
import { QuestionReviewResponseDTO } from './question-review.response.dto';

// --- Main Question Response DTO ---
class QuestionResponseDTO extends AuditResponseDTO {

  // **Basic Information**
  public questionText!: string;
  public subject!: string;
  public subjectId!: string;
  public topic!: string;
  public tags?: string;

  // **Question Details**
  public difficulty!: DifficultyLevel;
  public type!: QuestionType;
  public timeLimit!: number;
  public marks!: number;

  // **Answer Information**
  public answerOptions!: string;
  public correctAnswer?: string;
  public questionExplanation?: string;
  public answerExplanation?: string;

  // **Relation Information**
  public industryId?: string;
  public domainId?: string;
  public industryRoleId?: string;

  // **Visibility & Status**
  public declare isPublic?: boolean;

  // **Coading Information**
  public codingQuestion?: CodingQuestionResponseDTO; 

  public status ?: string;

  public questionReview?: QuestionReviewResponseDTO;
}

export { QuestionResponseDTO };
