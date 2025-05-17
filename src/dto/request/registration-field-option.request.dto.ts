import { BaseDTO } from '@dto/base.dto';

export interface RegistrationFieldsRequestDTO extends BaseDTO {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  options: string;
  isRequired: boolean;
  isPublic: boolean;
}
