import { RolesResponseDTO } from '@dto/response/roles.response.dto';
import { Gender, Permissions } from '@utils/enums';
import { UserSubscription } from 'models';

export class User {
  id!: string;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  gender?: Gender;
  dateOfBirth?: Date;
  email!: string;
  mobile?: string;
  company?: string;
  companyRole?: string;
  roles!: RolesResponseDTO[];
  permissions!: Permissions[];
  subscriptions!: UserSubscription[];
  tenantId?: string;
}

