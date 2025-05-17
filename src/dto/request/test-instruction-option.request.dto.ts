import { BaseDTO } from '@dto/base.dto';

export interface TestInstructionOptionRequestDTO extends BaseDTO {
  isPublic: boolean;
  category: string;
  key: string;
  value: string;
  valueType: string;
  description: string;
  isConfigurable: boolean;
  isRecommended: boolean;
}
