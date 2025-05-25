import { PickType } from "types/extention.type";
import { TenantsRequestDTO } from "./tenants.request.dto";

export class BasicTenantDetailsRequestDTO extends PickType(TenantsRequestDTO, [
    'name',
    'slug',
    'email',
    'subscriptionId',
    'status',
    'isPublic',
    'ownerUserId',
    'id'
  ] as const) {}
  