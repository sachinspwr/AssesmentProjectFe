import { Gender } from '@utils/enums';
import { UserSubscription } from 'models';

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

  roles?: string[];

  permissions?: string[];

  subscriptions?: UserSubscription[]
}

export { UserResponseDTO };
