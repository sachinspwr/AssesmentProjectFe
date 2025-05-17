import { Gender } from '@utils/enums';
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
  roles!: string[];
  permissions!: string[];
  subscriptions!: UserSubscription[]
}
