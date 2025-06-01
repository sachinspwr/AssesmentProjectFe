import { Gender, Permissions } from '@utils/enums';
import {  UserSubscription } from 'models';
import { RolesResponseDTO } from './roles.response.dto';

class UserResponseDTO {
  id?: string;

  firstName!: string;

  lastName!: string;

  gender?: Gender;

  dateOfBirth?: Date;

  email!: string;

  mobile!: string;

  company?: string;

  companyRole?: string;

  permissions?: Permissions[];

  subscriptions?: UserSubscription[]

  tenantId?: string;

  role!:RolesResponseDTO[];
}

export { UserResponseDTO };
