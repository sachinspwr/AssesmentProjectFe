import { PermissionResponseDTO } from "./permission.response.dto";

export interface RolesResponseDTO {
    permission: PermissionResponseDTO[];
    tenantId: string
    id: string
    isPublic: boolean
    name: string
    isDefault: boolean
  }