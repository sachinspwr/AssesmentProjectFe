import { ArticleStatus } from '@utils/enums';
import { AuditResponseDTO } from './audit-response.dto';

export class ArticleResponseDTO extends AuditResponseDTO {
  title!: string;

  content!: string;

  slug!: string;

  public tags?: string;

  status?: ArticleStatus;

  summary?: string;

  thumbnailUrl?: string;

  isFeatured?: boolean;

  icon?: string;
}
