import { PickType } from "types/extention.type";
import { TenantsRequestDTO } from "./tenants.request.dto";

export class BasicTenantDetailsRequestDTO extends PickType(TenantsRequestDTO, [
  'name',
  'slug',
  'domain',
  'subscriptionId',
  'status',
  'isPublic',
  'owner',
  // 'ownerUserId',
  'id'
] as const) { }
