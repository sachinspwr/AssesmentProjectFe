import { BaseDTO } from '@dto/base.dto';

class RequestDemoResponseDTO extends BaseDTO {
  firstName!: string;

  lastName!: string;

  email!: string;

  company!: string;

  companySize!: number;

  roleInCompany!: string;

  message!: string;

  comments?: string;

  status?: string;
}

export { RequestDemoResponseDTO };
