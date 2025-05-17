import { SettingCategory } from '@utils/enums';
import { AuditResponseDTO } from './audit-response.dto';

export class TestSettingOptionResponseDTO extends AuditResponseDTO {
  public category!: SettingCategory;

  public key!: string;

  value!: string | boolean | number;

  public valueType?: string;

  public description?: string;

  public isConfigurable!: boolean;

  public isRecommended?: boolean;
}
