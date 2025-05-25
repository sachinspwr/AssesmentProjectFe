import { TenantsStatus } from '@utils/enums/tenants-status.enum';
import { Audit, User } from 'models';

// --- Main Tenant Model ---
export class Tenant extends Audit {
  // **Basic Details**
  public name!: string;
  public slug?: string;
  public email!: string;
  public subscriptionId?: string;
  public status?: TenantsStatus;
  public ownerUserId?: string;
  public owner?: User;
}
