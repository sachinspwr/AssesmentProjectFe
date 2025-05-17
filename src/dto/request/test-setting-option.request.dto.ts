import { BaseDTO } from '@dto/base.dto';

export interface TestSettingOptionRequestDTO extends BaseDTO {
  isPublic: boolean;
  isConfigurable: boolean;
  category: string;
  key: string;
  value: boolean;
  valueType: string;
  description: string;
  isRecommended: boolean;
}
