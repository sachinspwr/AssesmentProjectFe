import { Tenant } from "models/tenant/tenant.model";
import { User } from "models/user";

export class Account {
  createdById: string;
  updatedById: string;
  id: string;
  isPublic: boolean;
  user: User;
  tenant: Tenant | null; // define type if needed
}
