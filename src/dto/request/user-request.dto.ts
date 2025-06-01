import { BaseDTO } from '@dto/base.dto';
import { Gender } from '@utils/enums';

class UserRequestDTO extends BaseDTO {
  firstName!: string;

  lastName!: string;

  gender?: Gender;

  dateOfBirth?: Date;

  email!: string;

  mobile?: string;

  company?: string;

  companyRole?: string;

  password!: string;

  tenantId?: string;

  data: [];
}

export { UserRequestDTO };
